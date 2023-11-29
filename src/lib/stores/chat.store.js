// @ts-nocheck
import { writable } from "svelte/store";

const ChatStore = () => {
  const store = writable({
    sessions: [],
    conversation: {},
  });

  return {
    ...store,
  };
};

export default ChatStore();
