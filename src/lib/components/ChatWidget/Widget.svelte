<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";

  import axios from "axios";
  import Header from "./Header.svelte";
  import Message from "./Message.svelte";
  import MessageControls from "./MessageControls.svelte";
  import MessageList from "./MessageList.svelte";
  import Portal from "svelte-portal";
  import WelcomeForm from "./WelcomeForm.svelte";
  import widgetStore from "$lib/stores/widget.store";
  import { errorMessage } from "$lib/string";
  import { auth } from "$lib/firebase";
  import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

  export let widget = {};

  let loading = false;

  let isLoggedIn = false;

  const startSession = async (evt) => {
    try {
      loading = true;

      const customer = evt.detail;

      const params = {
        email: customer.email,
        phone: customer.phone,
        name: customer.name,
        message: customer.message,
        organization_id: widget.organization,
        widget_id: widget.id,
      };

      const response = await axios.post("/widget/session", params);

      const data = response.data.data;

      await signInWithCustomToken(auth, data.token);

      localStorage.setItem("session_id", data.session_id);

      isLoggedIn = true;

      loading = false;
    } catch (error) {
      loading = false;

      console.error(error);

      alert(errorMessage(error));
    }
  };

  $: variables = `--primary-color: ${widget.color};`;

  const onMessageUpdate = () => {};

  const onSessionUpdate = (type) => console.log(type);

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
    isLoggedIn = false;

    localStorage.removeItem("session_id");

    removeListeners();

    console.log("logged out");
  };

  const onLoggedIn = () => {
    isLoggedIn = true;
    setListeners();
  };

  $: session = $widgetStore.session;

  $: messages = $widgetStore.messages;

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
    <MessageList>
      {#if !isLoggedIn}
        <WelcomeForm {widget} on:submit={startSession} {loading} />
      {:else}
        {#each messages as message}
          <Message {message} {widget} />
        {/each}
      {/if}
    </MessageList>
    {#if isLoggedIn}
      <MessageControls {widget} {session} />
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
