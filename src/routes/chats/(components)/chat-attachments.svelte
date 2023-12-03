<script>
  const items = Array.from(new Array(20));
</script>

<div class="grid grid-cols-4 gap-4 p-4 overflow-y-auto">
  {#each items as item}
    <a
      href="/"
      class="thumb"
      style="background-image: url(https://mighty.tools/mockmind-api/content/human/65.jpg);"
    >
    </a>
  {/each}
</div>

<style lang="postcss">
  .thumb {
    @apply bg-gray-50;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-position: center;
    object-fit: contain;
    background-size: cover;
  }
</style>
