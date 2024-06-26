// @ts-nocheck

import { auth, db } from "$lib/server/firebase.js";
import { createSessionToken } from "$lib/server/session.js";
import { error, json } from "@sveltejs/kit";
import { v4 } from "uuid";
import client from "@google-cloud/dialogflow";
import firestore from "firebase-admin/firestore";
import isEmpty from "lodash/isEmpty.js";
import Joi from "joi";
import moment from "moment";

const dialogflow = client.v2beta1;

export async function POST({ request }) {
  try {
    const body = await request.json();

    const schema = Joi.object({
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      name: Joi.string().required(),
      message: Joi.string().required(),
      organization_id: Joi.string().required(),
      widget_id: Joi.string().required(),
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
      .doc(body.organization_id)
      .collection("widgets")
      .doc(body.widget_id)
      .get();

    if (!widgetRef.exists) {
      throw error(404, {
        message: "Not Found",
      });
    }

    const widget = { id: widgetRef.id, ...widgetRef.data() };

    if (widget.deleted) throw error(400, "widget has already been archived");

    const session_id = v4();

    const message = {
      author: "user",
      username: body.name,
      text: body.message,
      timestamp: moment().valueOf(),
      session_id,
    };

    const customer = v4();

    await db
      .collection("organizations")
      .doc(body.organization_id)
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
      organization_id: body.organization_id,
      widget_id: widget.id,
    });

    const session_token = createSessionToken({
      organization_id: body.organization_id,
      widget_id: widget.id,
      session_id,
      customer_id: customer,
    });

    await db.collection("sessions").doc(session_id).set({
      current_target: "va",
      widget_id: body.widget_id,
      organization_id: body.organization_id,
      customer_id: customer,
      session_token,
      updated_at: firestore.FieldValue.serverTimestamp(),
      created_at: firestore.FieldValue.serverTimestamp(),
      last_message_at: firestore.FieldValue.serverTimestamp(),
      last_message: message,
    });

    await db
      .collection("sessions")
      .doc(session_id)
      .collection("messages")
      .add(message);

    if (
      isEmpty(widget.dialogflow_client_email) ||
      isEmpty(widget.dialogflow_private_key) ||
      isEmpty(widget.dialogflow_project_id)
    ) {
      throw error(400, "invalid dialogflow credentials");
    }

    const credentials = {
      client_email: widget.dialogflow_client_email,
      private_key: widget.dialogflow_private_key.replace(/\\n/g, "\n"),
    };

    const sessionClient = new dialogflow.SessionsClient({
      projectId: widget.dialogflow_project_id,
      credentials,
    });

    const sessionPath = sessionClient.projectAgentSessionPath(
      widget.dialogflow_project_id,
      session_id
    );

    const responses = await sessionClient.detectIntent({
      session: sessionPath,
      queryInput: {
        text: {
          text: body.message || "welcome_customer",
          languageCode: "en-US",
        },
      },
    });

    const result = responses[0].queryResult.fulfillmentText;

    if (!result) throw error(400, "no matched intent");

    const response = {
      author: "bot",
      username: widget.bot_name,
      text: result,
      timestamp: moment().valueOf(),
      session_id,
    };

    await db
      .collection("sessions")
      .doc(session_id)
      .collection("messages")
      .add(response);

    return json({
      success: true,
      message: "successfully created",
      data: {
        token,
        session_id,
        widget_id: body.widget_id,
        organization_id: body.organization_id,
      },
    });
  } catch (error) {
    console.error(error);
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
