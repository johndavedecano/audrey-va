<script>
  import {
    IconDots,
    IconFile,
    IconMoodSmile,
    IconPhoto,
    IconSearch,
    IconSend,
  } from "@tabler/icons-svelte";

  const items = Array.from(new Array(100));
</script>

<div class="current-chat">
  <div class="current-chat-header">
    <div class="current-chat-info">
      <div class="avatar online">
        <div class="w-12 rounded-full">
          <img
            alt=""
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>
      <div class="current-chat-customer">
        <div class="text-base font-bold">John Dave Decano</div>
        <div class="text-sm text-gray-500">Last message at 24 hours ago</div>
      </div>
    </div>
    <div class="pr-4 flex gap-2">
      <a href="/" class="btn btn-circle btn-sm">
        <IconSearch size={16} />
      </a>
      <a href="/" class="btn btn-circle btn-sm">
        <IconDots size={16} />
      </a>
    </div>
  </div>
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
          <div class="chat-bubble bg-purple-100 text-black">
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
  <div class="typing">
    <div class="typing-inner">seiji is typing...</div>
  </div>
  <div class="current-chat-controls">
    <div class="controls">
      <a href="/" class="btn btn-link">
        <IconPhoto size={16} />
      </a>
      <a href="/" class="btn btn-link">
        <IconFile size={16} />
      </a>
    </div>
    <div class="textinput">
      <textarea></textarea>
    </div>
    <div class="actions">
      <a href="/" class="btn btn-link">
        <IconSend size={16} />
      </a>
      <a href="/" class="btn btn-link">
        <IconMoodSmile size={16} />
      </a>
    </div>
  </div>
</div>

<style lang="postcss">
  .current-chat {
    @apply flex flex-col bg-white flex-1 relative;
    min-height: calc(100vh - 60px);
    min-width: 500px;
  }

  .current-chat-header {
    @apply flex items-center border-b;
    min-height: 100px;
  }

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

  .current-chat-controls {
    @apply flex items-center border-t;
    min-height: 60px;
  }

  .current-chat-info {
    @apply px-4 flex gap-2 flex-1;
  }

  .current-chat-customer {
    @apply flex flex-col flex-1;
  }

  .controls {
    @apply flex px-2;
  }

  .textinput {
    @apply flex-1 flex flex-col items-center justify-center;
  }

  .textinput textarea {
    @apply w-full border-none p-2 resize-none box-border bg-gray-100 rounded-lg outline-none text-sm text-gray-700;
    height: 40px;
  }

  .typing {
    @apply px-4 pointer-events-none bg-purple-50 py-1 justify-center flex items-center text-sm text-gray-500 absolute w-full italic;
    bottom: 60px;
  }

  .typing-inner {
    @apply flex flex-col mx-auto;
    max-width: 800px;
    width: 100%;
  }
</style>
