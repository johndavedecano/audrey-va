<script>
  import { IconClock } from "@tabler/icons-svelte";

  const items = Array.from(new Array(25));
</script>

<div class="px-4 py-4">
  <div class="flex gap-1 border flex-col w-full">
    <div
      class="flex justify-start items-center border-b px-2 py-1 text-gray-400"
    >
      <div class="flex items-center font-bold text-xs text-purple-900">
        New Note
      </div>
      <div class="flex-1"></div>
    </div>
    <div class="flex flex-col text-sm p-4 text-gray-700">
      <textarea
        class="textarea textarea-bordered w-full mb-4"
        rows="5"
        placeholder="Write Something...`"
      ></textarea>
      <button class="btn btn-primary btn-sm"> Submit Note </button>
    </div>
  </div>
</div>

<div class="flex flex-col gap-4 p-4 notes-list">
  {#each items as item}
    <div class="flex gap-1 border flex-col w-full">
      <div
        class="flex justify-start items-center border-b px-2 py-1 text-gray-400"
      >
        <div class="flex items-center font-bold text-xs text-purple-900">
          James Aranas
        </div>
        <div class="flex-1"></div>
        <div class="flex items-center gap-1 text-xs">
          <IconClock size={16} />
          10 minutes ago
        </div>
      </div>
      <div class="flex items-center text-sm p-4 text-gray-700">
        Seiji started the chat
      </div>
    </div>
  {/each}
</div>

<style lang="postcss">
  .notes-list {
    overflow-y: auto;
  }
</style>
