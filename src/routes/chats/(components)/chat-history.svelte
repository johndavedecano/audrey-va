<script>
  import { IconClock } from "@tabler/icons-svelte";

  const items = Array.from(new Array(25));
</script>

<div class="flex flex-col gap-4 p-4 history-list">
  {#each items as item}
    <div class="flex gap-1 flex-col w-full">
      <div
        class="flex items-center text-sm text-gray-800 bg-gray-50 rounded-md p-2"
      >
        Seiji started the chat
      </div>
      <div class="flex justify-end items-center text-gray-400">
        <div class="flex items-center gap-1 text-xs">
          <IconClock size={16} />
          10 minutes ago
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  .history-list {
    overflow-y: auto;
  }
</style>
