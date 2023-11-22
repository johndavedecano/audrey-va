// @ts-nocheck
import { db } from "$lib/firebase";
import { collection, query, onSnapshot, doc } from "firebase/firestore";

export const createMessageListener = (sessionId, callback) => {
  const path = `/sessions/${sessionId}/messages`;
  const messagesRef = collection(db, path);
  const q = query(messagesRef);
  return onSnapshot(q, callback);
};

export const createSessionListener = (sessionId, callback) => {
  const sessionRef = doc(db, `/sessions/${sessionId}`);
  const q = query(sessionRef);
  return onSnapshot(q, callback);
};
