<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { IconPaint } from "@tabler/icons-svelte";

  import axios from "axios";
  import PageHead from "$lib/components/PageHead.svelte";
  import PageMain from "$lib/components/PageMain.svelte";
  import TableDropdown from "$lib/components/TableDropdown.svelte";

  let items = [];
  let widget = {};
  let embed = false;

  const onAddNew = () => goto("/widgets/create");

  const loadItems = () => {
    axios
      .get("/widgets/all")
      .then((response) => {
        items = response.data.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const onActionClicked = (action, item) => {
    switch (action) {
      case "settings":
        goto("/widgets/" + item.id + "/edit");
        break;
      case "dialogflow":
        goto("/widgets/" + item.id + "/dialogflow");
        break;
      case "view":
        goto(`/widget?o=${item.org}&w=${item.id}`);
        break;
      case "code":
        widget = item;
        break;
      case "delete":
        onDelete(item);
        break;
    }
  };

  const onDelete = async (item) => {
    const conf = window.confirm("are you sure you want to delete this widget?");
    if (conf) {
      await axios.delete("/widgets/" + item.id + "/edit");
      loadItems();
    }
  };

  onMount(() => loadItems());
</script>

<PageMain>
  <PageHead
    title="Manage Widgets"
    subtitle="A chat widget is a component for facilitating real-time communication between users."
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
          <!-- row 1 -->
          {#each items as item}
            <!-- content here -->
            <tr>
              <td>
                <div class="flex items-center gap-3">
                  <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                      <img src={item.bot_avatar_url} alt={item.bot_name} />
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{item.name}</div>
                    <div class="text-sm opacity-50 flex items-center gap-4">
                      {item.bot_name}
                      <div
                        class="badge badge-sm"
                        style="background-color: {item.color};"
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td class="text-right">
                <TableDropdown
                  on:action={(evt) => onActionClicked(evt.detail, item)}
                />
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
        No users available
      </div>
    </div>
  {/if}
</PageMain>
