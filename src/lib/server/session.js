// @ts-nocheck
import { JWT_SECRET_KEY } from "$env/static/private";
import jwt from "jsonwebtoken";

export const createSessionToken = (claims = {}) => {
  return jwt.sign(claims, JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

export const decodeSessionToken = (sessionToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(sessionToken, JWT_SECRET_KEY, function (err, decoded) {
      if (err) return reject();
      resolve(decoded);
    });
  });
};
