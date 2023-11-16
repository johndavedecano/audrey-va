import { redirect } from "@sveltejs/kit";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, route }) {
  const uid = cookies.get("uid");

  if (route.id === "/auth/logout") return {};

  if (uid) throw redirect(302, "/");

  return {};
}
