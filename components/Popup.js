export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this.popupCloseBtn = this._popupElement.querySelector(".popup__close");
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape" || evt.keyCode === 27) {
      this.close();
      console.log("Esc pressed");
      console.log(evt);
    }
  };

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this.popupCloseBtn.addEventListener("click", () => {
      this.close();
    });

    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup" || "popup__close")) {
        this.close();
      }
    });
  }
}
