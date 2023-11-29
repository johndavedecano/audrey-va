<script>
  const items = Array.from(new Array(100));
</script>

<div class="current-chat">
  <div class="current-chat-header">dsfdsfdsf</div>
  <div class="current-chat-message-list">
    <div class="current-chat-message-list-inner">
      {#each items as item}
        <div class="chat chat-start">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="chat-header">
            Obi-Wan Kenobi
            <time class="text-xs opacity-50">12:45</time>
          </div>
          <div class="chat-bubble">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget libero non elit posuere vehicula. Fusce sodales vestibulum
            lectus, nec imperdiet risus.
          </div>
          <div class="chat-footer opacity-50">Delivered</div>
        </div>
        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div class="chat-header">
            Anakin
            <time class="text-xs opacity-50">12:46</time>
          </div>
          <div class="chat-bubble">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget libero non elit posuere vehicula. Fusce sodales vestibulum
            lectus, nec imperdiet risus.
          </div>
          <div class="chat-footer opacity-50">Seen at 12:46</div>
        </div>
      {/each}
    </div>
  </div>
  <div class="current-chat-controls">ewrewrew</div>
</div>

<style lang="postcss">
  .current-chat {
    @apply flex flex-col bg-white flex-1;
    min-height: calc(100vh - 60px);
  }

  .current-chat-header {
    @apply flex items-center border-b;
    min-height: 100px;
  }

  .current-chat-message-list {
    @apply flex flex-col flex-1 overflow-y-auto;
    height: calc(100vh - 268px);
    max-height: calc(100vh - 268px);
  }

  .current-chat-message-list-inner {
    @apply flex flex-col p-4;
  }

  .current-chat-controls {
    @apply flex items-center border-t;
    min-height: 100px;
  }
</style>
