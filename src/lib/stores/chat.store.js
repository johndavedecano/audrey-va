// @ts-nocheck
import { writable } from "svelte/store";

const ChatStore = () => {
  const store = writable({
    sessions: [],
    conversation: {},
    tab: "active",
    info: true,
    chatTab: "session",
    chatSearch: false,
    chatKnowledge: false,
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

  const toggleChatSearch = () => {
    return store.update((state) => ({
      ...state,
      chatSearch: !state.chatSearch,
    }));
  };

  const toggleChatKnowledge = () => {
    return store.update((state) => ({
      ...state,
      chatKnowledge: !state.chatKnowledge,
    }));
  };

  return {
    ...store,
    setActiveTab,
    setChatTab,
    toggleInfo,
    toggleChatSearch,
    toggleChatKnowledge,
  };
};

export default ChatStore();
