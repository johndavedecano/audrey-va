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
    <Header hideToggle>
      <div class="flex-1" />
      <CurrentUser user={data.user} />
    </Header>
    <slot />
  </svelte:fragment>
</Wrapper>

<Portal>
  <SvelteEasyToast />
</Portal>

<svelte:head>
  <title>Admin Portal</title>
</svelte:head>
