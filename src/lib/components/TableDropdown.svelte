<script>
  // @ts-nocheck

  import { clickoutside } from "@svelte-put/clickoutside";

  import {
    IconApi,
    IconCalendar,
    IconClock,
    IconCode,
    IconDotsVertical,
    IconEyeCode,
    IconSettings,
    IconTrash,
  } from "@tabler/icons-svelte";

  import { createEventDispatcher } from "svelte";

  import Portal from "svelte-portal";

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
  <IconDotsVertical size={20} />
</button>

<Portal target="body">
  <div use:clickoutside on:clickoutside={() => (open = false)}>
    <div
      class="bg-white flex flex-col justify-start shadow-md table-dropdown absolute"
      class:table-dropdown-open={open}
      {style}
    >
      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("view")}
        href="/"
      >
        <IconEyeCode size={16} /> View Widget
      </a>
      <!-- <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("schedules")}
        href="/"
      >
        <IconCalendar size={16} /> Schedules
      </a>
      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("maintenance")}
        href="/"
      >
        <IconClock size={16} /> Maintenance
      </a> -->
      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("settings")}
        href="/"
      >
        <IconSettings size={16} /> Appreance
      </a>

      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("dialogflow")}
        href="/"
      >
        <IconApi size={16} /> Dialogflow
      </a>

      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("code")}
        href="/"
      >
        <IconCode size={16} /> Embed Code
      </a>
      <a
        class="dropdown-item"
        on:click|preventDefault={() => onActionClick("delete")}
        href="/"
      >
        <IconTrash size={16} /> Archive
      </a>
    </div>
  </div>
</Portal>

<style>
  .table-dropdown {
    width: 200px;
    max-width: 200px;
    min-height: 100px;
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
