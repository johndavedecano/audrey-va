<div class="wrapper">
  <slot name="sidebar" />
  <div class="content">
    <slot name="content" />
  </div>
  <slot name="right" />
</div>

<style lang="postcss">
  .wrapper {
    @apply w-screen h-screen flex bg-gray-100;
  }

  .content {
    @apply flex flex-col flex-1 relative max-h-screen h-screen overflow-y-auto ml-auto;
    padding-top: 60px;
  }
</style>
