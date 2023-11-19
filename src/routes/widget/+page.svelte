<script>
  // @ts-nocheck
  import { onDestroy, onMount } from "svelte";

  export let data;

  const loadScript = () => {
    const url = "/widget/" + data.widget.organization + "?w=" + data.widget.id;
    const color = data.widget.color;

    window.AUDREY_WIDGET_SETTINGS = {
      color,
      url,
    };
    const script = document.createElement("script");
    script.id = "cw-script";
    script.setAttribute("data-color", color);
    script.setAttribute("data-url", url);
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
