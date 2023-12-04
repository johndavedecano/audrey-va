<script>
  import "./../../app.css";

  import Header from "$lib/components/Header.svelte";
  import Wrapper from "$lib/components/Wrapper.svelte";
  import CurrentUser from "$lib/components/CurrentUser.svelte";
  import Portal from "svelte-portal";
  import { SvelteEasyToast } from "svelte-easy-toast";

  import Sidebar from "./(components)/sidebar.svelte";

  export let data;
</script>

<Wrapper>
  <Sidebar slot="sidebar" />
  <svelte:fragment slot="content">
    <div class="header">
      <div class="px-4 flex w-full items-center">
        <div class="flex-1" />
        <CurrentUser user={data.user} />
      </div>
    </div>
    <div class="flex flex-1">
      <slot />
    </div>
  </svelte:fragment>
</Wrapper>

<Portal>
  <SvelteEasyToast />
</Portal>

<svelte:head>
  <title>Admin Portal</title>
</svelte:head>

<style>
  .header {
    @apply w-full bg-white border-b flex items-center fixed top-0 left-0 right-0 z-10;
    height: 60px;
  }
</style>
