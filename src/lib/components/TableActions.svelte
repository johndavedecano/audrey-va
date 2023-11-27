<script>
  // @ts-nocheck

  import { clickoutside } from "@svelte-put/clickoutside";

  import {
    IconApi,
    IconCode,
    IconDotsVertical,
    IconEyeCode,
    IconSettings,
    IconTrash,
  } from "@tabler/icons-svelte";

  import { createEventDispatcher } from "svelte";

  import Portal from "svelte-portal";

  export let actions = [];

  let button;

  let open = false;

  let coord = {};

  const dispatch = createEventDispatcher();

  const updatePosition = () => {
    const rect = button.getBoundingClientRect();
    coord = {
      left: rect.left,
      top: rect.top,
    };
  };

  const toggle = () => (open = !open);

  $: open && button && updatePosition();

  $: style = `left: ${coord.left - 150}px; top:${coord.top + 45}px;`;

  const onActionClick = (action) => {
    dispatch("action", action);
    toggle();
  };
</script>

<button
  class="btn bg-transparent border-none"
  on:click|stopPropagation={toggle}
  bind:this={button}
>
  {#if $$slots.default}
    <slot />
  {:else}
    <IconDotsVertical size={20} />
  {/if}
</button>

<Portal target="body">
  <div use:clickoutside on:clickoutside={() => (open = false)}>
    <div
      class="bg-white flex flex-col justify-start shadow-md table-dropdown absolute"
      class:table-dropdown-open={open}
      {style}
    >
      {#each actions as item}
        <a
          class="dropdown-item"
          on:click|preventDefault={() => onActionClick(item.action)}
          href="/"
        >
          {#if item.icon}
            <svelte:component this={item.icon} size={16} />
          {/if}
          {item.label}
        </a>
      {/each}
    </div>
  </div>
</Portal>

<style>
  .table-dropdown {
    width: 200px;
    max-width: 200px;
    top: 0;
    right: 0;
    transition: all 250ms ease-in-out;
    display: none;
  }

  .table-dropdown-open {
    display: flex;
  }

  .dropdown-item {
    @apply text-sm font-bold flex px-3 py-2 gap-3 cursor-pointer items-center bg-white;
  }

  .dropdown-item:hover {
    @apply bg-primary text-white;
  }
</style>
