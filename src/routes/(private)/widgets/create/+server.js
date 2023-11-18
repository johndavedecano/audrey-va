// @ts-nocheck
import { auth, db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

import Joi from "joi";

export async function POST({ request, cookies, locals }) {
  try {
    const params = await request.json();

    console.log(locals);

    const schema = Joi.object({
      name: Joi.string().required(),
      title: Joi.string().required(),
      color: Joi.string().required(),
      welcome_message: Joi.string().required(),
      bot_avatar_url: Joi.string().uri().required(),
      bot_name: Joi.string().required(),
      dialogflow_project_id: Joi.string().required(),
      welcome_form: Joi.object({
        phone: Joi.boolean().required(),
        message: Joi.boolean().required(),
      }),
    });

    const validate = schema.validate(params);

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

    return json({
      success: true,
      message: "successfully logged in",
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
