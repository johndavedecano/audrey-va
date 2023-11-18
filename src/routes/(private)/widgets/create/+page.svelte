<script>
  // @ts-nocheck
  import { goto } from "$app/navigation";

  import axios from "axios";

  import ChatWidget from "$lib/components/ChatWidget.svelte";

  let values = {
    name: "Untitled Widget",
    title: "Chat Support",
    color: "#03A9F4",
    welcome_message: "Hello how can i help you today",
    bot_avatar_url: "https://mighty.tools/mockmind-api/content/cartoon/29.jpg",
    bot_name: "Audrey",
    dialogflow_project_id: "",
    welcome_form: {
      phone: true,
      message: true,
    },
  };

  let loading = false;

  const onSubmit = async () => {
    try {
      loading = true;

      await axios.post("/widgets/create", values);

      alert("successfully created");

      loading = false;

      goto("/widgets");
    } catch (error) {
      loading = false;
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
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
  <div>
    <div class="card rounded-none lg:rounded-md flex-1 bg-base-100 shadow-xl">
      <div class="card-body px-4 lg:px-6">
        <h2 class="card-title">Create New Widget</h2>

        <form action="" on:submit|preventDefault={onSubmit}>
          <div class="form-control w-full">
            <label class="label" for="name"> Name </label>
            <input
              name="name"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.name}
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="title"> Header Title </label>
            <input
              name="title"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.title}
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="dialogflow_project_id">
              Dialogflow ProjectID
            </label>
            <input
              name="dialogflow_project_id"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.dialogflow_project_id}
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="bot_name"> Bot Name </label>
            <input
              name="bot_name"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.bot_name}
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="bot_avatar_url"> Bot Avatar URL</label>
            <input
              name="bot_avatar_url"
              type="text"
              class="input input-bordered w-full"
              bind:value={values.bot_avatar_url}
              required
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="color"> Color </label>
            <input
              name="color"
              type="color"
              class="input input-bordered w-full"
              bind:value={values.color}
            />
          </div>

          <div class="form-control w-full">
            <label class="label" for="welcome_message"> Welcome Message </label>
            <textarea
              name="welcome_message"
              class="textarea textarea-bordered w-full"
              bind:value={values.welcome_message}
              required
            />
          </div>

          <div class="flex flex-col gap-4 mt-4">
            <div class="form-control w-full mt-2">
              <div class="flex items-center gap-4">
                <input
                  type="checkbox"
                  bind:checked={values.welcome_form.phone}
                  class="checkbox checkbox-primary"
                  required
                />
                <span>Ask for phone number?</span>
              </div>
            </div>

            <div class="form-control w-full mt-2">
              <div class="flex items-center gap-4">
                <input
                  type="checkbox"
                  bind:checked={values.welcome_form.message}
                  class="checkbox checkbox-primary"
                  required
                />
                <span>Ask for message or question?</span>
              </div>
            </div>
          </div>

          <div class="flex items-center pt-6">
            <div class="flex-1" />
            <button class="btn btn-primary" type="submit" disabled={loading}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div>
    <div class="card rounded-none lg:rounded-md flex-1">
      <div class="card-body px-4 lg:px-6">
        <div class="flex items-center justify-center">
          <ChatWidget {values} />
        </div>
      </div>
    </div>
  </div>
</div>
