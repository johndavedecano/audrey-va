<script>
  // @ts-nocheck

  import chatStore from "$lib/stores/chat.store";

  import {
    IconChevronDown,
    IconChevronUp,
    IconSearch,
    IconX,
  } from "@tabler/icons-svelte";

  let value;

  $: show = $chatStore.chatSearch;

  $: if (show) value = "";
</script>

<div class="chat-search" class:chat-search-show={show}>
  {#if value}
    <button
      class="btn btn-sm bg-transparent border-none px-1"
      on:click={() => (value = "")}
    >
      <IconX size={16} />
    </button>
  {:else}
    <button class="btn btn-sm bg-transparent border-none px-1">
      <IconSearch size={16} />
    </button>
  {/if}
  <input
    type="text"
    placeholder="Search Chats"
    class="input input-sm flex-1"
    bind:value
  />
  <span class="text-sm text-gray-500"> 10 results </span>
  <button class="btn btn-sm border-none bg-transparent px-1">
    <IconChevronDown size={16} />
  </button>
  <button class="btn btn-sm border-none bg-transparent px-1">
    <IconChevronUp size={16} />
  </button>
  <button
    class="btn btn-sm text-gray-600 text-xs uppercase"
    on:click={chatStore.toggleChatSearch}
  >
    Close
  </button>
</div>

<style lang="postcss">
  .chat-search {
    @apply bg-white border-b hidden items-center px-2 py-2.5 sticky top-0 z-20 w-full gap-1;
  }

  .chat-search-show {
    @apply flex;
  }
</style>
