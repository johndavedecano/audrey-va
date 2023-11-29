<script>
  // @ts-nocheck
  import { IconChevronRight } from "@tabler/icons-svelte";
</script>

<div class="sidebar-bottom">
  <div class="avatar online">
    <div class="w-8 rounded-full">
      <img
        alt=""
        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
      />
    </div>
  </div>
  <div class="flex flex-col flex-1">
    <div class="text-sm font-bold text-black">John Dave Decano</div>
    <div class="text-xs text-gray-500">Ready</div>
  </div>
  <a href="/dashboard" class="btn btn-link" title="Filter">
    <IconChevronRight size={16} />
  </a>
</div>

<style>
  .sidebar-bottom {
    @apply border-t flex items-center pl-4 gap-4;
    min-height: 60px;
  }
</style>
