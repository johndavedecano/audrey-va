<script>
  // @ts-nocheck

  export let widget = {};

  let modal;

  let values = {};

  let hidden = false;

  let loading = false;

  const onSubmit = async () => {
    try {
      loading = true;

      await axios.post(
        "/widgets/" + widget.organization + "/dialogflow",
        values
      );

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

  export const close = () => modal.close();

  export const open = ({
    dialogflow_project_id,
    dialogflow_private_key,
    dialogflow_client_email,
    dialogflow_knowledge_base,
  }) => {
    values = {
      dialogflow_project_id: dialogflow_project_id,
      dialogflow_private_key: dialogflow_private_key,
      dialogflow_client_email: dialogflow_client_email,
      dialogflow_knowledge_base: dialogflow_knowledge_base,
    };
    modal.showModal();
  };
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <div class="text-lg font-bold">Dialogflow Setting</div>
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
            type="text"
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
          on:click={() => close()}
        >
          Close
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
</dialog>
