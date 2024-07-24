const todayGoalsFormText = todayGoalsForm.querySelector('p')
const todayGoalsLabelSpan = todayGoalsLabel.querySelector('span')
const todayGoalsCheckMessage =
  todayGoalsContainer.querySelector('.goals-message')

function submitTodayGoalsForm(e) {
  // submit 이벤트 발생시
  e.preventDefault()
  // 이벤트 기본행동을 방지
  const todayGoalsFormInputValue = todayGoalsFormInput.value.trim()
  // 입력한 값의 앞 뒤 공백값을 없애기 위해 trim() 사용

  if (todayGoalsFormInputValue == '') {
    // 입력한 값이 공백값 (스페이스바)라면
    todayGoalsFormText.classList.remove('hide')
    // 준비한 문구 출력 위해 "hide" 클래스 없애줌
  } else {
    if (!todayGoalsFormText.classList.contains('hide')) {
      // 만일 이전에 공백값을 입력해 내가 todayGoalsFormText가 "hide"클래스가 없는 상태라면
      todayGoalsFormText.classList.add('hide')
      // 숨기기 위해 "hide" 클래스 추가해줌
    }
    localStorage.setItem('todayGoals', todayGoalsFormInputValue)
    // "todo" key에 입력값을 value에 저장
    todayGoalsLabelSpan.innerHTML = localStorage.getItem('todayGoals')
    // label 요소의 텍스트 컨텐츠를 저장한 입력값을 가져와서 넣는다.

    todayGoalsForm.classList.add('hide')
    todayGoalsContainer.classList.remove('hide')
    todayGoalsMoreBtn.classList.add('clickable')
    todayGoalsLabel.classList.add('clickable')
    // todoForm은 숨기고, todoContainer를 보이게함, todoMoreBtn이 클릭 가능하게함.
  }
}

todayGoalsForm.addEventListener('submit', (e) => {
  submitTodayGoalsForm(e)
})

if (localStorage.getItem('todayGoals') !== null) {
  todayGoalsLabelSpan.innerHTML = localStorage.getItem('todayGoals')
  todayGoalsForm.classList.add('hide')
  todayGoalsContainer.classList.remove('hide')
  todayGoalsMoreBtn.classList.add('clickable')
  todayGoalsLabel.classList.add('clickable')
}
if (localStorage.getItem('checked') == 'true') {
  todayGoalsCheckBox.checked = true
}

function checkACheckBox() {
  i = 0

  localStorage.setItem('checked', todayGoalsCheckBox.checked)

  if (todayGoalsCheckBox.checked) {
    // checkbox를 클릭했을때 checkbox가 check가 check되있지 않다면 준비한 메시지 출력
    todayGoalsCheckMessage.classList.add('reveal-message')
  } else {
    todayGoalsCheckMessage.classList.remove('reveal-message')
  }
}

todayGoalsCheckBox.addEventListener('click', checkACheckBox)
