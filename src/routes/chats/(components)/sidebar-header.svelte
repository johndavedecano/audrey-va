<script>
  // @ts-nocheck

  import TableActions from "$lib/components/TableActions.svelte";

  import {
    IconClock,
    IconMessage,
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

<div class="sidebar-header">
  <a href="/dashboard" class="btn btn-link">
    <IconX size={16} />
  </a>
  <div class="flex-1">
    <div class="text-lg font-bold text-gray-700">Live Chats</div>
  </div>
  <TableActions {actions} on:action={(evt) => onAction(evt.detail)}>
    <IconSettings size={16} />
  </TableActions>
</div>

<style>
  .sidebar-header {
    @apply border-b flex items-center gap-1;
    min-height: 60px;
  }
</style>
