// @ts-nocheck
import { json } from "@sveltejs/kit";
import { isFetchRequest } from "$lib/server/request";

import isEmpty from "lodash/isEmpty";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  let response;

  const pathname = event.url.pathname;

  if (pathname.startsWith("/widget")) {
    response = await resolve(event);
    return response;
  }

  if (isFetchRequest(event.request.headers)) {
    const uid = event.cookies.get("uid");

    if (!pathname.startsWith("/auth")) {
      if (isEmpty(uid)) {
        return json({ message: "unauthenticated" }, { status: 401 });
      }
    }
  }

  response = await resolve(event);
  return response;
}
