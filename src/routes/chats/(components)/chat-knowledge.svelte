<script>
  // @ts-nocheck

  import chatStore from "$lib/stores/chat.store";
  import { IconEdit, IconSearch, IconX } from "@tabler/icons-svelte";

  $: show = $chatStore.chatKnowledge;

  let value;

  const items = Array.from(new Array(10));
</script>

<div class="chat-knowledge" class:chat-knowledge-show={show}>
  <div class="border-b flex items-center p-2 gap-4">
    {#if value}
      <button class="btn btn-sm" on:click={() => (value = "")}>
        <IconX size={16} />
      </button>
    {:else}
      <button class="btn btn-sm">
        <IconSearch size={16} />
      </button>
    {/if}
    <input
      type="text"
      placeholder="Search Knowledgebase"
      class="input input-sm flex-1"
      bind:value
    />
  </div>

  <div class="flex flex-col flex-1 overflow-y-auto">
    {#each items as item}
      <div class="search-item">
        <div class="flex flex-1 flex-col">
          <div class="font-bold text-sm text-purple-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit?
          </div>
          <div class="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus
            in lectus at porttitor. Interdum et malesuada fames ac ante ipsum
            primis in faucibus.
          </div>
        </div>
        <button class="btn btn-sm">
          <IconEdit size={16} />
        </button>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .chat-knowledge {
    @apply bg-white absolute left-0 right-0 top-0 bottom-0 z-20 hidden flex-col w-full h-full overflow-y-auto;
  }
  .chat-knowledge-show {
    @apply flex;
  }
  .search-item {
    @apply flex p-4 gap-4 items-center;
  }
</style>
