const mainContents = document.querySelector('.main-contents')
const mainContentsUsernameElement = mainContents.querySelectorAll('.username')
const overlay = document.querySelector('.overlay')
let randomNum

const mql = window.matchMedia('(max-width: 1199px)')
// .overlay 요소의 is-active toggle을 위해 반응형 구현을 위한 matchMedia API 사용

function crateRandomNum(length) {
  randomNum = Math.floor(Math.random() * length) + 1

  return randomNum
}

const todayGoalsContainer = mainContents.querySelector('.main-contents-goals')
const todayGoalsForm = mainContents.querySelector('.main-contents-form')
const todayGoalsFormInput = todayGoalsForm.querySelector('input')
const todayGoalsCheckBox = todayGoalsContainer.querySelector('.goals-checkbox')
const todayGoalsMoreBtn = todayGoalsContainer.querySelector('.more-btn')
const todayGoalsLabel = todayGoalsContainer.querySelector(
  '.goals-contents label'
)
