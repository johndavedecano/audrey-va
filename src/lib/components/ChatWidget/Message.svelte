<div class="cw-message-wrapper">
  <div class="cw-message">
    <slot />
  </div>
</div>

<style>
  .cw-message-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .cw-message {
    background-color: white;
    border-radius: 15px;
    padding: 15px;
  }
</style>
