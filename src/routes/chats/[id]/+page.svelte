<div class="chat">
  <div class="chat-header">dsfdsfdsf</div>
  <div class="chat-message-list">sdfdsfsd</div>
  <div class="chat-controls">ewrewrew</div>
</div>

<style lang="postcss">
  .chat {
    @apply flex flex-col bg-white;
    min-height: calc(100vh - 61px);
  }

  .chat-header {
    @apply flex items-center border-b;
    min-height: 100px;
  }

  .chat-message-list {
    @apply flex flex-col flex-1 overflow-y-auto;
    min-height: calc(100vh - 264px);
  }

  .chat-controls {
    @apply flex items-center border-t;
    min-height: 100px;
  }
</style>
