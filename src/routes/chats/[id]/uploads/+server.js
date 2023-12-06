// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

/**
 * Get uploads
 * @param {*} param0
 * @returns
 */
export async function GET({ params }) {
  try {
    return json({
      success: true,
      data: {},
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

/**
 * Upload a file
 * @param {*} param0
 * @returns
 */
export async function POST({ params }) {
  try {
    return json({
      success: true,
      data: {},
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
