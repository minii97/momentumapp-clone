addTodoBtn.addEventListener('click', activeTodoInput)

todoInput.addEventListener('keydown', addTodo)

function addTodo(e) {
  if (e.keyCode == 13) {
    if (!todoInput.value.trim() == '') {
      const newTodo = todoInput.value

      const newTodoObj = { text: newTodo, id: Date.now(), checked: false }
      todos.push(newTodoObj)

      paintToDos(newTodoObj)

      saveTodo()

      if (emptyTodo.classList.contains('is-active')) {
        emptyTodo.classList.remove('is-active')
        existTodo.classList.add('is-active')
      }

      changeEmptyTodoText()
    }
  }
}

function paintToDos(data) {
  const li = document.createElement('li')
  li.classList.add('todo-item')
  li.id = data.id

  const input = document.createElement('input')
  input.setAttribute('type', 'checkbox')
  input.classList.add('todo-item-checkbox')

  li.innerHTML = `
  <div class="todo-item-contents">
    <p class="todo-item-text">${data.text}</p>
    </div>
    
    <div class="todo-more todo-item-more">
      <button type="button" class="todo-item-more-btn more-btn">
        <i class="bi bi-three-dots"></i>
      </button>

      <ul class="todo-more-list">
        <li class="todo-more-item">
          <button type="button">Edit</button>
        </li>
        <li class="todo-more-item">
          <button type="button">Delete</button>
        </li>
        <li class="todo-more-item">
          <button type="button">Close</button>
        </li>
      </ul>
    </div>`

  if (data.checked == true) {
    input.setAttribute('checked', 'true')
  }

  const todoItemContents = li.querySelector('.todo-item-contents')

  todoItemContents.prepend(input)
  todoList.appendChild(li)

  const todoCheckBox = li.querySelector('.todo-item-checkbox')

  todoCheckBox.addEventListener('click', (e) => {
    if (!li.classList.contains('editing')) {
      const liText = li.querySelector('.todo-item-text').innerHTML
      const liID = parseInt(li.id)

      if (e.currentTarget.checked) {
        saveCheckboxState(liID, liText, true)
      } else {
        saveCheckboxState(liID, liText, false)
      }
    }
  })

  const todoItemMoreBtn = li.querySelector('.todo-item-more-btn')

  todoItemMoreBtn.addEventListener('click', toggleTodoItemMoreMenu)

  function toggleTodoItemMoreMenu(e) {
    const previousClickedTodoItemMoreMenu = todo.querySelector(
      '.todo-more-list.is-active'
    )
    const nowClickedTodoItemMoreMenu = e.currentTarget.nextElementSibling
    nowClickedTodoItemMoreMenu.classList.add('is-active')
    todoMain.classList.add('more-menu-active')

    if (previousClickedTodoItemMoreMenu) {
      previousClickedTodoItemMoreMenu.classList.remove('is-active')

      if (previousClickedTodoItemMoreMenu == nowClickedTodoItemMoreMenu) {
        todoMain.classList.remove('more-menu-active')
      }
    }

    window.addEventListener('click', hideToDoItemMoreMenu)

    function hideToDoItemMoreMenu(e) {
      if (
        !e.target.closest('.todo-more') ||
        e.target.closest('.todo-header-more')
      ) {
        nowClickedTodoItemMoreMenu.classList.remove('is-active')
        todoMain.classList.remove('more-menu-active')

        removeEventListener(window, hideToDoItemMoreMenu)
      }
    }
  }

  const todoItemMoreItem = li.querySelectorAll('.todo-more-item button')

  function actionForTodoItemMoreItem(item) {
    const todoItemMoreList = item.closest('.todo-more-list')
    const todoItem = item.closest('.todo-item')
    todoItemMoreList.classList.remove('is-active')
    todoMain.classList.remove('more-menu-active')

    if (item.innerHTML == 'Edit') {
      function editTodoItem() {
        if (textArea.value.trim() != '') {
          const editedItemText = document.createElement('p')

          editedItemText.innerHTML = textArea.value.trim()
          editedItemText.classList.add('todo-item-text')

          todoItemContents.appendChild(editedItemText)

          const text = editedItemText.innerHTML
          const id = parseInt(todoItemContents.closest('.todo-item').id)
          const check = todoItemContents.querySelector(
            '.todo-item-checkbox'
          ).checked

          saveCheckboxState(id, text, check)

          textArea.remove()

          todoItem.classList.remove('editing')
        }
      }

      todoItem.classList.add('editing')

      const itemText = item
        .closest('.todo-item-more')
        .previousElementSibling.querySelector('.todo-item-text')

      const textArea = document.createElement('textarea')
      textArea.value = itemText.innerHTML
      textArea.classList.add('todo-item-input')
      textArea.setAttribute('rows', '1')

      todoItemContents.appendChild(textArea)
      itemText.remove()

      resizeTextArea(textArea)
      textArea.focus()

      textArea.addEventListener('input', (e) => {
        const target = e.target

        resizeTextArea(target)
      })

      textArea.addEventListener('keydown', (e) => {
        if (e.keyCode == 13) {
          e.preventDefault()
          editTodoItem()
        }
      })
    } else if (item.innerHTML == 'Delete') {
      todos = todos.filter((element) => element.id !== parseInt(todoItem.id))
      todoItem.remove()

      saveTodo()

      if (todoList.innerHTML == '') {
        activeEmptyTodoWhenDeletedAllItem()
      }
    }
  }

  todoItemMoreItem.forEach((item) => {
    item.addEventListener('click', () => {
      actionForTodoItemMoreItem(item)
    })
  })
}

const savedToDos = JSON.parse(localStorage.getItem('todos'))

if (savedToDos !== null) {
  todos = savedToDos
  todos.forEach(paintToDos)

  existTodo.classList.add('is-active')
  todoInput.classList.add('is-active')
} else {
  emptyTodo.classList.add('is-active')
}

function resizeTextArea(element) {
  element.style.height = 'auto'
  element.style.height = element.scrollHeight + 'px'
}
