// @ts-nocheck
import {
  createMessageListener,
  createSessionListener,
  groupMessages,
} from "$lib/chat";

import { writable } from "svelte/store";
import { v4 } from "uuid";

import moment from "moment";

const WidgetStore = () => {
  const store = writable({
    session: {},
    messages: [],
    added: [],
    sound: localStorage.getItem("sound") === "true",
    menu: false,
    widget: {},
    loading: false,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  });

  let messageSubscriber, sessionSubscriber;

  const addTyping = (author, username, message) => {
    store.update((state) => {
      return {
        ...state,
        messages: state.messages.concat([
          {
            id: v4(),
            author,
            username,
            text: [message],
            type: "typing",
            timestamp: moment().valueOf(),
            session_id: state.session.id,
          },
        ]),
      };
    });
  };

  const filterTyping = (author, messages) => {
    const nextMessages = [];

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (message.type === "typing" && message.author === author) {
      } else {
        nextMessages.push(message);
      }
    }
    return nextMessages;
  };

  const hideTyping = (author) => {
    store.update((state) => {
      return {
        ...state,
        messages: filterTyping(author, state.messages),
      };
    });
  };

  const setLoggedIn = (isLoggedIn = false) => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", true);
    } else {
      localStorage.removeItem("isLoggedIn");
    }
    store.update((state) => ({
      ...state,
      isLoggedIn,
    }));
  };

  const setLoading = (loading = false) => {
    store.update((state) => ({
      ...state,
      loading,
    }));
  };

  const setWidget = (widget) => {
    store.update((state) => ({
      ...state,
      widget,
    }));
  };

  const toggleMenu = (nextState) => {
    store.update((state) => ({
      ...state,
      menu: typeof nextState === "boolean" ? nextState : !state.menu,
    }));
  };

  const toggleSound = () => {
    let sound = localStorage.getItem("sound") === "true";
    if (sound) {
      sound = false;
      localStorage.removeItem("sound");
    } else {
      sound = true;
      localStorage.setItem("sound", true);
    }
    store.update((state) => ({
      ...state,
      sound,
    }));
  };

  const addMessageListener = (sessionId, callback = () => {}) => {
    messageSubscriber = createMessageListener(sessionId, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          const message = { id: change.doc.id, ...change.doc.data() };
          store.update((state) => {
            if (!state.added.includes(message.id)) {
              return {
                ...state,
                messages: groupMessages([...state.messages, message]),
              };
            }
            return state;
          });
        }
        callback(change.type);
      });
    });
  };

  const removeMessageListener = () => {
    if (typeof messageSubscriber === "function") messageSubscriber();
  };

  const addSessionListener = (sessionId) => {
    sessionSubscriber = createSessionListener(sessionId, (doc) => {
      if (doc.exists()) {
        store.update((state) => {
          return {
            ...state,
            session: {
              session_id: sessionId,
              ...state.session,
              ...doc.data(),
            },
          };
        });
      } else {
        console.log("Document does not exist");
      }
    });
  };

  const removeSessionListener = () => {
    if (typeof sessionSubscriber === "function") sessionSubscriber();
  };

  const addMessage = (message) => {
    store.update((state) => {
      return {
        ...state,
        added: [...state.added, message.id],
        messages: groupMessages([...state.messages, message]),
      };
    });
  };

  return {
    ...store,
    addMessageListener,
    removeMessageListener,
    addSessionListener,
    removeSessionListener,
    toggleSound,
    toggleMenu,
    addMessage,
    setWidget,
    setLoading,
    setLoggedIn,
    addTyping,
    hideTyping,
  };
};

export default WidgetStore();
