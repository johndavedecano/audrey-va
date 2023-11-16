<script>
  // @ts-nocheck

  import { goto } from "$app/navigation";

  export let user = {};
</script>

{#if user && user.firstName}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="border p-2 inline text-sm" on:click={() => goto("/account")}>
    Welcome, {user.firstName}
  </div>
{/if}
