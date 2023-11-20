// @ts-nocheck
import { db } from "$lib/server/firebase";
import { error } from "@sveltejs/kit";

/** @type {import('./[id]/$types').LayoutServerLoad} */
export async function load({ url, params, cookies }) {
  const uid = cookies.get("uid");
  const userRef = await db.collection("users").doc(uid).get();
  const user = { ...userRef.data(), id: uid };
  const organization = user.organization;

  const ref = await db
    .collection("organizations")
    .doc(organization)
    .collection("widgets")
    .doc(params.id)
    .get();

  if (!ref.exists) {
    throw error(404, {
      message: "Not Found",
    });
  }

  const widget = ref.data();

  return {
    widget: {
      id: ref.id,
      name: widget.name,
      title: widget.title,
      color: widget.color,
      welcome_message: widget.welcome_message,
      bot_avatar_url: widget.bot_avatar_url,
      bot_name: widget.bot_name,
      welcome_form: widget.welcome_form,
    },
  };
}

export const ssr = false;
export const prerender = false;
