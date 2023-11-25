<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";

  import axios from "axios";
  import { onMount } from "svelte";

  export let data;

  let values = {};

  let loading = false;

  let hidden = true;

  const onSubmit = async () => {
    try {
      loading = true;

      await axios.post("/widgets/" + data.id + "/dialogflow", values);

      alert("successfully updated");

      loading = false;

      hidden = true;
    } catch (error) {
      loading = false;
      hidden = true;
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };

  onMount(() => {
    values = {
      dialogflow_project_id: data.dialogflow_project_id,
      dialogflow_private_key: data.dialogflow_private_key,
      dialogflow_client_email: data.dialogflow_client_email,
      dialogflow_knowledge_base: data.dialogflow_knowledge_base,
    };
  });
</script>

<div class="m-6 lg:max-w-5xl">
  <div class="card rounded-none lg:rounded-md flex-1 bg-base-100 shadow-xl">
    <div class="card-body px-4 lg:px-6">
      <h2 class="card-title">Dialogflow Settings</h2>

      <form action="" on:submit|preventDefault={onSubmit}>
        <div class="form-control w-full">
          <label class="label" for="dialogflow_project_id"> Project ID </label>
          {#if hidden}
            <input
              name="dialogflow_project_id"
              type="password"
              class="input input-bordered w-full"
              value={values.dialogflow_project_id}
              required
            />
          {:else}
            <input
              name="dialogflow_project_id"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_project_id}
              required
            />
          {/if}
        </div>

        <div class="form-control w-full">
          <label class="label" for="dialogflow_private_key"> Private Key</label>
          {#if hidden}
            <textarea
              name="dialogflow_private_key"
              class="textarea textarea-bordered w-full"
              value="..."
              required
            />
          {:else}
            <textarea
              name="dialogflow_private_key"
              class="textarea textarea-bordered w-full"
              bind:value={values.dialogflow_private_key}
              required
            />
          {/if}
        </div>

        <div class="form-control w-full">
          <label class="label" for="dialogflow_client_email">
            Client Email
          </label>
          {#if hidden}
            <input
              name="dialogflow_client_email"
              type="password"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_client_email}
              required
            />
          {:else}
            <input
              name="dialogflow_client_email"
              type="email"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_client_email}
              required
            />
          {/if}
        </div>

        <div class="form-control w-full">
          <label class="label" for="dialogflow_knowledge_base">
            Knowledge Base
          </label>
          {#if hidden}
            <input
              name="dialogflow_knowledge_base"
              type="password"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_knowledge_base}
              required
            />
          {:else}
            <input
              name="dialogflow_knowledge_base"
              type="email"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_knowledge_base}
              required
            />
          {/if}
        </div>

        <div class="flex items-center pt-6">
          <button
            class="btn"
            type="button"
            disabled={loading}
            on:click={() => goto("/widgets")}
          >
            Back to Widgets
          </button>

          <div class="flex-1" />
          <button
            class="btn btn-error text-white mr-4"
            type="button"
            disabled={loading}
            on:click={() => (hidden = !hidden)}
          >
            {hidden ? "Show Values" : "Hide Values"}
          </button>
          <button class="btn btn-primary" type="submit" disabled={loading}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
