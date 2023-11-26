<script>
  // @ts-nocheck

  import PageHead from "$lib/components/PageHead.svelte";
  import PageMain from "$lib/components/PageMain.svelte";

  import { groups } from "$lib/stores/groups.store";
  import { IconPaint } from "@tabler/icons-svelte";
  import GroupModal from "./(components)/GroupModal.svelte";

  $: items = $groups;

  let modal;

  const onAddNew = () => {
    modal.open({});
  };
</script>

<GroupModal bind:this={modal} />

<PageMain>
  <PageHead
    title="Manage Groups"
    subtitle="Skill groups used for routing live chat sessions"
    on:add={onAddNew}
  />
  {#if items.length > 0}
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <td>Name</td>
            <td />
          </tr>
        </thead>
        <tbody>
          {#each items as item}
            <tr>
              <td>{item.name}</td>
              <td>{item.enabled ? "Yes" : "No"}</td>
              <td class="text-right"> test </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  {:else}
    <div class="p-6 border flex items-center mt-6 h-96 justify-center">
      <div
        class="text-lg font-bold flex justify-center flex-col items-center gap-6"
      >
        <div class="text-center">
          <IconPaint size={100} />
        </div>
        No skill groups
      </div>
    </div>
  {/if}
</PageMain>
