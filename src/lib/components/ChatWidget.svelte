<script>
  // @ts-nocheck
  import Portal from "svelte-portal";

  export let values = {};

  let open = true;

  $: variables = `
    --primary-color: ${values.color};
  `;
</script>

<Portal target="body">
  <div style={variables}>
    <div class="cw" class:cw-open={open}>
      <div class="cw-header">
        <div class="cw-avatar">
          {#if values.bot_avatar_url}
            <img src={values.bot_avatar_url} alt="" />
          {:else}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
          {/if}
        </div>
        <div class="cw-title">
          <div>
            {values.title}
          </div>
          <div class="cw-status">
            You are chatting with {values.bot_name}
          </div>
        </div>
        <a href="/" on:click|preventDefault={() => (open = false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </a>
      </div>
      <div class="cw-message-list">
        <div class="cw-message-list-inner">
          <div class="cw-message-wrapper">
            <div class="cw-message">
              <form action="">
                <p class="cw-welcome-message">
                  {values.welcome_message}
                </p>
                <div class="cw-form-group">
                  <input type="text" placeholder="Name" />
                </div>

                <div class="cw-form-group">
                  <input type="email" placeholder="Email Address" />
                </div>

                {#if values.welcome_form.phone}
                  <div class="cw-form-group">
                    <input type="tel" placeholder="Phone Number" />
                  </div>
                {/if}

                {#if values.welcome_form.message}
                  <div class="cw-form-group">
                    <textarea placeholder="Message or Question" />
                  </div>
                {/if}
                <button class="cw-btn"> Start Chat </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="cw-controls">
        <textarea placeholder="Ask your question..." class="cw-input" />
        <button class="cw-send">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
            ><path d="M0 0h24v24H0z" fill="none" /><path
              d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            /></svg
          >
        </button>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="cw-bubble"
      on:click={() => (open = true)}
      class:cw-bubble-hidden={open}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
        />
      </svg>
    </div>
  </div>
</Portal>

<style lang="postcss">
  /* your styles go here */
  .cw {
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 30px;
    background-color: #fbfcfe;
    height: 0px;
    width: 350px;
    font-size: 16px;
    transition: all 250ms ease-in-out;
    bottom: 30px;
    overflow: hidden;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .cw-message-list {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    min-height: calc(100% - 145px);
    max-height: calc(100% - 145px);
  }

  .cw-controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    min-height: 60px;
  }

  .cw-input {
    flex-grow: 1;
    height: 100%;
    max-height: 60px;
    resize: none;
    padding: 15px;
    font-size: 0.8rem;
  }

  .cw-input:focus {
    outline: none;
  }

  .cw-send {
    padding-left: 15px;
    padding-right: 15px;
  }

  .cw-send > svg {
    fill: var(--primary-color);
  }

  .cw-open {
    bottom: 30px;
    height: 600px;
  }

  .cw-header {
    min-height: 85px;
    display: flex;
    align-items: center;
    background-color: var(--primary-color);
    color: white;
    padding-left: 15px;
    padding-right: 15px;
    gap: 10px;
  }

  .cw-title {
    flex-grow: 1;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .cw-status {
    font-size: 0.8rem;
    font-weight: 300;
  }

  .cw-avatar {
    width: 42px;
    height: 42px;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .cw-bubble {
    width: 60px;
    height: 60px;
    background-color: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 30px;
    right: 30px;
    cursor: pointer;
    transition: all 350ms ease-in-out;
    opacity: 1;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  }

  .cw-bubble-hidden {
    opacity: 0;
  }

  .cw-message-list-inner {
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .cw-message-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .cw-message {
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  }

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
