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

const todoContainer = mainContents.querySelector('.main-contents-todo')
const todoForm = mainContents.querySelector('.main-contents-form')
const todoFormInput = todoForm.querySelector('input')
const todoCheckBox = todoContainer.querySelector('.todo-checkbox')
const todoMoreBtn = todoContainer.querySelector('.more-btn')
const todoLabel = todoContainer.querySelector('.todo-contents label')
