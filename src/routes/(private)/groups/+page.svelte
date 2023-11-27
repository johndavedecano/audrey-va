<script>
  // @ts-nocheck
  import axios from "axios";
  import PageHead from "$lib/components/PageHead.svelte";
  import PageMain from "$lib/components/PageMain.svelte";
  import GroupModal from "./(components)/GroupModal.svelte";
  import TableActions from "$lib/components/TableActions.svelte";

  import { groups } from "$lib/stores/groups.store";
  import { onMount } from "svelte";
  import { errorMessage } from "$lib/string";

  import {
    IconEdit,
    IconPaint,
    IconSettings,
    IconTrash,
  } from "@tabler/icons-svelte";

  $: items = $groups;

  let modal;

  let loading;

  const onAddNew = () => {
    modal.open({});
  };

  const loadGroups = async () => {
    try {
      loading = true;

      const response = await axios
        .get("/groups/index")
        .then((response) => response.data.data);

      groups.set(response);

      loading = false;
    } catch (error) {
      loading = false;
      alert(errorMessage(error));
    }
  };

  const onDeleteItem = async (item) => {
    const conf = window.confirm("are you sure you want to delete this item?");
    if (conf) {
      try {
        loading = true;

        await axios.delete(`/groups/${item.id}`);

        loading = false;

        loadGroups();
      } catch (error) {
        loading = false;
        alert(errorMessage(error));
      }
    }
  };

  const onAction = (action, item) => {
    console.log(action, item);
    switch (action) {
      case "settings":
        modal.open(item);
        break;
      case "archive":
        onDeleteItem(item);
        break;
    }
  };

  const actions = [
    {
      icon: IconEdit,
      label: "Settings",
      action: "settings",
    },
    {
      icon: IconTrash,
      label: "Archive",
      action: "archive",
    },
  ];

  onMount(() => loadGroups());
</script>

<GroupModal bind:this={modal} on:refresh={loadGroups} />

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
            <th>Name</th>
            <th>Timezone</th>
            <th>Enabled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {#each items as item}
            <tr>
              <td>{item.name}</td>
              <td>{item.timezone}</td>
              <td>{item.enabled ? "Yes" : "No"}</td>
              <td class="text-right">
                <TableActions
                  {actions}
                  on:action={(evt) => onAction(evt.detail, item)}
                >
                  <IconSettings />
                </TableActions>
              </td>
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
