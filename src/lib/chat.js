// @ts-nocheck
import { db } from "$lib/firebase";
import axios from "axios";
import {
  collection,
  query,
  onSnapshot,
  doc,
  orderBy,
} from "firebase/firestore";

export const createMessageListener = (sessionId, callback) => {
  const path = `/sessions/${sessionId}/messages`;
  const messagesRef = collection(db, path);
  const q = query(messagesRef, orderBy("timestamp"));
  return onSnapshot(q, callback);
};

export const createSessionListener = (sessionId, callback) => {
  const sessionRef = doc(db, `/sessions/${sessionId}`);
  const q = query(sessionRef);
  return onSnapshot(q, callback);
};

export const createCustomerListener = (
  organizationId,
  customerId,
  callback
) => {
  const customerRef = doc(
    db,
    `/organizations/${organizationId}/customers/${customerId}`
  );
  const q = query(customerRef);
  return onSnapshot(q, callback);
};

export const groupMessages = (items) => {
  const grouped = [];
  for (let i = 0; i < items.length; i++) {
    if (!grouped.length) {
      grouped.push(items[i]);
    } else {
      const lastMessage = grouped[grouped.length - 1];
      const nextMessage = items[i];
      if (lastMessage.author !== nextMessage.author) {
        grouped.push(nextMessage);
      } else {
        const diff = nextMessage.timestamp - lastMessage.timestamp;
        if (diff <= 5000) {
          if (!Array.isArray(lastMessage.text)) {
            lastMessage.text = [lastMessage.text];
          }
          lastMessage.text.push(nextMessage.text);
          grouped[grouped.length - 1] = lastMessage;
        } else {
          grouped.push(nextMessage);
        }
      }
    }
  }
  return grouped;
};
