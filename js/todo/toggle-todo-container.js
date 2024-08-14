const todoBtn = todo.querySelector('.todo-btn')

todoBtn.addEventListener('click', togglingTodoContainer)

function togglingTodoContainer() {
  todo.classList.toggle('is-active')
  changeEmptyTodoText()

  if (todo.classList.contains('is-active')) {
    togglingTodoMoreMenu('remove')

    if (
      emptyTodo.classList.contains('is-active') &&
      todoInput.classList.contains('is-active')
    ) {
      todoInput.classList.remove('is-active')
    }
  }
}
