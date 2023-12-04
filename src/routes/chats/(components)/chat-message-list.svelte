<script>
  import ChatSearch from "./chat-search.svelte";

  const items = Array.from(new Array(100));
</script>

<div class="current-chat-message-list">
  <ChatSearch />
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
        <div class="chat-bubble bg-purple-100 text-black">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget
          libero non elit posuere vehicula. Fusce sodales vestibulum lectus, nec
          imperdiet risus.
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
        <div class="flex flex-col items-end gap-2">
          <div class="chat-bubble bg-gray-50 text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget libero non elit posuere vehicula. Fusce sodales vestibulum
            lectus, nec imperdiet risus.
          </div>

          <div class="chat-bubble bg-gray-50 text-black">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            eget libero non elit posuere vehicula. Fusce sodales vestibulum
            lectus, nec imperdiet risus.
          </div>
        </div>

        <div class="chat-footer opacity-50">Seen at 12:46</div>
      </div>
    {/each}
  </div>
</div>

<style lang="postcss">
  .current-chat-message-list {
    @apply overflow-y-auto relative;
    height: calc(100vh - 220px);
    max-height: calc(100vh - 220px);
    padding-bottom: 60px;
  }

  .current-chat-message-list-inner {
    @apply flex flex-col p-4 mx-auto;
    max-width: 800px;
    width: 100%;
  }
</style>
