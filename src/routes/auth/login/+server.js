// @ts-nocheck
import { auth, db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

export async function POST({ request, cookies }) {
  try {
    const { idToken } = await request.json();

    const user = await auth.verifyIdToken(idToken);

    if (!user.email_verified) {
      throw new Error("account is not yet verified");
    }

    cookies.set("uid", user.uid, { path: "/" });

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
