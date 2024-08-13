todoHeaderMoreButton.addEventListener('click', actionForTodoHeaderMoreButton)

function actionForTodoHeaderMoreButton() {
  togglingTodoMoreMenu('toggle')

  window.addEventListener('click', hideTodoHeaderMoreMenu)

  function hideTodoHeaderMoreMenu(e) {
    if (
      !e.target.closest('.todo-more') ||
      e.target.closest('.todo-item-more')
    ) {
      todoHeaderMoreMenu.classList.remove('is-active')
      todoContainer.classList.remove('more-menu-active')

      removeEventListener(window, hideTodoHeaderMoreMenu)
    }
  }
}

const todoHeaderMoreMenuItemButtons =
  todoHeaderMoreMenu.querySelectorAll('button')

todoHeaderMoreMenuItemButtons.forEach((item) => {
  function actionForTodoHeaderMoreItem() {
    function deleteAllTodo() {
      todoList.innerHTML = ''
      todos = []
      activeEmptyTodoWhenDeletedAllItem()
    }

    function toggleCheckedStateAllTodo(condition) {
      const todoCheckBoxes = todoList.querySelectorAll('.todo-item-checkbox')
      todoCheckBoxes.forEach((item) => {
        if (condition == 'check') {
          item.checked = true

          todos.forEach((item) => {
            item.checked = true
          })
        } else if (condition == 'clear') {
          item.checked = false

          todos.forEach((item) => {
            item.checked = false
          })
        }
      })

      saveTodo()
    }

    todoHeaderMoreMenu.classList.remove('is-active')
    todoContainer.classList.remove('more-menu-active')

    if (existTodo.classList.contains('is-active')) {
      if (item.classList.contains('delete-all-btn')) {
        deleteAllTodo()
      } else if (item.classList.contains('check-all-btn')) {
        toggleCheckedStateAllTodo('check')
      } else if (item.classList.contains('clear-all-btn')) {
        toggleCheckedStateAllTodo('clear')
      }
    } else {
      if (!item.classList.contains('close-btn')) {
        activeTodoInput()
        emptyTodoDefaultText.classList.remove('is-active')
        emptyTodoClickedMoreMenuText.classList.add('is-active')
      }
    }
  }

  item.addEventListener('click', actionForTodoHeaderMoreItem)
})
