<script>
  // @ts-nocheck
  import { onMount } from "svelte";

  import Portal from "svelte-portal";
  import Header from "./Header.svelte";
  import MessageList from "./MessageList.svelte";
  import MessageControls from "./MessageControls.svelte";
  import Message from "./Message.svelte";
  import WelcomeForm from "./WelcomeForm.svelte";
  import isEmpty from "lodash/isEmpty";
  import axios from "axios";

  export let widget = {};

  let sessionId = localStorage.getItem("sessionId");

  let loading = false;

  let messages = [];

  const startSession = async (evt) => {
    try {
      loading = true;

      const params = {
        organization: widget.organization,
        widget: widget.id,
        customer: evt.details,
      };

      const response = await axios.post("/widget/session", params);

      console.log(response.data);

      loading = false;
    } catch (error) {
      loading = false;
      if (error.response & error.response.data) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

  const checkSession = () => {};

  const endSession = () => {};

  const clearSession = () => {};

  $: variables = `--primary-color: ${widget.color};`;

  $: hasSession = !isEmpty(sessionId);

  onMount(() => {
    if (hasSession) checkSession();
  });
</script>

<Portal target="body">
  <div class="cw" style={variables}>
    <Header {widget} />
    <MessageList>
      {#if !hasSession}
        <Message>
          <WelcomeForm {widget} on:submit={startSession} />
        </Message>
      {/if}
    </MessageList>
    {#if hasSession}
      <MessageControls {widget} />
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
