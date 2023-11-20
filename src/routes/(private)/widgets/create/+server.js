// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

import Joi from "joi";

export async function POST({ request, cookies }) {
  try {
    const params = await request.json();

    const schema = Joi.object({
      name: Joi.string().required(),
      title: Joi.string().required(),
      color: Joi.string().required(),
      welcome_message: Joi.string().required(),
      bot_avatar_url: Joi.string().uri().required(),
      bot_name: Joi.string().required(),
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

    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    await db
      .collection("organizations")
      .doc(organization)
      .collection("widgets")
      .add({
        name: params.name,
        title: params.title,
        color: params.color,
        welcome_message: params.welcome_message,
        bot_avatar_url: params.bot_avatar_url,
        bot_name: params.bot_name,
        welcome_form: params.welcome_form,
      });

    return json({
      success: true,
      message: "successfully created",
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
