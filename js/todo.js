const todoForm = mainContents.querySelector('.main-contents-form')
const todoContainer = mainContents.querySelector('.main-contents-todo')
const todoFormText = todoForm.querySelector('p')
const todoFormInput = todoForm.querySelector('input')
const todoLabel = todoContainer.querySelector('.todo-contents label span')
const todoCheckBox = todoContainer.querySelector('.todo-checkbox')
const todoCheckMessage = todoContainer.querySelector('.todo-message')
const todoMoreContainer = todoContainer.querySelector('.todo-more')
const todoMoreBtn = todoMoreContainer.querySelector('.todo-more-btn')
const todoMoreList = todoMoreContainer.querySelector('.todo-more-list-wrap')
const todoMoreItem = todoMoreContainer.querySelectorAll(
  '.todo-more-item button'
)

let i = 0

const mql = window.matchMedia('(max-width: 768px)')
// .overlay 요소의 is-active toggle을 위해 반응형 구현을 위한 matchMedia API 사용

function submitTodoForm(e) {
  // submit 이벤트 발생시
  e.preventDefault()
  // 이벤트 기본행동을 방지
  const todoFormInputValue = todoFormInput.value.trim()
  // 입력한 값의 앞 뒤 공백값을 없애기 위해 trim() 사용

  if (todoFormInputValue == '') {
    // 입력한 값이 공백값 (스페이스바)라면
    todoFormText.classList.remove('hide')
    // 준비한 문구 출력 위해 "hide" 클래스 없애줌
  } else {
    if (!todoFormText.classList.contains('hide')) {
      // 만일 이전에 공백값을 입력해 내가 todoFormText가 "hide"클래스가 없는 상태라면
      todoFormText.classList.add('hide')
      // 숨기기 위해 "hide" 클래스 추가해줌
    }
    localStorage.setItem('todo', todoFormInputValue)
    // "todo" key에 입력값을 value에 저장
    todoLabel.innerHTML = localStorage.getItem('todo')
    // label 요소의 텍스트 컨텐츠를 저장한 입력값을 가져와서 넣는다.

    todoForm.classList.add('hide')
    todoContainer.classList.remove('hide')
    todoMoreBtn.classList.add('clickable')
    // todoForm은 숨기고, todoContainer를 보이게함, todoMoreBtn이 클릭 가능하게함.
  }
}

todoForm.addEventListener('submit', (e) => {
  submitTodoForm(e)
})

if (localStorage.getItem('todo') !== null) {
  todoLabel.innerHTML = localStorage.getItem('todo')
  todoForm.classList.add('hide')
  todoContainer.classList.remove('hide')
  todoMoreBtn.classList.add('clickable')
}
if (localStorage.getItem('checked') == 'true') {
  todoCheckBox.checked = true
}

function hideToDoMoreList() {
  todoMoreBtn.style.visibility = 'hidden'
  todoMoreBtn.classList.remove('is-active')
  todoMoreList.style.display = 'none'

  if (mql.matches) {
    overlay.classList.add('hide')
  }
}

function checkACheckBox() {
  i = 0
  hideToDoMoreList()

  localStorage.setItem('checked', todoCheckBox.checked)

  if (todoCheckBox.checked) {
    // checkbox를 클릭했을때 checkbox가 check가 check되있지 않다면 준비한 메시지 출력
    todoCheckMessage.classList.add('reveal-message')
  } else {
    todoCheckMessage.classList.remove('reveal-message')
  }
}

todoCheckBox.addEventListener('click', checkACheckBox)

function revealTodoMoreList(e) {
  if (!todoContainer.classList.contains('hide')) {
    i++

    if (i % 2 == 1) {
      e.currentTarget.style.visibility = 'visible'
      e.currentTarget.classList.add('is-active')
      todoMoreList.style.display = 'block'
      if (mql.matches) {
        overlay.classList.remove('hide')
      }
    } else {
      hideToDoMoreList()
    }
  }
  // todoMoreBtn을 홀수번 누르면 나타나게 짝수번 누르면 사라지게
}

todoMoreBtn.addEventListener('click', (e) => {
  revealTodoMoreList(e)
})

todoMoreItem.forEach((item) => {
  item.addEventListener('click', (e) => {
    featuresForTodoMoreItems(e)
  })
})

function featuresForTodoMoreItems(e) {
  if (
    e.currentTarget.classList.contains('clear-btn') ||
    e.currentTarget.classList.contains('edit-btn')
  ) {
    i = 0
    if (e.currentTarget.classList.contains('edit-btn')) {
      todoFormInput.value = localStorage.getItem('todo')
    }
    if (e.currentTarget.classList.contains('clear-btn')) {
      todoFormInput.value = ''
    }

    hideToDoMoreList()
    todoForm.classList.remove('hide')
    todoMoreBtn.classList.remove('clickable')
    todoContainer.classList.add('hide')
    todoCheckBox.checked = false
    localStorage.removeItem('checked')
    localStorage.removeItem('todo')
    // todomoreitem(=todo more list의 버튼들)을 눌렀을때 clear-btn/edit-btn이면 todoform이 나오게하여 수정이 가능케함.
  } else if (e.currentTarget.classList.contains('close-btn')) {
    i = 0
    hideToDoMoreList()
  }
  // close-btn은 todoform이 나오게하여 수정이 가능케함.
}
