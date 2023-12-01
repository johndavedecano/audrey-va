<script>
  // @ts-nocheck

  export let position = "start";

  export let author = "";

  export let username = "";

  export let avatar = "";

  export let text = [];

  export let timestamp = "";
</script>

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
