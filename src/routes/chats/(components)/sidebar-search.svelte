<script>
  // @ts-nocheck

  import { IconFilter, IconSearch } from "@tabler/icons-svelte";
</script>

<div class="sidebar-search text-gray-600">
  <IconSearch size={16} />
  <input
    type="text"
    placeholder="Search Chats"
    class="input input-sm w-full max-w-xs"
  />
  <a href="/dashboard" class="btn btn-link" title="Change Status">
    <IconFilter size={16} />
  </a>
</div>

<style>
  .sidebar-search {
    @apply border-b flex items-center pl-4 gap-2;
    min-height: 60px;
  }
</style>
