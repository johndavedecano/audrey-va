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
  import ChatActions from "./chat-actions.svelte";
  import ChatTime from "./chat-time.svelte";
  import ChatSession from "./chat-session.svelte";
  import ChatHistory from "./chat-history.svelte";
  import ChatNotes from "./chat-notes.svelte";

  // @ts-nocheck
  $: open = $chatStore.info;
</script>

<div class="chat-info" class:chat-info-show={open}>
  <ChatTime />
  <ChatActions />
  <ChatTabs />
  <!-- <ChatSession /> -->
  <!-- <ChatHistory /> -->
  <ChatNotes />
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
