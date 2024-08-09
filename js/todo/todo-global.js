const todo = document.querySelector('.todo')
const todoContainer = todo.querySelector('.todo-container')
const todoHeaderMoreButton = todo.querySelector('.todo-more-btn')
const todoHeaderMoreMenu = todo.querySelector('.todo-more-list')
const todoMain = todo.querySelector('.todo-main-wrap')
const todoList = todo.querySelector('.todo-list')
const todoInput = todo.querySelector('.todo-main-input')
const addTodoBtn = todo.querySelector('.empty-todo-btn')
const emptyTodo = todo.querySelector('.empty-todo')
const emptyTodoDefaultText = emptyTodo.querySelectorAll('.empty-todo-text')[0]
const emptyTodoClickedMoreMenuText =
  emptyTodo.querySelectorAll('.empty-todo-text')[1]
const existTodo = todo.querySelector('.exist-todo')

let todos = []

function activeTodoInput() {
  todoInput.classList.add('is-active')
  todoInput.focus()
  addTodoBtn.classList.add('hide')
}

function togglingTodoMoreMenu(condition) {
  if (condition == 'toggle') {
    todoHeaderMoreMenu.classList.toggle('is-active')
    todoContainer.classList.toggle('more-menu-active')
  } else if (condition == 'remove') {
    todoHeaderMoreMenu.classList.remove('is-active')
    todoContainer.classList.remove('more-menu-active')
  }
}

const saveTodo = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function changeEmptyTodoText() {
  addTodoBtn.classList.remove('hide')
  emptyTodoDefaultText.classList.add('is-active')
  emptyTodoClickedMoreMenuText.classList.remove('is-active')

  todoInput.value = ''
}

function activeEmptyTodoWhenDeletedAllItem() {
  localStorage.removeItem('todos')
  existTodo.classList.remove('is-active')
  emptyTodo.classList.add('is-active')
  todoInput.classList.remove('is-active')
}

function saveCheckboxState(num, value, state) {
  todos = todos.filter((element) => element.id !== num)

  const newTodoObj = { text: value, id: num, checked: state }
  todos.push(newTodoObj)

  todos = todos.sort((a, b) => {
    return a.id - b.id
  })

  saveTodo()
}
