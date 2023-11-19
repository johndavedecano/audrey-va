// @ts-nocheck
import { db } from "$lib/server/firebase";
import { error } from "@sveltejs/kit";

/** @type {import('./[id]/$types').LayoutServerLoad} */
export async function load({ url }) {
  const orgId = url.searchParams.get("o");
  const widgetId = url.searchParams.get("w");

  const ref = await db
    .collection("organizations")
    .doc(orgId)
    .collection("widgets")
    .doc(widgetId)
    .get();

  if (!ref.exists) {
    throw error(404, {
      message: "Not Found",
    });
  }

  return {
    widget: {
      id: widgetId,
      organization: orgId,
      ...ref.data(),
    },
  };
}

export const ssr = false;
export const prerender = false;
