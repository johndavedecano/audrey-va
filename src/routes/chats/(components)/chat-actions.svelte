<script>
  import { IconChevronRight, IconX } from "@tabler/icons-svelte";
</script>

<div
  class="p-2 w-full border-b border-t flex items-center gap-2 justify-center"
>
  <button class="btn flex-1 btn-success text-white btn-sm">
    <IconChevronRight size={16} /> Transfer
  </button>
  <button class="btn flex-1 btn-sm btn-error text-white">
    <IconX size={16} /> Close Chat
  </button>
</div>
