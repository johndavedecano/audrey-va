// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

import Joi from "joi";

export async function POST({ request, cookies }) {
  try {
    const body = await request.json();

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

    await db
      .collection("organizations")
      .doc(organization)
      .collection("widgets")
      .add({
        name: body.name,
        title: body.title,
        color: body.color,
        welcome_message: body.welcome_message,
        bot_avatar_url: body.bot_avatar_url,
        bot_name: body.bot_name,
        welcome_form: body.welcome_form,
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
