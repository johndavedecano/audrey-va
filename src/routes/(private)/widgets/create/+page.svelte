<script>
  // @ts-nocheck
  import ChatWidget from "$lib/components/ChatWidget.svelte";

  let values = {
    name: "Untitled Widget",
    title: "Chat Support",
    color: "#03A9F4",
    welcome_message: "Hello how can i help you today",
    enable_welcome_form: true,
    bot_avatar_url: "https://mighty.tools/mockmind-api/content/cartoon/29.jpg",
    bot_name: "Audrey",
    agent_avatar_url: "",
    welcome_form: {
      name: {
        label: "Name",
        type: "text",
        required: true,
        enabled: true,
      },
      phone: {
        label: "Phone",
        type: "text",
        required: true,
        enabled: true,
      },
      email: {
        label: "Email",
        type: "email",
        required: true,
        enabled: true,
      },
      message: {
        label: "Message",
        type: "textarea",
        required: true,
        enabled: true,
      },
    },
  };

  $: console.log(values.welcome_form);
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 m-4">
  <div>
    <div class="card rounded-none lg:rounded-md flex-1 bg-base-100 shadow-xl">
      <div class="card-body px-4 lg:px-6">
        <h2 class="card-title">Create New Widget</h2>

        <div class="form-control w-full">
          <label class="label" for="name"> Name </label>
          <input
            name="name"
            type="text"
            class="input input-bordered w-full"
            bind:value={values.name}
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="title"> Header Title </label>
          <input
            name="title"
            type="text"
            class="input input-bordered w-full"
            bind:value={values.title}
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="welcome_message"> Welcome Message </label>
          <textarea
            name="welcome_message"
            class="textarea textarea-bordered w-full"
            bind:value={values.welcome_message}
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="bot_name"> Bot Name </label>
          <input
            name="bot_name"
            type="text"
            class="input input-bordered w-full"
            bind:value={values.bot_name}
          />
        </div>

        <div class="form-control w-full">
          <label class="label" for="bot_avatar_url"> Bot Avatar URL</label>
          <input
            name="bot_avatar_url"
            type="text"
            class="input input-bordered w-full"
            bind:value={values.bot_avatar_url}
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

        <div class="form-control w-full mt-4">
          <div class="flex items-center gap-4">
            <input
              type="checkbox"
              bind:checked={values.enable_welcome_form}
              class="checkbox checkbox-primary"
            />
            <span>Show Welcome Form</span>
          </div>
        </div>

        {#if values.enable_welcome_form}
          <div class="border p-4 flex flex-col gap-4 mt-4">
            <div class="form-control w-full mt-2">
              <div class="flex items-center gap-4">
                <input
                  type="checkbox"
                  bind:checked={values.welcome_form.phone.enabled}
                  class="checkbox checkbox-primary"
                />
                <span>Ask for phone number?</span>
              </div>
            </div>

            <div class="form-control w-full mt-2">
              <div class="flex items-center gap-4">
                <input
                  type="checkbox"
                  bind:checked={values.welcome_form.message.enabled}
                  class="checkbox checkbox-primary"
                />
                <span>Ask for message or question?</span>
              </div>
            </div>
          </div>
        {/if}

        <div class="flex items-center pt-6">
          <div class="flex-1" />
          <button class="btn btn-primary"> Save Changes </button>
        </div>
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
