<script>
  const onMinimize = () => {
    window.parent.postMessage("cw-minimize");
  };
</script>

<div>
  <button on:click={onMinimize}>minimize</button>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    background-color: aqua;
  }
</style>
