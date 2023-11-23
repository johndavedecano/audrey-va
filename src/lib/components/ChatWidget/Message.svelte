<script>
  // @ts-nocheck
  import moment from "moment";

  export let widget = {};

  export let session = {};

  export let message = {
    author: "",
    author_avatar: "https://mighty.tools/mockmind-api/content/human/65.jpg",
    username: "",
    text: "",
    timestamp: "",
    session_id: "",
  };

  const getAvatarUrl = () => {
    if (message.author === "agent") {
      return "https://mighty.tools/mockmind-api/content/human/65.jpg";
    }

    if (message.author === "bot") {
      return widget.bot_avatar_url;
    }
  };

  $: avatar_url = getAvatarUrl();
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
      {moment(message.timestamp.toDate()).fromNow()}
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
    width: 24px;
    height: 24px;
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
    border-radius: 10px;
    padding: 10px;
    font-size: 0.813rem;
    display: inline;
    margin-right: auto;
    margin-left: 0px;
  }

  .cw-author {
    font-weight: bold;
  }
</style>
