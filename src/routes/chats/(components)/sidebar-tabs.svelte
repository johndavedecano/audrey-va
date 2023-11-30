<script>
  // @ts-nocheck
  import chatStore from "$lib/stores/chat.store";

  const onClick = (next) => {
    current = next;
    chatStore.setActiveTab(next);
  };

  $: current = $chatStore.tab;
</script>

<div class="sidebar-tabs w-full border-b">
  <div role="tablist" class="tabs tabs-bordered w-full flex">
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a
      role="tab"
      on:click={() => onClick("queue")}
      class="flex-1 tab"
      class:active={current === "queue"}
      class:tab-active={current === "queue"}>Queue</a
    >
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a
      role="tab"
      on:click={() => onClick("active")}
      class="flex-1 tab"
      class:active={current === "active"}
      class:tab-active={current === "active"}>Active</a
    >
    <!-- svelte-ignore a11y-missing-attribute -->
    <!-- svelte-ignore a11y-interactive-supports-focus -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <a
      role="tab"
      on:click={() => onClick("closed")}
      class="flex-1 tab"
      class:active={current === "closed"}
      class:tab-active={current === "closed"}>Closed</a
    >
  </div>
</div>

<style lang="postcss">
  .active {
    @apply text-white bg-purple-900;
  }
</style>
