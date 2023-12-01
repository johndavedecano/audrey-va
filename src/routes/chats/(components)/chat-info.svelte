<script>
  import chatStore from "$lib/stores/chat.store";
  import {
    IconChevronRight,
    IconClick,
    IconClock,
    IconPlus,
    IconUserEdit,
    IconX,
  } from "@tabler/icons-svelte";
  import ChatMembers from "./chat-members.svelte";
  import ChatTabs from "./chat-tabs.svelte";
  import ChatUserAgent from "./chat-user-agent.svelte";
  import ChatLocation from "./chat-location.svelte";
  import ChatAttributes from "./chat-attributes.svelte";
  import ChatRating from "./chat-rating.svelte";

  // @ts-nocheck
  $: open = $chatStore.info;
</script>

<div class="chat-info" class:chat-info-show={open}>
  <div class="text-center font-bold py-4 text-4xl">
    12:00<br />

    <div class="text-gray-400 text-base flex items-center justify-center">
      <span class="flex gap-2"> <IconClock /> Handling Time</span>
    </div>
  </div>
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
  <ChatTabs />
  <div class="flex flex-col gap-2 pt-4">
    <ChatAttributes />
    <ChatRating />
    <ChatMembers />
    <ChatUserAgent />
    <ChatLocation />
  </div>
</div>

<style>
  .chat-info {
    @apply h-full hidden flex-col bg-white border-l overflow-y-auto;
    min-width: 360px;
    height: calc(100vh - 61px);
    max-height: calc(100vh - 61px);
  }

  .chat-info-show {
    @apply flex;
  }
</style>
