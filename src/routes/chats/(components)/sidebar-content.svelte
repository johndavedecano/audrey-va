<script>
  import { page } from "$app/stores";
  import { IconCheck, IconX } from "@tabler/icons-svelte";

  // @ts-nocheck
  const items = Array.from(new Array(15));

  $: id = parseInt($page.params.id);
</script>

<div class="sidebar-content">
  <a class="session session-incoming" href="/chats">
    <div class="avatar online">
      <div class="w-12 rounded-full">
        <img
          alt=""
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="session-content">
      <div class="session-user">John Dave Decano</div>
      <div class="session-text">I got some question...</div>
    </div>
    <div class="session-action">
      <a href="/" class="btn btn-primary btn-xs btn-square">
        <IconCheck size={16} />
      </a>
      <a href="/" class="btn btn-error text-white btn-xs btn-square">
        <IconX size={16} />
      </a>
    </div>
  </a>
  {#each items as item, i}
    <a class="session" class:session-active={id === i} href="/chats/{i}">
      <div class="avatar online">
        <div class="w-12 rounded-full">
          <img
            alt=""
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div class="session-content">
        <div class="session-user">John Dave Decano</div>
        <div class="session-text">I got some question...</div>
      </div>
      <div class="session-time">12h</div>
    </a>
  {:else}
    <div class="session-empty">
      <div class="session-empty-text">No sessions found</div>
    </div>
  {/each}
</div>

<style>
  .sidebar-content {
    @apply flex flex-1 flex-col overflow-y-auto;
    max-height: calc(100% - 180px);
  }

  .session {
    @apply flex gap-4 items-center px-4;
    min-height: 90px;
  }

  .session-active {
    @apply bg-green-50;
  }

  .session-active:hover {
    @apply bg-green-100;
  }

  .session:hover {
    @apply bg-gray-50;
  }

  .session-content {
    @apply flex flex-col flex-1;
  }

  .session-user {
    @apply text-base font-bold;
  }

  .session-text {
    @apply text-sm text-gray-500;
  }

  .session-time {
    @apply text-sm text-gray-400;
  }

  .session-incoming {
    @apply bg-purple-100;
  }

  .session-action {
    @apply flex gap-1;
  }
</style>
