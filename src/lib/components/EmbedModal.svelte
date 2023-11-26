<script>
  // @ts-nocheck
  import { PUBLIC_APP_URL } from "$env/static/public";

  let widget = {};

  let modal;

  let site_url = PUBLIC_APP_URL;

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

  const onCopy = (evt) => {
    evt.target.select();
    try {
      // Execute the copy command
      document.execCommand("copy");
      alert("Text has been copied to the clipboard!");
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
      name="dialogflow_private_key"
      class="textarea textarea-bordered w-full"
      bind:value={code}
      required
      rows="15"
      readonly
      on:click={onCopy}
    />
  </div>
</dialog>
