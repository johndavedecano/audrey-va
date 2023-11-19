<script>
  // @ts-nocheck

  export let widget = {};
</script>

<form action="">
  <p class="cw-welcome-message">
    {widget.welcome_message}
  </p>
  <div class="cw-form-group">
    <input type="text" placeholder="Name" />
  </div>

  <div class="cw-form-group">
    <input type="email" placeholder="Email Address" />
  </div>

  {#if widget.welcome_form.phone}
    <div class="cw-form-group">
      <input type="tel" placeholder="Phone Number" />
    </div>
  {/if}

  {#if widget.welcome_form.message}
    <div class="cw-form-group">
      <textarea placeholder="Message or Question" />
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
  }

  .cw-welcome-message {
    margin-bottom: 15px;
  }
</style>
