function AudreyWidget() {
  let button, widget, styles, styleEl;

  const settings = window.AUDREY_WIDGET_SETTINGS || { url: "", color: "blue" };

  const onMaximized = () => {
    button.classList.add("cw-bubble-hidden");
    widget.classList.add("cw-frame-open");
  };

  const onMinimized = () => {
    button.classList.remove("cw-bubble-hidden");
    widget.classList.remove("cw-frame-open");
  };

  const createStyleSheet = () => {
    styles = `
      :root {
          --cw-primary-color: ${settings.color};
      }
      .cw-bubble {
          width: 60px;
          height: 60px;
          background-color: var(--cw-primary-color);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          bottom: 30px;
          right: 30px;
          cursor: pointer;
          transition: all 350ms ease-in-out;
          opacity: 1;
          box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
          z-index:10000;
          border: none;
      }

      .cw-bubble-hidden {
          opacity: 0;
      }

      .cw-bubble > svg {
        width: 60%;
      }

      .cw-frame {
          position: fixed;
          right: 30px;
          background-color: transparent;
          height: 0px;
          width: 350px;
          transition: all 250ms ease-in-out;
          bottom: 30px;
          overflow: hidden;
          z-index:10000;
          border: none;
          overflow: hidden;
          box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
      }

      .cw-frame-open {
          bottom: 30px;
          height: 600px;
      }
    `;
    styleEl = document.createElement("style");
    styleEl.innerText = styles;
    document.head.appendChild(styleEl);
  };

  const createChatWidget = () => {
    widget = document.createElement("iframe");
    widget.src = settings.url;
    widget.frameBorder = "none";
    widget.allowtransparency = "true";
    widget.style.border = "none !important";
    widget.classList.add("cw-frame");
    document.body.appendChild(widget);
  };

  const createChatButton = () => {
    button = document.createElement("button");
    button.classList.add("cw-bubble");
    button.innerHTML = `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            />
          </svg>
        `;
    document.body.appendChild(button);
  };

  const onPostMessage = (event) => {
    console.log(event.data);
    if (event.data === "cw-minimize") onMinimized();
  };

  const createEventHandlers = () => {
    button.addEventListener("click", onMaximized);

    window.addEventListener("message", onPostMessage);
  };

  const create = () => {
    createStyleSheet();
    createChatButton();
    createChatWidget();
    createEventHandlers();
  };

  const destroy = () => {
    window.removeEventListener("message", onPostMessage);

    if (button) {
      button.removeEventListener("click", onMaximized);
      button.remove();
    }

    if (widget) widget.remove();
    if (styleEl) styleEl.remove();
  };

  return {
    create,
    destroy,
  };
}

window.AudreyWidget = AudreyWidget();

AudreyWidget.create();
