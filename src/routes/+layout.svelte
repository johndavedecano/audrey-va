<script>
  // @ts-nocheck
  import "./../app.css";
  import "$lib/firebase.js";
</script>

<slot />

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style lang="postcss">
  :global(body, html) {
    font-family: "Roboto", sans-serif;
  }
</style>
