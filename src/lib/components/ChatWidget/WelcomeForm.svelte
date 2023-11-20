<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";

  export let widget = {};

  let values = {};

  const dispatch = createEventDispatcher("submit", values);

  const onSubmit = () => {
    dispatch("submit", values);
  };
</script>

<form action="" on:submit={onSubmit}>
  <p class="cw-welcome-message">
    {widget.welcome_message}
  </p>
  <div class="cw-form-group">
    <input type="text" placeholder="Name" required bind:value={values.name} />
  </div>

  <div class="cw-form-group">
    <input
      type="email"
      placeholder="Email Address"
      required
      bind:value={values.email}
    />
  </div>

  {#if widget.welcome_form.phone}
    <div class="cw-form-group">
      <input
        type="tel"
        placeholder="Phone Number"
        required
        bind:value={values.phone}
      />
    </div>
  {/if}

  {#if widget.welcome_form.message}
    <div class="cw-form-group">
      <textarea
        placeholder="Message or Question"
        required
        bind:value={values.message}
      />
    </div>
  {/if}
  <button class="cw-btn"> Start Chat </button>
</form>

<style>
  .cw-form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
  }

  .cw-btn {
    background-color: var(--primary-color);
    color: white;
    border-radius: 5px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 7.25px;
  }

  .cw-form-group input,
  .cw-form-group textarea {
    border: solid 1px #d8d8db;
    border-radius: 5px;
    width: 100%;
    min-width: 280px;
    padding: 8px 12px;
    outline: none;
    transition: all 250ms ease-in-out;
  }

  .cw-form-group input:focus,
  .cw-form-group textarea:focus {
    border-color: var(--primary-color);
  }

  .cw-welcome-message {
    margin-bottom: 15px;
  }
</style>
