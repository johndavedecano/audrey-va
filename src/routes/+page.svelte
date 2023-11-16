<script>
  // @ts-nocheck
  export let data;
</script>

<svelte:head>
  <title>{data.settings.name}</title>
  <meta property="og:image" content={data.settings.logo} />
  <link rel="prefetch" href="/auth/login" />
  <link rel="prefetch" href="/auth/register" />
  <link rel="prefetch" href="/auth/forgot" />
</svelte:head>
