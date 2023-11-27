// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

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
