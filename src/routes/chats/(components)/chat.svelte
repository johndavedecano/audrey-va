<div class="current-chat">
  <slot />
</div>

<style lang="postcss">
  .current-chat {
    @apply flex flex-col bg-white flex-1 relative;
    min-height: calc(100vh - 60px);
    min-width: 500px;
  }
</style>
