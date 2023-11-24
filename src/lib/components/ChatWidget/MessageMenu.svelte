<script>
  // @ts-nocheck

  import { clickoutside } from "@svelte-put/clickoutside";

  import widgetStore from "$lib/stores/widget.store";

  export let open = false;

  // const onDownloadTranscript = () => {
  //   open = false;
  // };

  const onEndChat = () => {
    open = false;
  };

  const onToggleSound = () => {
    open = false;
    widgetStore.toggleSound();
  };

  const onClickOutside = () => (open = false);

  $: sound = $widgetStore.sound;
</script>

<div
  class="cw-menu"
  use:clickoutside
  class:cw-menu-open={open}
  on:clickoutside={onClickOutside}
>
  <!-- <a
    href="/"
    class="cw-menu-item"
    on:click|preventDefault={onDownloadTranscript}>Transcript</a
  > -->
  <a href="/" class="cw-menu-item" on:click|preventDefault={onToggleSound}>
    {sound ? "Turn-off Sound" : "Turn-on Sound"}
  </a>
  <a href="/" class="cw-menu-item" on:click|preventDefault={onEndChat}
    >End Chat</a
  >
</div>

<style lang="postcss">
  .cw-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20000;
    right: 0;
    min-width: 120px;
    min-height: 80px;
    bottom: -600px;
    background-color: white;
    box-shadow: 0px 2px 3px -3px rgba(0, 0, 0, 0.1);
    transition: all 250ms ease-in-out;
  }

  .cw-menu-item {
    color: var(--primary-color);
    font-size: 0.813rem;
    font-weight: bold;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
    transition: all 250ms ease-in-out;
  }

  .cw-menu-item:hover {
    color: white;
    background-color: var(--primary-color);
  }

  .cw-menu-open {
    bottom: 65px;
  }
</style>
