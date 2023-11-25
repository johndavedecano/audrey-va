<script>
  // @ts-nocheck
  import MessageMenu from "./MessageMenu.svelte";
  import MoreButton from "./MoreButton.svelte";
  import SendButton from "./SendButton.svelte";
  import widgetStore from "$lib/stores/widget.store";
  import axios from "axios";
  import { v4 } from "uuid";
  import moment from "moment";

  let value = "";

  // export let widget = {};

  export let session = {};

  const onSendMessage = async () => {
    try {
      if (value !== "") {
        const message = {
          id: v4(),
          author: "user",
          username: "",
          text: value,
          timestamp: moment().valueOf(),
          session_id: session.session_id,
        };

        widgetStore.addMessage(message);

        window.dispatchEvent(new CustomEvent("message_added"));

        value = "";

        const params = {
          message_id: message.id,
          message: message.text,
          session_token: session.session_token,
        };

        await axios.post("/widget/message", params);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onKeyUp = (evt) => {
    if (evt.keyCode === 13 && !evt.shiftKey) {
      evt.preventDefault();
      onSendMessage();
      return false;
    }
  };
</script>

<MessageMenu />

<div class="cw-controls">
  <textarea
    placeholder="Ask your question..."
    class="cw-input"
    on:keyup={onKeyUp}
    bind:value
  />
  <SendButton on:click={onSendMessage} />
  <MoreButton on:click={widgetStore.toggleMenu} />
</div>

<style lang="postcss">
  .cw-controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    min-height: 60px;
    z-index: 20001;
  }

  .cw-input {
    flex-grow: 1;
    height: 100%;
    min-height: 60px;
    max-height: 60px;
    resize: none;
    padding: 10px;
    font-size: 0.8rem;
    border: solid 1px transparent;
    transition: all 250ms ease-in-out;
  }

  .cw-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }
</style>
