<script>
  import ChatControls from "../(components)/chat-controls.svelte";
  import ChatHeader from "../(components)/chat-header.svelte";
  import ChatTyping from "../(components)/chat-typing.svelte";
  import ChatMessageList from "../(components)/chat-message-list.svelte";
  import Chat from "../(components)/chat.svelte";
</script>

<Chat>
  <ChatHeader />
  <ChatMessageList />
  <ChatTyping />
  <ChatControls />
</Chat>
