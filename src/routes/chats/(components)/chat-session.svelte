<script>
  import ChatMembers from "./chat-members.svelte";
  import ChatUserAgent from "./chat-user-agent.svelte";
  import ChatLocation from "./chat-location.svelte";
  import ChatAttributes from "./chat-attributes.svelte";
  import ChatRating from "./chat-rating.svelte";
</script>

<div class="flex flex-col gap-2 pt-4">
  <ChatAttributes />
  <ChatRating />
  <ChatMembers />
  <ChatUserAgent />
  <ChatLocation />
</div>
