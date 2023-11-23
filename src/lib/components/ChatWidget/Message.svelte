<script>
  // @ts-nocheck
  import moment from "moment";
  import { onDestroy, onMount } from "svelte";

  export let widget = {};

  export let message = {
    author: "",
    author_avatar: "https://mighty.tools/mockmind-api/content/human/65.jpg",
    username: "",
    text: "",
    timestamp: "",
    session_id: "",
  };

  let timestamp;
  let timestamp_interval;

  const getAvatarUrl = () => {
    if (message.author === "agent") {
      return "https://mighty.tools/mockmind-api/content/human/65.jpg";
    }

    if (message.author === "bot") {
      return widget.bot_avatar_url;
    }
  };

  $: avatar_url = getAvatarUrl();

  onMount(() => {
    timestamp = moment(message.timestamp.toDate()).fromNow();

    timestamp_interval = setInterval(() => {
      timestamp = moment(message.timestamp.toDate()).fromNow();
    }, 3000);
  });

  onDestroy(() => clearInterval(timestamp_interval));
</script>

<div
  class="cw-message-wrapper"
  class:bot={message.author === "bot"}
  class:user={message.author === "user"}
  class:agent={message.author === "agent"}
>
  {#if message.author !== "user"}
    <div class="cw-avatar">
      <img src={avatar_url} alt={message.username} />
    </div>
  {/if}
  <div class="cw-messsage-content">
    <div class="cw-dateline">
      <span class="cw-author">
        {#if message.author == "user"}
          <span>You -</span>
        {:else}
          <span>{message.username} - </span>
        {/if}
      </span>
      {#if timestamp}
        <span>
          {timestamp}
        </span>
      {/if}
    </div>
    {#if Array.isArray(message.text)}
      {#each message.text as text}
        <div class="cw-message">
          {text}
        </div>
      {/each}
    {:else}
      <div class="cw-message">
        {message.text}
      </div>
    {/if}
  </div>
</div>

<style>
  .cw-message-wrapper {
    width: 100%;
    display: flex;
    gap: 5px;
  }

  .cw-message-wrapper.user {
    flex-direction: row-reverse;
  }

  .cw-avatar {
    height: 100%;
  }

  .cw-avatar img {
    min-width: 24px;
    max-width: 24px;
    height: auto;
    border-radius: 50%;
  }

  .cw-messsage-content {
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;
    flex-direction: column;
    gap: 5px;
  }

  .cw-message-wrapper.user .cw-messsage-content {
    justify-content: flex-end;
  }

  .cw-dateline {
    font-size: 0.688rem;
    color: #666666;
  }

  .cw-message-wrapper.user .cw-dateline {
    text-align: right;
  }

  .cw-message-wrapper.user .cw-message {
    background-color: var(--primary-color);
    color: white;
    margin-left: auto;
    margin-right: 0px;
  }

  .cw-message {
    background-color: white;
    border-radius: 5px;
    padding: 7.25px;
    font-size: 0.813rem;
    display: inline;
    margin-right: auto;
    margin-left: 0px;
  }

  .cw-author {
    font-weight: bold;
  }
</style>
