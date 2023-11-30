// @ts-nocheck
import { writable } from "svelte/store";

const ChatStore = () => {
  const store = writable({
    sessions: [],
    conversation: {},
    tab: "active",
  });

  const setActiveTab = (tab) => {
    return store.update((state) => ({
      ...state,
      tab,
    }));
  };

  return {
    ...store,
    setActiveTab,
  };
};

export default ChatStore();
