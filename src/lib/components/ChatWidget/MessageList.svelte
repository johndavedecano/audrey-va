<script>
  // @ts-nocheck

  import { onDestroy, onMount } from "svelte";

  // export let widget = {};
  let distance = false;
  let wrapper;

  const checkScroll = (node) => {
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

  const scrollToBottom = () => {
    wrapper.scrollTop = wrapper.scrollHeight;
  };

  const onMessageAdded = () => {
    // console.log(scroll, "added");
    setTimeout(() => {
      if (distance <= 80) {
        scrollToBottom();
      }
    });
  };

  onMount(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 1000);
    window.addEventListener("message_added", onMessageAdded);
  });

  onDestroy(() => {
    window.removeEventListener("message_added", onMessageAdded);
  });
</script>

<div class="cw-message-list" bind:this={wrapper} use:checkScroll>
  <div class="cw-message-list-inner">
    <slot />
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
</style>
