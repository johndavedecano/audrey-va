<script>
  export let widget = {};
</script>

<div class="cw-message-list">
  <div class="cw-message-list-inner">
    <slot />
  </div>
</div>

<style lang="postcss">
  .cw-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: calc(100% - 145px);
    max-height: calc(100% - 145px);
  }
  .cw-message-list-inner {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
</style>
