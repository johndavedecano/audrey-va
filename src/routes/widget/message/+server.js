// @ts-nocheck

import { db } from "$lib/server/firebase.js";
import { decodeSessionToken } from "$lib/server/session.js";
import { json } from "@sveltejs/kit";

import Joi from "joi";
import sanitizeHtml from "sanitize-html";
import moment from "moment";
import client from "@google-cloud/dialogflow";
import isEmpty from "lodash/isEmpty.js";

const dialogflow = client.v2beta1;

export async function POST({ request }) {
  try {
    const body = await request.json();

    const schema = Joi.object({
      session_token: Joi.string().required(),
      message_id: Joi.string().required(),
      message: Joi.string().required(),
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

    const decoded = await decodeSessionToken(body.session_token);

    const customerRef = await db
      .collection("organizations")
      .doc(decoded.organization_id)
      .collection("customers")
      .doc(decoded.customer_id)
      .get();

    if (!customerRef.exists) {
      throw error(404, {
        message: "customer not found",
      });
    }

    const customer = { id: customerRef.id, ...customerRef.data() };

    const message = {
      author: "user",
      username: customer.name,
      text: sanitizeHtml(body.message),
      timestamp: moment().valueOf(),
      session_id: decoded.session_id,
    };

    await db.collection("sessions").doc(decoded.session_id).update({
      last_message: message,
      last_message_at: message.timestamp,
      updated_at: message.timestamp,
    });

    await db
      .collection("sessions")
      .doc(decoded.session_id)
      .collection("messages")
      .doc(body.message_id)
      .set(message);

    const sessionRef = await db
      .collection("sessions")
      .doc(decoded.session_id)
      .get();

    if (!sessionRef.exists) {
      throw error(404, {
        message: "session not found",
      });
    }

    const session = { id: sessionRef.id, ...sessionRef.data() };

    if (session.current_target === "va") {
      const widgetRef = await db
        .collection("organizations")
        .doc(decoded.organization_id)
        .collection("widgets")
        .doc(decoded.widget_id)
        .get();

      if (!widgetRef.exists) {
        throw error(404, {
          message: "widget not found",
        });
      }

      const widget = { id: widgetRef.id, ...widgetRef.data() };

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
        decoded.session_id
      );

      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            text: body.message,
            languageCode: "en-US",
          },
        },
        queryParams: {
          knowledgeBaseNames: [
            `projects/${widget.dialogflow_project_id}/knowledgeBases/NzY3MjEyMzMwODAyNzkzNjc2OA`,
          ],
        },
      };

      const responses = await sessionClient.detectIntent(request);

      console.log(responses);

      const result = responses[0].queryResult.fulfillmentText;

      const response = {
        author: "bot",
        username: widget.bot_name,
        text: result || "I cant answer that right now.",
        timestamp: moment().valueOf(),
        session_id: decoded.session_id,
      };

      await db
        .collection("sessions")
        .doc(decoded.session_id)
        .collection("messages")
        .add(response);
    }

    return json({
      success: true,
      message: "successfully created",
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
