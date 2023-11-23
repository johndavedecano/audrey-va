<script>
  // @ts-nocheck
  export let widget = {};

  let menu = false;

  const onDownloadTranscript = () => {
    menu = false;
  };

  const onEndChat = () => {
    menu = false;
  };

  const onToggleSound = () => {
    menu = false;
  };
</script>

<div class="cw-menu" class:cw-menu-open={menu}>
  <a
    href="/"
    class="cw-menu-item"
    on:click|preventDefault={onDownloadTranscript}>Transcript</a
  >
  <a href="/" class="cw-menu-item" on:click|preventDefault={onToggleSound}
    >Turn off Sound</a
  >
  <a href="/" class="cw-menu-item" on:click|preventDefault={onEndChat}
    >End Chat</a
  >
</div>

<div class="cw-controls">
  <textarea placeholder="Ask your question..." class="cw-input" />
  <button class="cw-send">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill="#000000"
      ><path d="M0 0h24v24H0z" fill="none" /><path
        d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
      /></svg
    >
  </button>

  <button class="cw-control" on:click={() => (menu = !menu)}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      ><path
        d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"
      /></svg
    >
  </button>
</div>

<style lang="postcss">
  .cw-menu {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 20000;
    right: 0;
    min-width: 120px;
    min-height: 80px;
    bottom: -600px;
    background-color: white;
    box-shadow: 0px 2px 3px -3px rgba(0, 0, 0, 0.1);
    transition: all 250ms ease-in-out;
  }

  .cw-menu-item {
    color: var(--primary-color);
    font-size: 0.813rem;
    font-weight: bold;
    height: 35px;
    display: flex;
    align-items: center;
    padding-left: 15px;
    padding-right: 15px;
    cursor: pointer;
    transition: all 250ms ease-in-out;
  }

  .cw-menu-item:hover {
    color: white;
    background-color: var(--primary-color);
  }

  .cw-menu-open {
    bottom: 65px;
  }

  .cw-controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    min-height: 60px;
    z-index: 20001;
  }

  .cw-input {
    flex-grow: 1;
    height: 100%;
    min-height: 60px;
    max-height: 60px;
    resize: none;
    padding: 10px;
    font-size: 0.8rem;
    border: solid 1px transparent;
    transition: all 250ms ease-in-out;
  }

  .cw-input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .cw-send {
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
    transition: all 250ms ease-in-out;
  }

  .cw-control {
    padding-left: 5px;
    padding-right: 5px;
    height: 100%;
  }

  svg {
    fill: var(--primary-color);
  }
</style>
