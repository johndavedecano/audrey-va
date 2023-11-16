// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import isEmpty from "lodash/isEmpty";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const uid = cookies.get("uid");

  console.log(uid);

  if (isEmpty(uid)) throw redirect(302, "/auth/login");

  return {};
}
