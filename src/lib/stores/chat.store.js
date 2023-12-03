// @ts-nocheck
import { writable } from "svelte/store";

const ChatStore = () => {
  const store = writable({
    sessions: [],
    conversation: {},
    tab: "active",
    info: true,
    chatTab: "session",
  });

  const setActiveTab = (tab) => {
    return store.update((state) => ({
      ...state,
      tab,
    }));
  };

  const setChatTab = (chatTab) => {
    return store.update((state) => ({
      ...state,
      chatTab,
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
    setChatTab,
    toggleInfo,
  };
};

export default ChatStore();
