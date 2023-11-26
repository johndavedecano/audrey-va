<script>
  // @ts-nocheck
  import { v4 } from "uuid";

  import MessageMenu from "./MessageMenu.svelte";
  import MoreButton from "./MoreButton.svelte";
  import SendButton from "./SendButton.svelte";
  import widgetStore from "$lib/stores/widget.store";
  import axios from "axios";
  import moment from "moment";

  let value = "";

  $: session = $widgetStore.session;

  $: widget = $widgetStore.widget;

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

        if (session.current_target === "va") {
          setTimeout(() => {
            widgetStore.addTyping(`${widget.bot_name} is thinking...`);
          }, 500);
        }

        value = "";

        const params = {
          message_id: message.id,
          message: message.text,
          session_token: session.session_token,
        };

        await axios.post("/widget/message", params);

        if (session.current_target === "va") {
          widgetStore.hideTyping();
        }
      }
    } catch (error) {
      console.error(error);
      widgetStore.hideTyping("bot");
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
