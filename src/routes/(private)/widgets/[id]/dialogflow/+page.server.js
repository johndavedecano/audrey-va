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
    id: ref.id,
    dialogflow_project_id: widget.dialogflow_project_id,
    dialogflow_private_key: widget.dialogflow_private_key,
    dialogflow_client_email: widget.dialogflow_client_email,
    dialogflow_knowledge_base: widget.dialogflow_knowledge_base,
  };
}

export const ssr = false;
export const prerender = false;
