<script>
  import {
    IconFile,
    IconMoodSmile,
    IconPhoto,
    IconSend,
  } from "@tabler/icons-svelte";
</script>

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

<style lang="postcss">
  .current-chat-controls {
    @apply flex items-center border-t;
    min-height: 60px;
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
</style>
