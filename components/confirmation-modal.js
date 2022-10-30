class ConfirmationModal extends HTMLElement {
  get visible() {
    return this.hasAttribute("visible");
  }

  set visible(value) {
    if (value) {
      this.setAttribute("visible", "");
    } else {
      this.removeAttribute("visible");
    }
  }

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["visible"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "visible" && this.shadowRoot) {
      if (newValue === null) {
        this.shadowRoot.querySelector(".wrapper").classList.remove("visible");
        this.dispatchEvent(new CustomEvent("close"));
      } else {
        this.shadowRoot.querySelector(".wrapper").classList.add("visible");
        this.dispatchEvent(new CustomEvent("open"))
      }
    }
  }

  connectedCallback() {
    const title = this.attributes.title.value;
    const container = document.createElement("div");
    container.innerHTML = `
      <style>
            .wrapper {
              position: fixed;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              background-color: gray;
              opacity: 0;
              visibility: hidden;
              z-index: 1;
            }
            .visible {
              opacity: 1;
              visibility: visible;
            }
            .modal {
              font-family: Helvetica;
              font-size: 14px;
              padding: 10px 10px 5px 10px;
              background-color: #fff;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              border-radius: 2px;
              min-width: 600px;
              min-height: 200px;

              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              gap: 40px;
            }
            .title {
              font-size: 18px;
            }
            .button-container {
              text-align: right;
              display: flex;
              gap: 30px;
            }
            button {
              min-width: 80px;
              border: 1px solid gray;
              padding: 3px;
              background-color: white;
              cursor: pointer;
            }
            button:hover {
              background-color: gray;
              color: white;
            }
          </style>
          <div class='wrapper'>
            <div class='modal'>
              <span class='title'>${title}</span>
              <div class='button-container'>
                <button class='yes'>Yes</button>
                <button class='cancel'>Cancel</button>
              </div>
            </div>
          </div>
    `;

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(container);
    this.addEventHandlers();
  }

  addEventHandlers() {
    const cancelButton = this.shadowRoot.querySelector(".cancel");
    cancelButton.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent("cancel"))
      this.removeAttribute("visible");
    });
    const yesButton = this.shadowRoot.querySelector(".yes");
    yesButton.addEventListener('click', e => {
      this.dispatchEvent(new CustomEvent("yes"))
      this.removeAttribute("visible");
    });
  }
}

window.customElements.define('confirmation-modal', ConfirmationModal);