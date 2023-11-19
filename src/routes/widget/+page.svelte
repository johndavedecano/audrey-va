<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";

  export let data;

  const loadScript = () => {
    window.AUDREY_WIDGET_SETTINGS = {
      color: data.widget.color,
      url: "/widget/" + data.widget.organization + "?w=" + data.widget.id,
    };
    const script = document.createElement("script");
    script.src = "/widget.js";
    script.async = true;
    document.head.appendChild(script);
  };

  onMount(() => {
    loadScript();
  });

  onDestroy(() => {
    window.AudreyWidget.destroy();
  });
</script>
