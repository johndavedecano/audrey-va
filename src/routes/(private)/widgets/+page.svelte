<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";

  import PageHead from "$lib/components/PageHead.svelte";
  import PageMain from "$lib/components/PageMain.svelte";

  const onAddNew = () => goto("/widgets/create");
</script>

<PageMain>
  <PageHead
    title="Manage Widgets"
    subtitle="A chat widget is a component for facilitating real-time communication between users."
    on:add={onAddNew}
  />
</PageMain>
