// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";
import Joi from "joi";

export async function GET({ cookies }) {
  try {
    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    const groupRef = await db
      .collection("organizations")
      .doc(organization)
      .collection("groups")
      .get();

    const groups = groupRef.docs
      .map((v) => {
        return {
          id: v.id,
          ...v.data(),
        };
      })
      .filter((v) => v.deleted !== true);

    return json({
      success: true,
      data: groups,
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

export async function POST({ request, cookies }) {
  try {
    const body = await request.json();

    const schema = Joi.object({
      name: Joi.string().required(),
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
      .collection("groups")
      .add({
        name: body.name,
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
