<script>
  // @ts-nocheck
  import Portal from "svelte-portal";
  import Header from "./Header.svelte";
  import MessageList from "./MessageList.svelte";
  import MessageControls from "./MessageControls.svelte";
  import Message from "./Message.svelte";
  import WelcomeForm from "./WelcomeForm.svelte";

  export let widget = {};

  $: variables = `--primary-color: ${widget.color};`;
</script>

<Portal target="body">
  <div class="cw" style={variables}>
    <Header {widget} />
    <MessageList>
      <Message>
        <WelcomeForm {widget} />
      </Message>
    </MessageList>
    <MessageControls {widget} />
  </div>
</Portal>

<style lang="postcss">
  /* your styles go here */
  .cw {
    background-color: #fbfcfe;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    overflow: hidden;
    position: fixed;
    transition: all 250ms ease-in-out;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
</style>
