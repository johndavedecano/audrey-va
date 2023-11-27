<script>
  // @ts-nocheck
  import Timezones from "$lib/components/Timezones.svelte";
  import { errorMessage } from "$lib/string";
  import axios from "axios";
  import { createEventDispatcher } from "svelte";

  let modal;

  let loading = false;

  const initialValue = {
    id: null,
    name: "",
    enabled: false,
    timezone: "",
    schedules: {
      monday: {
        enabled: true,
        start: null,
        end: null,
      },
      tuesday: {
        enabled: true,
        start: null,
        end: null,
      },
      wednesday: {
        enabled: true,
        start: null,
        end: null,
      },
      thursday: {
        enabled: true,
        start: null,
        end: null,
      },
      friday: {
        enabled: true,
        start: null,
        end: null,
      },
      saturday: {
        enabled: false,
        start: null,
        end: null,
      },
      sunday: {
        enabled: false,
        start: null,
        end: null,
      },
    },
  };

  let value = { ...initialValue };

  const dispatch = createEventDispatcher();

  const createGroup = () => {
    return axios.post("/groups", { ...value, id: undefined });
  };

  const updateGroup = () => {
    return axios.post(`/groups/${value.id}`, { ...value, id: undefined });
  };

  const onSubmit = async () => {
    try {
      loading = true;

      if (value.id) {
        await updateGroup();
      } else {
        await createGroup();
      }

      loading = false;

      close();

      dispatch("refresh");

      value = initialValue;
    } catch (error) {
      loading = false;
      alert(errorMessage(error));
    }
  };

  export const open = (item = {}) => {
    value = { ...value, ...item };
    modal.showModal();
    dispatch("opened");
  };

  export const close = () => {
    modal.close();
    dispatch("closed ");
  };
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box group-modal">
    <div class="text-lg font-bold mb-4">Manage Group</div>

    <form action="" on:submit|preventDefault={onSubmit}>
      <div class="form-control w-full mb-4">
        <label class="label" for="name"> Name</label>
        <input
          name="name"
          type="text"
          class="input input-bordered w-full"
          bind:value={value.name}
          required
          disabled={loading}
        />
      </div>

      <div class="form-control w-full mb-4">
        <label class="label" for="timezone"> Timezone</label>
        <Timezones bind:value={value.timezone} disabled={loading} />
      </div>

      <div class="form-control w-full mb-4">
        <label class="label" for="schedules"> Schedules</label>
        {#each Object.keys(value.schedules) as key}
          <div class="flex items-center mb-2">
            <div class="flex flex-1 gap-4 items-center">
              <input
                type="checkbox"
                class="checkbox checkbox-primary"
                bind:checked={value.schedules[key].enabled}
                disabled={loading}
              />
              <span class="uppercase font-bold">
                {key}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <input
                name="name"
                type="time"
                class="input input-bordered w-full time"
                bind:value={value.schedules[key].start}
                disabled={loading}
              />
              <input
                name="name"
                type="time"
                class="input input-bordered w-full time"
                bind:value={value.schedules[key].end}
                disabled={loading}
              />
            </div>
          </div>
        {/each}
      </div>

      <div class="flex items-center gap-4">
        <label
          class="flex items-center justify-start gap-4 cursor-pointer px-0"
        >
          <input
            type="checkbox"
            checked="checked"
            class="checkbox checkbox-primary"
            disabled={loading}
          />
          <span class="label-text">Enable</span>
        </label>
        <div class="flex-1"></div>
        <button class="btn" type="button" disabled={loading}>Cancel</button>
        <button class="btn btn-primary" type="submit" disabled={loading}
          >Save</button
        >
      </div>
    </form>
  </div>
</dialog>

<style lang="postcss">
  .group-modal {
    width: 700px;
    max-width: calc(100vw - 40px);
  }
  .time {
    min-width: 120px;
  }
</style>
