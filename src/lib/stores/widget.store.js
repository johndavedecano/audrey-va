// @ts-nocheck
import { createMessageListener, createSessionListener } from "$lib/chat";
import { writable } from "svelte/store";
import omit from "lodash/omit";

const WidgetStore = () => {
  const store = writable({
    session: {},
    messages: {},
    sound: localStorage.getItem("sound") === "true",
    menu: false,
  });

  let messageSubscriber, sessionSubscriber;

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
            return {
              ...state,
              messages: { ...state.messages, [message.id]: message },
            };
          });
        }

        if (change.type === "modified") {
          store.update((state) => {
            return {
              ...state,
              messages: {
                ...state.messages,
                [change.doc.id]: change.doc.data(),
              },
            };
          });
        }

        if (change.type === "removed") {
          store.update((state) => {
            return {
              ...state,
              messages: omit(state.messages, change.doc.id),
            };
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
        console.log("Document data:", doc.data());
        store.update((state) => {
          return {
            ...state,
            session: {
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

  return {
    ...store,
    addMessageListener,
    removeMessageListener,
    addSessionListener,
    removeSessionListener,
    toggleSound,
    toggleMenu,
  };
};

export default WidgetStore();
