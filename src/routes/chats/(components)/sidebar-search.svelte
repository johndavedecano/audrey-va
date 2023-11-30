<script>
  // @ts-nocheck

  import { IconFilter, IconSearch, IconX } from "@tabler/icons-svelte";

  let value = "";

  const onFilter = () => {};

  const onClear = () => {
    value = "";
  };
</script>

<div class="sidebar-search text-gray-600">
  <a
    href="/dashboard"
    on:click|preventDefault={onClear}
    class="btn btn-link"
    title="Change Status"
  >
    {#if value}
      <IconX size={16} />
    {:else}
      <IconSearch size={16} />
    {/if}
  </a>

  <input
    type="text"
    placeholder="Search Chats"
    class="input input-sm w-full max-w-xs"
    bind:value
  />
  <a
    href="/dashboard"
    on:click|preventDefault={onFilter}
    class="btn btn-link"
    title="Change Status"
  >
    <IconFilter size={16} />
  </a>
</div>

<style>
  .sidebar-search {
    @apply border-b flex items-center pl-4 gap-2;
    min-height: 60px;
  }
</style>
