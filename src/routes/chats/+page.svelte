<script>
  import { IconMessage } from "@tabler/icons-svelte";
</script>

<div class="flex flex-1 items-center page justify-center">
  <div class="text-lg flex justify-center items-center gap-2 flex-col">
    <IconMessage size={100} />
    <div class="flex justify-center">No Chat Selected</div>
  </div>
</div>

<style lang="postcss">
  .page {
    height: calc(100vh - 61px);
  }
</style>
