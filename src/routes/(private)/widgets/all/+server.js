// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

export async function GET({ cookies }) {
  try {
    const uid = cookies.get("uid");
    const userRef = await db.collection("users").doc(uid).get();
    const user = { ...userRef.data(), id: uid };
    const organization = user.organization;

    const widgetRef = await db
      .collection("organizations")
      .doc(organization)
      .collection("widgets")
      .get();

    const widgets = widgetRef.docs
      .map((v) => {
        return {
          id: v.id,
          org: organization,
          ...v.data(),
          dialogflow_project_id: undefined,
          dialogflow_private_key: undefined,
          dialogflow_client_email: undefined,
        };
      })
      .filter((v) => v.deleted !== true);

    return json({
      success: true,
      data: widgets,
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
