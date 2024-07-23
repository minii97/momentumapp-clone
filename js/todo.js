const todoFormText = todoForm.querySelector('p')
const todoLabelSpan = todoLabel.querySelector('span')
const todoCheckMessage = todoContainer.querySelector('.todo-message')

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
    todoLabelSpan.innerHTML = localStorage.getItem('todo')
    // label 요소의 텍스트 컨텐츠를 저장한 입력값을 가져와서 넣는다.

    todoForm.classList.add('hide')
    todoContainer.classList.remove('hide')
    todoMoreBtn.classList.add('clickable')
    todoLabel.classList.add('clickable')
    // todoForm은 숨기고, todoContainer를 보이게함, todoMoreBtn이 클릭 가능하게함.
  }
}

todoForm.addEventListener('submit', (e) => {
  submitTodoForm(e)
})

if (localStorage.getItem('todo') !== null) {
  todoLabelSpan.innerHTML = localStorage.getItem('todo')
  todoForm.classList.add('hide')
  todoContainer.classList.remove('hide')
  todoMoreBtn.classList.add('clickable')
  todoLabel.classList.add('clickable')
}
if (localStorage.getItem('checked') == 'true') {
  todoCheckBox.checked = true
}

function checkACheckBox() {
  i = 0

  localStorage.setItem('checked', todoCheckBox.checked)

  if (todoCheckBox.checked) {
    // checkbox를 클릭했을때 checkbox가 check가 check되있지 않다면 준비한 메시지 출력
    todoCheckMessage.classList.add('reveal-message')
  } else {
    todoCheckMessage.classList.remove('reveal-message')
  }
}

todoCheckBox.addEventListener('click', checkACheckBox)
