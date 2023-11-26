<script>
  // @ts-nocheck

  import timezones from "$lib/timezones";

  export let value;
</script>

<select bind:value class="select select-bordered w-full">
  <option disabled>Select Timezone</option>
  {#each timezones as item}
    <option value={item}>{item}</option>
  {/each}
</select>
