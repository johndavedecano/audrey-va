<script>
  // @ts-nocheck
  import MessageMenu from "./MessageMenu.svelte";
  import MoreButton from "./MoreButton.svelte";
  import SendButton from "./SendButton.svelte";
  import widgetStore from "$lib/stores/widget.store";

  let value = "";

  const onSendMessage = () => {
    if (value) {
      value = "";
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
