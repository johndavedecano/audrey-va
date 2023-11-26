<script>
  // @ts-nocheck
  import { auth } from "$lib/firebase";

  import widgetStore from "$lib/stores/widget.store";

  $: widget = $widgetStore.widget;

  const onMinimize = () => {
    window.parent.postMessage("cw-minimize");
    widgetStore.toggleMenu(false);
  };
</script>

<div class="cw-header">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore missing-declaration -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="cw-avatar">
    {#if widget.bot_avatar_url}
      <img src={widget.bot_avatar_url} alt="" />
    {:else}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    {/if}
  </div>
  <div class="cw-title">
    <div>
      {widget.title}
    </div>
    <div class="cw-status">
      You are chatting with {widget.bot_name}
    </div>
  </div>
  <a href="/" on:click|preventDefault={onMinimize}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  </a>
</div>

<style lang="postcss">
  .cw-header {
    min-height: 85px;
    display: flex;
    align-items: center;
    background-color: var(--primary-color);
    color: white;
    padding-left: 15px;
    padding-right: 15px;
    gap: 10px;
  }

  .cw-title {
    flex-grow: 1;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .cw-status {
    font-size: 0.8rem;
    font-weight: 300;
  }

  .cw-avatar {
    width: 42px;
    height: 42px;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
</style>
