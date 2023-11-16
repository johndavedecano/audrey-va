// @ts-nocheck
import { json } from "@sveltejs/kit";
import { isFetchRequest } from "$lib/server/request";

import isEmpty from "lodash/isEmpty";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  if (isFetchRequest(event.request.headers)) {
    const uid = event.cookies.get("uid");
    const idToken = event.cookies.get("idToken");
    const pathname = event.url.pathname;
    if (isEmpty(uid) || isEmpty(idToken)) {
      return json({ message: "unauthenticated" }, { status: 401 });
    }
  }

  const response = await resolve(event);

  return response;
}
