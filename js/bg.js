const bgContainer = document.querySelector('.bg-container')

const bgImagesLength = 5

const randomBGNum = Math.floor(Math.random() * bgImagesLength) + 1
// 파일명이 1.jpg~5.jpg이기 때문에 랜덤 이미지 출력을 위해서 1~5의 정수 출력을 위해서 해당 식을 이용

bgContainer.style.backgroundImage = `url(./assets/img/${randomBGNum}.jpg)`
