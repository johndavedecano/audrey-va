<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  import PageHead from "$lib/components/PageHead.svelte";
  import PageMain from "$lib/components/PageMain.svelte";

  import {
    IconBrandGoogle,
    IconCode,
    IconEdit,
    IconEye,
    IconPaint,
    IconPlug,
    IconTrash,
  } from "@tabler/icons-svelte";

  import axios from "axios";

  let items = [];

  const onAddNew = () => goto("/widgets/create");

  const loadItems = () => {
    axios
      .get("/widgets/all")
      .then((response) => {
        items = response.data.data;
        console.log(items);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const onEdit = (item) => {
    goto("/widgets/" + item.id + "/edit");
  };

  const onDelete = () => {
    const conf = window.confirm("are you sure you want to delete this widget?");
    if (conf) {
      // TODO:
    }
  };

  const onView = (item) => {
    goto(`/widget?o=${item.org}&w=${item.id}`);
  };

  const onIntegrate = (item) => {
    goto("/widgets/" + item.id + "/dialogflow");
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
                <div>
                  <button
                    class="btn btn-success text-white btn-square"
                    on:click={() => onView(item)}
                  >
                    <IconEye size={16} />
                  </button>
                  <button
                    class="btn btn-warning btn-square text-white"
                    on:click={() => onIntegrate(item)}
                  >
                    <IconPlug size={16} />
                  </button>
                  <button
                    class="btn btn-primary btn-square"
                    on:click={() => onEdit(item)}
                  >
                    <IconEdit size={16} />
                  </button>
                  <button
                    class="btn btn-error text-white btn-square"
                    on:click={() => onDelete(item)}
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
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
