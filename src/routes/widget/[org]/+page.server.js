// @ts-nocheck
import { db } from "$lib/server/firebase";
import { error } from "@sveltejs/kit";

/** @type {import('./[id]/$types').LayoutServerLoad} */
export async function load({ url, params }) {
  const widgetId = url.searchParams.get("w");

  const ref = await db
    .collection("organizations")
    .doc(params.org)
    .collection("widgets")
    .doc(widgetId)
    .get();

  if (!ref.exists) {
    throw error(404, {
      message: "Not Found",
    });
  }

  const widget = {
    id: widgetId,
    organization: params.org,
    ...ref.data(),
  };

  delete widget.dialogflow_client_email;
  delete widget.dialogflow_knowledge_base;
  delete widget.dialogflow_private_key;
  delete widget.dialogflow_project_id;

  return {
    widget,
  };
}

export const ssr = false;
export const prerender = false;
