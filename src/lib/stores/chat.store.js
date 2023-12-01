// @ts-nocheck
import { writable } from "svelte/store";

const ChatStore = () => {
  const store = writable({
    sessions: [],
    conversation: {},
    tab: "active",
    info: true,
  });

  const setActiveTab = (tab) => {
    return store.update((state) => ({
      ...state,
      tab,
    }));
  };

  const toggleInfo = () => {
    return store.update((state) => ({
      ...state,
      info: !state.info,
    }));
  };

  return {
    ...store,
    setActiveTab,
    toggleInfo,
  };
};

export default ChatStore();
