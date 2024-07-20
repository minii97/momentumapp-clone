const mainContents = document.querySelector('.main-contents')
const overlay = document.querySelector('.overlay')
let randomNum

function crateRandomNum(length) {
  randomNum = Math.floor(Math.random() * length) + 1

  return randomNum
}
