const todayGoalsAlert = todayGoalsForm.querySelector('p')
const todayGoalsLabelSpan = todayGoalsLabel.querySelector('span')
const todayGoalsCheckMessage =
  todayGoalsContainer.querySelector('.goals-message')

function toggleTodayGoalsContainer() {
  todayGoalsLabelSpan.innerHTML = todayGoals.text
  todayGoalsForm.classList.add('hide')
  todayGoalsContainer.classList.remove('hide')
  todayGoalsMoreBtn.classList.add('clickable')
  todayGoalsLabel.classList.add('clickable')

  if (todayGoals.checked == true) {
    todayGoalsCheckBox.checked = true
  }
}

function submitTodayGoalsForm(e) {
  e.preventDefault()
  const todayGoalsFormInputValue = todayGoalsFormInput.value.trim()

  if (todayGoalsFormInputValue == '') {
    todayGoalsAlert.classList.remove('hide')
  } else {
    if (!todayGoalsAlert.classList.contains('hide')) {
      todayGoalsAlert.classList.add('hide')
    }

    todayGoals = { text: todayGoalsFormInputValue, checked: false }
    localStorage.setItem('todayGoals', JSON.stringify(todayGoals))
    toggleTodayGoalsContainer()
  }
}

todayGoalsForm.addEventListener('submit', submitTodayGoalsForm)

if (localStorage.getItem('todayGoals') !== null) {
  todayGoals = JSON.parse(localStorage.getItem('todayGoals'))
  toggleTodayGoalsContainer()
}

function toggleTodayGoalsCheckedMessage() {
  if (todayGoalsCheckBox.checked) {
    todayGoalsCheckMessage.classList.add('reveal-message')
    todayGoals = { text: todayGoalsLabelSpan.innerHTML, checked: true }
  } else {
    todayGoalsCheckMessage.classList.remove('reveal-message')
    todayGoals = { text: todayGoalsLabelSpan.innerHTML, checked: false }
  }

  localStorage.setItem('todayGoals', JSON.stringify(todayGoals))
}

todayGoalsCheckBox.addEventListener('click', toggleTodayGoalsCheckedMessage)
