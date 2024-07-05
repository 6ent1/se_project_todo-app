export default class Todo {
  constructor(data, selector, handleUpdateTodo, handleDeleteTodo) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleUpdateTodo = handleUpdateTodo;
    this._handleDeleteTodo = handleDeleteTodo;
  }

  _generateDateEl() {
    this._todoDate = this._todoElement.querySelector(".todo__date");
    this._dueDate = new Date(this._data.date);
    if (!isNaN(this._dueDate)) {
      this._todoDate.textContent = `Due: ${this._dueDate.toLocaleString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )}`;
    }
  }

  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      if (this._todoCheckboxEl.checked) {
        this._handleUpdateTodo(true);
      } else {
        this._handleUpdateTodo(false);
      }
      this._data.completed = !this._data.completed;
    });

    this._todoDeleteBtn.addEventListener("click", () => {
      if (!this._todoCheckboxEl.checked) {
        this._handleUpdateTodo(true);
      }
      this._handleDeleteTodo(true);
      this._todoElement.remove();
    });
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoNameEl.textContent = this._data.name;

    this._generateCheckboxEl();
    this._generateDateEl();
    this._setEventListeners();

    return this._todoElement;
  }
}
