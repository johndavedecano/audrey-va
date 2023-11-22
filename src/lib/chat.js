// @ts-nocheck
import { db } from "$lib/firebase";
import { collection, query, onSnapshot, doc } from "firebase/firestore";

export const createMessageListener = (sessionId, callback) => {
  const messagesRef = collection(db, "sessions", sessionId, "messages");
  const q = query(messagesRef);
  return onSnapshot(q, callback);
};

export const createSessionListener = (sessionId, callback) => {
  const messagesRef = doc(db, `/sessions/${sessionId}`);
  const q = query(messagesRef);
  return onSnapshot(q, callback);
};
