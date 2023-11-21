// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json, error } from "@sveltejs/kit";
import Joi from "joi";

export async function GET({ cookies, params }) {
  try {
    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    const groupRef = await db
      .collection("organizations")
      .doc(organization)
      .collection("groups")
      .doc(params.id)
      .get();

    if (!groupRef.exists) {
      throw error(404, "group not found");
    }

    return json({
      success: true,
      data: {
        id: groupRef.id,
        ...groupRef.data(),
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

export async function POST({ request, cookies, params }) {
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
      .doc(params.id)
      .update({
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

export async function DELETE({ request, cookies, params }) {
  try {
    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    await db
      .collection("organizations")
      .doc(organization)
      .collection("groups")
      .doc(params.id)
      .update({
        deleted: true,
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
