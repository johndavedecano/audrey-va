// @ts-nocheck
import { db } from "$lib/server/firebase.js";
import { json } from "@sveltejs/kit";

/**
 * Get message
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
 * Send message
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

/**
 * Close message
 * @param {*} param0
 * @returns
 */
export async function DELETE({ params }) {
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
 * Update message
 * @param {*} param0
 * @returns
 */
export async function PUT({ params }) {
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
