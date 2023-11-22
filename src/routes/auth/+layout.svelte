<script>
  // @ts-nocheck
  import "./../../app.css";
</script>

<div class="wrapper">
  <div class="header">
    <img src="/logo.png" alt="Logo" />
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="postcss">
  .wrapper {
    @apply h-screen w-screen max-h-screen overflow-y-auto bg-white flex flex-col relative;
  }

  .header {
    @apply flex items-center justify-center w-full text-center py-8;
  }

  .header img {
    max-width: 150px;
  }

  .content {
    @apply flex justify-center flex-1 pb-16;
  }
</style>
