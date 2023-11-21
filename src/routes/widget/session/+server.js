// @ts-nocheck

import { auth, db } from "$lib/server/firebase.js";
import { error, json } from "@sveltejs/kit";
import { v4 } from "uuid";
import firestore from "firebase-admin/firestore";
import Joi from "joi";
import dialogflow from "dialogflow";

export async function POST({ request }) {
  try {
    const body = await request.json();

    const schema = Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      name: Joi.string().required(),
      message: Joi.string().required(),
      organization: Joi.string().required(),
      widget: Joi.string().required(),
    });

    const validate = schema.validate(body);

    if (validate.error) {
      return json(
        {
          success: false,
          message: validate.error.details[0].message,
        },
        {
          status: 422,
        }
      );
    }

    // validate widget and organization existence
    const widgetRef = await db
      .collection("organizations")
      .doc(body.organization)
      .collection("widgets")
      .doc(body.widget)
      .get();

    if (!widgetRef.exists) {
      throw error(404, {
        message: "Not Found",
      });
    }

    const widget = { id: widgetRef.id, ...widgetRef.data() };

    const session_id = v4();

    const message = {
      author: "user",
      username: body.name,
      text: body.message,
      timestamp: firestore.FieldValue.serverTimestamp(),
      session_id,
    };

    const customer = v4();

    await db
      .collection("organizations")
      .doc(body.organization)
      .collection("customers")
      .doc(customer)
      .set({
        name: body.name,
        email: body.email,
        phone: body.phone,
        updated_at: firestore.FieldValue.serverTimestamp(),
        created_at: firestore.FieldValue.serverTimestamp(),
      });

    const token = await auth.createCustomToken(customer, {
      session_id: session_id,
      organization_id: widget.organization,
      widget_id: widget.id,
    });

    await db.collection("sessions").doc(session_id).set({
      current_target: "va",
      widget_id: body.widget,
      organization_id: body.organization,
      customer_id: customer,
      updated_at: firestore.FieldValue.serverTimestamp(),
      created_at: firestore.FieldValue.serverTimestamp(),
      last_message_at: firestore.FieldValue.serverTimestamp(),
      last_message: message,
    });

    await db
      .collection("organizations")
      .doc(body.organization)
      .collection("messages")
      .add(message);

    const credentials = {
      client_email: widget.dialogflow_client_email,
      private_key: JSON.parse(widget.dialogflow_private_key),
    };

    const sessionClient = new dialogflow.SessionsClient({
      projectId: widget.dialogflow_project_id,
      credentials,
    });

    const sessionPath = sessionClient.sessionPath(
      widget.dialogflow_project_id,
      session_id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: body.message || "welcome_customer",
          languageCode: "en-US",
        },
      },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult.fulfillmentText;

    if (!result) throw error(400, "no matched intent");

    const response = {
      author: "bot",
      username: widget.bot_name,
      text: result,
      timestamp: firestore.FieldValue.serverTimestamp(),
      session_id,
    };

    await db
      .collection("organizations")
      .doc(body.organization)
      .collection("messages")
      .add(response);

    const messages = [message, response];

    return json({
      success: true,
      message: "successfully created",
      data: {
        messages,
        token,
        session_id,
        widget_id: body.widget,
        organization_id: body.organization,
      },
    });
  } catch (error) {
    return json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}
