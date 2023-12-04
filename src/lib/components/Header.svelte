<script>
  import { SidebarStore } from "$lib/stores/sidebar.store";

  import ToggleIcon from "$lib/components/ToggleIcon.svelte";

  export let hideToggle = false;

  const onToggle = () => {
    SidebarStore.update((v) => {
      return {
        open: !v.open,
      };
    });
  };
</script>

<header class="header">
  {#if !hideToggle}
    <ToggleIcon on:toggle={onToggle} />
  {/if}
  <slot />
</header>

<style lang="postcss">
  .header {
    @apply flex items-center bg-white px-4 absolute w-full top-0 z-10 shadow-sm lg:shadow-none border-b;
    min-height: 60px;
  }
</style>
