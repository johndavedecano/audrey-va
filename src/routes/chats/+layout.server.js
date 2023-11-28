// @ts-nocheck
import { db } from "$lib/server/firebase";
import { redirect } from "@sveltejs/kit";
import isEmpty from "lodash/isEmpty";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const uid = cookies.get("uid");

  if (isEmpty(uid)) throw redirect(302, "/auth/login");

  const userRef = await db.collection("users").doc(uid).get();

  const user = {
    id: uid,
    ...userRef.data(),
  };

  const orgRef = await db
    .collection("organizations")
    .doc(user.organization)
    .get();

  const data = {
    user,
    organization: {
      id: user.organization,
      ...orgRef.data(),
    },
  };

  return data;
}

export const ssr = false;
export const prerender = false;
