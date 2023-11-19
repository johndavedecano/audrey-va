<script>
  // @ts-nocheck
  export let widget = {};
</script>

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
</div>

<style lang="postcss">
  .cw-controls {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: white;
    min-height: 60px;
  }

  .cw-input {
    flex-grow: 1;
    height: 100%;
    max-height: 60px;
    resize: none;
    padding: 15px;
    font-size: 0.8rem;
  }

  .cw-input:focus {
    outline: none;
  }

  .cw-send {
    padding-left: 15px;
    padding-right: 15px;
  }

  .cw-send > svg {
    fill: var(--primary-color);
  }

  .cw-open {
    bottom: 30px;
    height: 600px;
  }
</style>
