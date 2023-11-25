<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";
  import { auth } from "$lib/firebase";
  import { onAuthStateChanged } from "firebase/auth";

  import Header from "./Header.svelte";
  import MessageControls from "./MessageControls.svelte";
  import MessageList from "./MessageList.svelte";
  import Portal from "svelte-portal";
  import widgetStore from "$lib/stores/widget.store";

  $: isLoggedIn = $widgetStore.isLoggedIn;

  $: variables = `--primary-color: ${widget.color};`;

  $: widget = $widgetStore.widget;

  $: session = $widgetStore.session;

  const onMessageUpdate = () => {
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("scroll_bottom"));
    }, 1000);
  };

  const onSessionUpdate = (type) => {};

  const setListeners = () => {
    const sessionId = localStorage.getItem("session_id");
    widgetStore.addMessageListener(sessionId, onMessageUpdate);
    widgetStore.addSessionListener(sessionId, onSessionUpdate);
  };

  const removeListeners = () => {
    widgetStore.removeMessageListener();
    widgetStore.removeSessionListener();
  };

  const onLogout = () => {
    widgetStore.setLoggedIn(false);

    localStorage.removeItem("session_id");

    removeListeners();
  };

  const onLoggedIn = () => {
    widgetStore.setLoggedIn(true);
    setListeners();
  };

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      const sessionId = localStorage.getItem("session_id");
      if (user && sessionId) {
        onLoggedIn();
      } else {
        onLogout();
      }
    });
  });

  onDestroy(() => {
    removeListeners();
  });
</script>

<Portal target="body">
  <div class="cw" style={variables}>
    <Header {widget} />
    <MessageList></MessageList>
    {#if isLoggedIn}
      <MessageControls />
    {/if}
  </div>
</Portal>

<style lang="postcss">
  /* your styles go here */
  .cw {
    background-color: #fbfcfe;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    overflow: hidden;
    position: fixed;
    transition: all 250ms ease-in-out;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
