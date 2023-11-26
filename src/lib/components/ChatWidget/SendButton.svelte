<script>
  // @ts-nocheck
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
</script>

<button class="cw-send" on:click={() => dispatch("click")}>
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

<style lang="postcss">
  .cw-send {
    padding-left: 15px;
    padding-right: 15px;
    height: 100%;
    transition: all 250ms ease-in-out;
  }

  svg {
    fill: var(--primary-color);
  }
</style>
