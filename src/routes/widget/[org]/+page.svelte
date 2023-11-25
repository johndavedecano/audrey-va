<script>
  // @ts-nocheck
  import Widget from "$lib/components/ChatWidget/Widget.svelte";
  import widgetStore from "$lib/stores/widget.store.js";

  export let data = {};

  $: if (data.widget) widgetStore.setWidget(data.widget);
</script>

<Widget />
