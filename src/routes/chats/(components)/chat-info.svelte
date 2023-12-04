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

  import ChatTabs from "./chat-tabs.svelte";
  import ChatActions from "./chat-actions.svelte";
  import ChatTime from "./chat-time.svelte";
  import ChatSession from "./chat-session.svelte";
  import ChatHistory from "./chat-history.svelte";
  import ChatNotes from "./chat-notes.svelte";
  import ChatCustomer from "./chat-customer.svelte";
  import ChatAttachments from "./chat-attachments.svelte";

  // @ts-nocheck
  $: open = $chatStore.info;

  $: active = $chatStore.chatTab;
</script>

<div class="chat-info" class:chat-info-show={open}>
  <ChatTime />
  <ChatActions />
  <ChatTabs />
  {#if active === "session"}
    <ChatSession />
  {:else if active === "history"}
    <ChatHistory />
  {:else if active === "notes"}
    <ChatNotes />
  {:else if active === "attachments"}
    <ChatAttachments />
  {:else if active === "customer"}
    <ChatCustomer />
  {:else}
    <div>not selected</div>
  {/if}
</div>

<style>
  .chat-info {
    @apply h-full hidden flex-col bg-white border-l overflow-hidden;
    min-width: 486px;
    height: calc(100vh - 61px);
    max-height: calc(100vh - 61px);
  }

  .chat-info-show {
    @apply flex;
  }
</style>
