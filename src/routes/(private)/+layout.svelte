<script>
  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Wrapper from "$lib/components/Wrapper.svelte";
  import MenuAdmin from "$lib/components/MenuAdmin.svelte";
  import BrandName from "$lib/components/BrandName.svelte";
  import CurrentUser from "$lib/components/CurrentUser.svelte";

  export let data;
</script>

<Wrapper>
  <Sidebar slot="sidebar">
    <MenuAdmin />
  </Sidebar>
  <svelte:fragment slot="content">
    <Header>
      <BrandName />
      <div class="flex-1" />
      <CurrentUser user={data.user} />
    </Header>
    <slot />
  </svelte:fragment>
</Wrapper>

<svelte:head>
  <title>Admin Portal</title>
</svelte:head>
