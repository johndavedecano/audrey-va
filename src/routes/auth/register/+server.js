// @ts-nocheck
import { auth, db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";
import { v4 } from "uuid";

import Joi from "joi";

export async function POST({ request }) {
  try {
    const params = await request.json();

    const schema = Joi.object({
      email: Joi.string().email().required(),
      mobile: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      organization: Joi.string().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      password_confirmation: Joi.ref("password"),
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

    const user = await auth.createUser({
      email: params.email,
      displayName: `${params.firstName} ${params.lastName}`,
      password: params.password,
    });

    const organization = v4();

    await db
      .collection("organizations")
      .doc(organization)
      .set({
        name: params.organization,
        owner: user.uid,
        members: [user.uid],
      });

    await db
      .collection("users")
      .doc(user.uid)
      .set({
        mobile: params.mobile,
        firstName: params.firstName,
        lastName: params.lastName,
        organization,
        memberships: [organization],
      });

    const token = await auth.createCustomToken(user.uid);

    return json({
      success: true,
      message: "registration successfull",
      data: token,
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
