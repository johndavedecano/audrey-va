<script>
  // @ts-nocheck
  import { PUBLIC_APP_URL } from "$env/static/public";
  import { IconCopy } from "@tabler/icons-svelte";

  let widget = {};

  let modal;

  let site_url = PUBLIC_APP_URL;

  let textarea;

  $: code = [
    "<script>",
    `
    const url = "${site_url}/widget/${widget.org}?w=${widget.id}";
    const color = "${widget.color}";
    window.AUDREY_WIDGET_SETTINGS = {color, url };
    const script = document.createElement("script");
    script.id = "cw-script";
    script.setAttribute("data-color", color);
    script.setAttribute("data-url", url);
    script.src = "${site_url}/widget.js";
    script.async = true;
    document.head.appendChild(script);
  `,
    // prettier-ignore
    "<\/script>",
  ].join("");

  const onCopy = () => {
    textarea.select();
    try {
      // Execute the copy command
      document.execCommand("copy");
      alert("Embed code has been copied to the clipboard!");
    } catch (err) {
      console.error("Unable to copy text to the clipboard", err);
    }
  };

  export const close = () => modal.close();

  export const open = (item) => {
    widget = item;
    modal.showModal();
  };
</script>

<dialog bind:this={modal} class="modal">
  <div class="modal-box">
    <div class="text-lg font-bold mb-4">Embed Code</div>
    <textarea
      bind:this={textarea}
      name="dialogflow_private_key"
      class="textarea textarea-bordered w-full"
      bind:value={code}
      required
      rows="15"
      readonly
    />

    <div class="flex items-center gap-4 pt-4">
      <div class="flex-1"></div>
      <button class="btn" on:click={close}> Close </button>
      <button class="btn btn-primary" on:click={onCopy}>
        <IconCopy />
        Copy Code
      </button>
    </div>
  </div>
</dialog>
