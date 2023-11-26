<script>
  // @ts-nocheck
  import WelcomeForm from "./WelcomeForm.svelte";
  import Message from "./Message.svelte";
  import widgetStore from "$lib/stores/widget.store";

  let distance = false;
  let wrapper, timeout;

  $: isLoggedIn = $widgetStore.isLoggedIn;

  $: sessionId = $widgetStore.sessionId;

  $: widget = $widgetStore.widget;

  $: messages = $widgetStore.messages;

  $: active = isLoggedIn && sessionId;

  const scroll = (node) => {
    let scrollTimeout;
    const func = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(
        () =>
          (distance = node.scrollHeight - node.scrollTop - node.clientHeight)
      );
    };

    node.addEventListener("scroll", func);

    return {
      destroy() {
        node.removeEventListener("scroll", func);
      },
    };
  };

  const scrollToBottom = () => {
    if (wrapper) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (distance <= 60) {
          wrapper.scrollTop = wrapper.scrollHeight;
        }
      });
    }
  };

  $: len = messages.length;

  $: if (len) scrollToBottom();
</script>

<div class="cw-message-list" bind:this={wrapper} use:scroll>
  <div class="cw-message-list-inner">
    {#if active}
      {#each messages as message}
        <Message {message} {widget} />
      {/each}
    {:else}
      <WelcomeForm />
    {/if}
  </div>
  <div class="cw-typing" class:cw-typing-show={$widgetStore.typing}>
    {$widgetStore.typing}
  </div>
</div>

<style lang="postcss">
  .cw-typing {
    font-size: 0.688rem;
    color: #666666;
    padding: 15px;
    width: 100%;
    background-color: #fbfcfe;
    position: fixed;
    bottom: 50px;
    left: 0;
    right: 0;
    display: none;
    transition: all 250ms ease-in-out;
    opacity: 0.9;
  }

  .cw-typing-show {
    display: block;
  }

  .cw-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: calc(100% - 145px);
    max-height: calc(100% - 145px);
    position: relative;
  }

  .cw-message-list-inner {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scroll-behavior: smooth;
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
