<script>
  // @ts-nocheck
  import { signInWithCustomToken } from "firebase/auth";
  import { errorMessage } from "$lib/string";
  import { auth } from "$lib/firebase";

  import axios from "axios";
  import widgetStore from "$lib/stores/widget.store";

  $: loading = $widgetStore.loading;

  $: widget = $widgetStore.widget;

  $: isLoggedIn = $widgetStore.isLoggedIn;

  let values = {
    email: "johndavedecano@gmail.com",
    phone: "+639204809825",
    name: "John Dave Decano",
    message: "welcome_message",
  };

  const onMessageUpdate = () => {};

  const onSessionUpdate = () => {};

  const onSessionCreated = (sessionId) => {
    widgetStore.setLoading(false);
    widgetStore.setSessionId(sessionId);
    widgetStore.addMessageListener(sessionId, onMessageUpdate);
    widgetStore.addSessionListener(sessionId, onSessionUpdate);
  };

  const getParameters = () => {
    return {
      email: values.email,
      phone: values.phone,
      name: values.name,
      message: values.message,
      organization_id: widget.organization,
      widget_id: widget.id,
    };
  };

  const startSession = async () => {
    try {
      widgetStore.setLoading(true);

      const params = getParameters();

      const response = await axios.post("/widget/session", params);

      const data = response.data.data;

      await signInWithCustomToken(auth, data.token);

      widgetStore.setLoggedIn(true);

      onSessionCreated(data.session_id);
    } catch (error) {
      widgetStore.setLoading(false);

      console.error(error);

      alert(errorMessage(error));
    }
  };

  const resetSession = async () => {
    try {
      widgetStore.setLoading(true);

      const params = getParameters();

      params.id_token = await auth.currentUser.getIdToken();

      const response = await axios.post("/widget/session_new", params);

      const data = response.data.data;

      onSessionCreated(data.session_id);
    } catch (error) {
      widgetStore.setLoading(false);

      console.error(error);

      alert(errorMessage(error));
    }
  };

  const onSubmit = () => (isLoggedIn ? resetSession() : startSession());
</script>

<div class="cw-message-form-wrapper">
  <div class="cw-message-form">
    <form action="" on:submit|preventDefault={onSubmit}>
      <p class="cw-welcome-message">
        {widget.welcome_message}
      </p>
      <div class="cw-form-group">
        <input
          type="text"
          placeholder="Name"
          required
          bind:value={values.name}
          disabled={loading}
        />
      </div>

      <div class="cw-form-group">
        <input
          type="email"
          placeholder="Email Address"
          required
          bind:value={values.email}
          disabled={loading}
        />
      </div>

      {#if widget.welcome_form.phone}
        <div class="cw-form-group">
          <input
            type="tel"
            placeholder="Phone Number"
            required
            bind:value={values.phone}
            disabled={loading}
          />
        </div>
      {/if}

      {#if widget.welcome_form.message}
        <div class="cw-form-group">
          <textarea
            placeholder="Message or Question"
            required
            bind:value={values.message}
            disabled={loading}
          />
        </div>
      {/if}
      <button class="cw-btn" disabled={loading}>
        {loading ? "Please Wait..." : "Start Conversation"}
      </button>
    </form>
  </div>
</div>

<style>
  .cw-message-form-wrapper {
    width: 100%;
  }

  .cw-message-form {
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    font-size: 0.813rem;
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
