<script>
  import "./../../app.css";

  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";
  import Wrapper from "$lib/components/Wrapper.svelte";
  import MenuAdmin from "$lib/components/MenuAdmin.svelte";
  import BrandName from "$lib/components/BrandName.svelte";
  import CurrentUser from "$lib/components/CurrentUser.svelte";
  import Portal from "svelte-portal";
  import { SvelteEasyToast } from "svelte-easy-toast";
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

<Portal>
  <SvelteEasyToast />
</Portal>

<svelte:head>
  <title>Admin Portal</title>

  <script src="//cdn.quilljs.com/1.3.6/quill.min.js"></script>
  <link href="//cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
  <link href="//cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
</svelte:head>
