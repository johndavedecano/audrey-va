// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { error, json } from "@sveltejs/kit";

import Joi from "joi";

export async function POST({ request, cookies, params }) {
  try {
    const body = await request.json();

    const schema = Joi.object({
      dialogflow_project_id: Joi.string().required(),
      dialogflow_private_key: Joi.string().required(),
      dialogflow_client_email: Joi.string().required(),
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

    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    const widgetRef = await db
      .collection("organizations")
      .doc(organization)
      .collection("widgets")
      .doc(params.id);

    const widgetDoc = await widgetRef.get();

    if (!widgetDoc.exists) {
      throw error(404, "widget does not exists");
    }

    await widgetRef.update({
      dialogflow_project_id: body.dialogflow_project_id,
      dialogflow_private_key: body.dialogflow_private_key,
      dialogflow_client_email: body.dialogflow_client_email,
      dialogflow_setup: true,
    });

    return json({
      success: true,
      message: "successfully updated",
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
