<script>
  // @ts-nocheck

  import Search from "./sidebar-search.svelte";
  import Header from "./sidebar-header.svelte";
  import Tabs from "./sidebar-tabs.svelte";
  import Bottom from "./sidebar-bottom.svelte";
  import Content from "./sidebar-content.svelte";
</script>

<div class="sidebar">
  <div class="sidebar-top">
    <Header />
    <Search />
  </div>
  <Tabs />
  <Content />
  <Bottom />
</div>

<style>
  .sidebar {
    width: 360px;
    @apply h-screen flex flex-col bg-white border-r;
  }
  .sidebar-content {
    @apply flex flex-1 flex-col;
    max-height: calc(100% - 180px);
  }
</style>
