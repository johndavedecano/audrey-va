<script>
  import chatStore from "$lib/stores/chat.store";
  import {
    IconClock,
    IconDots,
    IconQuestionMark,
    IconSearch,
  } from "@tabler/icons-svelte";

  const onToggleInfo = () => {
    chatStore.toggleInfo();
  };
</script>

<div class="current-chat-header">
  <div class="current-chat-info">
    <div class="avatar online">
      <div class="w-12 rounded-full">
        <img
          alt=""
          src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        />
      </div>
    </div>
    <div class="current-chat-customer">
      <div class="text-base font-bold">John Dave Decano</div>
      <div class="text-sm text-gray-500">Last message at 24 hours ago</div>
    </div>
  </div>
  <div class="pr-4 flex gap-2">
    <div class="flex-1"></div>
    <a href="/" class="btn btn-circle btn-sm">
      <IconQuestionMark size={16} />
    </a>
    <a href="/" class="btn btn-circle btn-sm">
      <IconSearch size={16} />
    </a>
    <a
      href="/"
      class="btn btn-circle btn-sm"
      on:click|preventDefault={onToggleInfo}
    >
      <IconDots size={16} />
    </a>
  </div>
</div>

<style lang="postcss">
  .current-chat-header {
    @apply flex items-center border-b;
    min-height: 100px;
  }

  .current-chat-controls {
    @apply flex items-center border-t;
    min-height: 60px;
  }

  .current-chat-info {
    @apply px-4 flex gap-2 flex-1;
  }

  .current-chat-customer {
    @apply flex flex-col flex-1;
  }
</style>
