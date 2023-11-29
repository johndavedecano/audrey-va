// @ts-nocheck
import {
  createCustomerListener,
  createMessageListener,
  createSessionListener,
  groupMessages,
} from "$lib/chat";

import { writable } from "svelte/store";

const WidgetStore = () => {
  const store = writable({
    sessionId: localStorage.getItem("sessionId"),
    session: {},
    messages: [],
    added: [],
    sound: localStorage.getItem("sound") === "true",
    menu: false,
    widget: {},
    loading: false,
    isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
    customer: {},
    typing: "",
  });

  let messageSubscriber, sessionSubscriber, customerSubscriber;

  const endSession = () => {
    localStorage.removeItem("sessionId");
    store.update((state) => ({
      ...state,
      messages: [],
      added: [],
      sessionId: null,
      session: {},
    }));
  };

  const setSessionId = (sessionId) => {
    if (sessionId) {
      localStorage.setItem("sessionId", sessionId);
    } else {
      localStorage.removeItem("sessionId");
    }
    store.update((state) => ({
      ...state,
      sessionId,
    }));
  };

  const addTyping = (message) => {
    store.update((state) => {
      return {
        ...state,
        typing: message,
      };
    });
  };

  const hideTyping = (author) => {
    store.update((state) => {
      return {
        ...state,
        typing: null,
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

  const setCustomer = (customer) => {
    store.update((state) => ({
      ...state,
      customer,
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

  const addCustomerListener = (organizationId, customerId) => {
    if (typeof customerSubscriber === "function") customerSubscriber();
    customerSubscriber = createCustomerListener(
      organizationId,
      customerId,
      (doc) => {
        if (doc.exists()) {
          store.update((state) => {
            return {
              ...state,
              customer: {
                id: doc.id,
                ...state.customer,
                ...doc.data(),
              },
            };
          });
        } else {
          console.log("Document does not exist");
        }
      }
    );
  };

  const addMessageListener = (sessionId, callback = () => {}) => {
    if (typeof messageSubscriber === "function") messageSubscriber();
    messageSubscriber = createMessageListener(sessionId, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        let message = {};

        if (change.type === "added") {
          message = { id: change.doc.id, ...change.doc.data() };
          store.update((state) => {
            if (state.isLoggedIn && state.sessionId) {
              if (!state.added.includes(message.id)) {
                return {
                  ...state,
                  messages: groupMessages([...state.messages, message]),
                };
              }
            }
            return state;
          });
        }
        callback(change.type, message);
      });
    });
  };

  const addSessionListener = (sessionId) => {
    if (typeof sessionSubscriber === "function") sessionSubscriber();
    sessionSubscriber = createSessionListener(sessionId, (doc) => {
      if (doc.exists()) {
        store.update((state) => {
          if (state.isLoggedIn && state.sessionId) {
            return {
              ...state,
              session: {
                session_id: sessionId,
                ...state.session,
                ...doc.data(),
              },
            };
          }
          return state;
        });
      } else {
        console.log("Document does not exist");
      }
    });
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
    addSessionListener,
    addCustomerListener,
    toggleSound,
    toggleMenu,
    addMessage,
    setWidget,
    setLoading,
    setLoggedIn,
    addTyping,
    hideTyping,
    setSessionId,
    endSession,
    setCustomer,
  };
};

export default WidgetStore();
