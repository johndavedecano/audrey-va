<script>
  // @ts-nocheck
  import WelcomeForm from "./WelcomeForm.svelte";
  import Message from "./Message.svelte";
  import widgetStore from "$lib/stores/widget.store";

  let distance = false;
  let wrapper;

  $: isLoggedIn = $widgetStore.isLoggedIn;

  $: widget = $widgetStore.widget;

  $: messages = $widgetStore.messages;

  const scroll = (node) => {
    const func = () => {
      distance = node.scrollHeight - node.scrollTop - node.clientHeight;
    };

    node.addEventListener("scroll", func);

    return {
      destroy() {
        node.removeEventListener("scroll", func);
      },
    };
  };

  let timeout;

  const scrollToBottom = () => {
    if (wrapper) {
      clearTimeout(timeout);
      timeout = setTimeout(() => (wrapper.scrollTop = wrapper.scrollHeight));
    }
  };

  $: if (messages.length && distance <= 120) scrollToBottom();
</script>

<div class="cw-message-list" bind:this={wrapper} use:scroll>
  <div class="cw-message-list-inner">
    {#if isLoggedIn}
      {#each messages as message}
        <Message {message} {widget} />
      {/each}
    {:else}
      <WelcomeForm />
    {/if}
  </div>
</div>

<style lang="postcss">
  .cw-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: calc(100% - 145px);
    max-height: calc(100% - 145px);
  }

  .cw-message-list-inner {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* For WebKit browsers */
  .cw-message-list::-webkit-scrollbar {
    width: 8px; /* Width of the entire scrollbar */
    transition: all 250ms ease-in-out;
  }

  .cw-message-list::-webkit-scrollbar-thumb {
    background-color: transparent; /* Color of the thumb */
    border-radius: 6px; /* Rounded corners of the thumb */
  }

  .cw-message-list::-webkit-scrollbar-track {
    background-color: transparent; /* Color of the track */
  }

  .cw-message-list:hover::-webkit-scrollbar-thumb {
    background-color: var(--primary-color); /* Color of the thumb */
  }

  .cw-message-list:hover::-webkit-scrollbar-track {
    background-color: #f1f1f1; /* Color of the track */
  }
</style>
