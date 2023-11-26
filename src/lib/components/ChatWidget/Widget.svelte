<script>
  // @ts-nocheck
  import { onMount } from "svelte";
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

  $: sessionId = $widgetStore.sessionId;

  $: active = sessionId && isLoggedIn;

  let audio;

  const onLogout = () => {
    widgetStore.setLoggedIn(false);
    widgetStore.setSessionId(null);
  };

  const onLoggedIn = (user) => {
    widgetStore.setLoggedIn(true);
    widgetStore.addCustomerListener(widget.organization, user.uid);
  };

  const playNotificationSound = () => {
    if (document.hidden && $widgetStore.sound) audio.play();
  };

  const onMessageUpdate = (type, message) => {
    if (type === "added" && message.author !== "user") {
      playNotificationSound();
    }
  };

  const onSessionUpdate = () => {};

  const setEventListeners = () => {
    widgetStore.addMessageListener(sessionId, onMessageUpdate);
    widgetStore.addSessionListener(sessionId, onSessionUpdate);
  };

  onMount(() => {
    if (active) setEventListeners();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        onLoggedIn(user);
      } else {
        onLogout();
      }
    });
  });
</script>

<Portal target="body">
  <div class="cw" style={variables}>
    <Header />
    <MessageList></MessageList>
    {#if active}
      <MessageControls />
    {/if}
  </div>
  <audio bind:this={audio}><source src="/sound.mp3" type="audio/mpeg" /></audio>
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
