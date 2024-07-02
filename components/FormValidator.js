class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  _showInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = this._formEl.querySelector(this._errorElementId);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = "";
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  _checkInputValidity = (inputElement) => {
    this._errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState = (inputList) => {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmit();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute("disabled");
    }
  };

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this.disableSubmit();

    this._toggleButtonState(this._buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  checkValidity() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);
      this._toggleButtonState(this._inputList);
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  disableSubmit() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  resetForm() {
    this._formEl.reset();
  }

  resetValidation() {
    this.resetForm();
    this.disableSubmit();
  }
}

export default FormValidator;
