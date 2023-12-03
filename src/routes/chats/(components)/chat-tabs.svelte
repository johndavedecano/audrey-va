<script>
  // @ts-nocheck

  import chatStore from "$lib/stores/chat.store";

  $: active = $chatStore.chatTab;

  const setChatTab = (next) => chatStore.setChatTab(next);
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div role="tablist" class="tabs tabs-bordered border-b chat-tabs">
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    role="tab"
    on:click={() => setChatTab("session")}
    class="tab flex-1"
    class:active={active === "session"}>Session</a
  >
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    role="tab"
    on:click={() => setChatTab("customer")}
    class="tab flex-1"
    class:active={active === "customer"}>Customer</a
  >
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    role="tab"
    on:click={() => setChatTab("attachments")}
    class="tab flex-1"
    class:active={active === "attachments"}>Attachments</a
  >
  <!-- svelte-ignore a11y-interactive-supports-focus -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    role="tab"
    on:click={() => setChatTab("history")}
    class="tab flex-1"
    class:active={active === "history"}>History</a
  >
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-missing-attribute -->
  <a
    role="tab"
    on:click={() => setChatTab("notes")}
    class="tab flex-1"
    class:active={active === "notes"}>Notes</a
  >
</div>

<style lang="postcss">
  .chat-tabs {
    @apply flex;
  }
  .active {
    @apply bg-purple-100 tab-active;
  }
</style>
