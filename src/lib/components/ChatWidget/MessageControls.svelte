<script>
  // @ts-nocheck

  import MessageMenu from "./MessageMenu.svelte";
  import MoreButton from "./MoreButton.svelte";
  import SendButton from "./SendButton.svelte";

  let menu = false;

  const onSendMessage = () => {};
</script>

<MessageMenu bind:open={menu} />

<div class="cw-controls">
  <textarea placeholder="Ask your question..." class="cw-input" />
  <SendButton on:click={onSendMessage} />
  <MoreButton on:click={() => (menu = !menu)} />
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
