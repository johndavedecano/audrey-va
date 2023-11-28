<script>
  // @ts-nocheck

  import TableActions from "$lib/components/TableActions.svelte";
  import {
    IconChevronRight,
    IconClock,
    IconFilter,
    IconMessage,
    IconSearch,
    IconSettings,
    IconUsersGroup,
    IconX,
  } from "@tabler/icons-svelte";

  const onAction = (action) => {};

  const actions = [
    {
      icon: IconMessage,
      label: "Messages",
      action: "message",
    },
    {
      icon: IconUsersGroup,
      label: "Groups",
      action: "groups",
    },
    {
      icon: IconClock,
      label: "History",
      action: "history",
    },
  ];
</script>

<div class="sidebar">
  <div class="sidebar-top">
    <div class="sidebar-header">
      <a href="/dashboard" class="btn btn-link">
        <IconX size={24} />
      </a>
      <div class="flex-1">
        <div class="text-lg font-bold text-gray-700">Live Chats</div>
      </div>
      <TableActions {actions} on:action={(evt) => onAction(evt.detail)}>
        <IconSettings />
      </TableActions>
    </div>
    <div class="sidebar-search text-gray-600">
      <IconSearch size={24} />
      <input
        type="text"
        placeholder="Search Chats"
        class="input input-sm w-full max-w-xs"
      />
      <a href="/dashboard" class="btn btn-link" title="Change Status">
        <IconFilter size={24} />
      </a>
    </div>
  </div>
  <div class="sidebar-content">fdsfdsfdsf</div>
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
      <IconChevronRight size={24} />
    </a>
  </div>
</div>

<style>
  .sidebar {
    width: 360px;
    @apply h-screen flex flex-col bg-white border-r;
  }
  .sidebar-header {
    @apply border-b flex items-center gap-1;
    min-height: 60px;
  }
  .sidebar-search {
    @apply border-b flex items-center pl-4 gap-2;
    min-height: 60px;
  }
  .sidebar-content {
    @apply flex flex-1;
    max-height: calc(100% - 180px);
  }
  .sidebar-bottom {
    @apply border-t flex items-center pl-4 gap-4;
    min-height: 60px;
  }
</style>
