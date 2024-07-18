const timeElement = mainContents.querySelector('.main-contents-time')
// timeElement를 <time>태그를 감싼 div로 한 이유는 innerHTML method 사용을 위해서임.

function paintTime() {
  let currentDate = new Date()

  const years = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1
  const date = currentDate.getDate()
  hours = currentDate.getHours()
  const formattedHours = String(hours).padStart(2, '0')
  const minutes = String(currentDate.getMinutes()).padStart(2, '0')
  const seconds = currentDate.getSeconds()

  const elementContent = `<time class="main-contents-time" datetime="${years}-${month}-${date} ${formattedHours}:${minutes}">${formattedHours}:${minutes}</time>`

  timeElement.innerHTML = elementContent
}

paintTime()

if (hours >= 19 || hours < 6) {
  document.querySelector('.main-contents-greeting span:first-child').innerHTML =
    'Good Evening'
} else if (6 <= hours && hours <= 11) {
  document.querySelector('.main-contents-greeting span:first-child').innerHTML =
    'Good Morning'
} else if (12 <= hours && hours <= 18) {
  document.querySelector('.main-contents-greeting span:first-child').innerHTML =
    'Good Afternoon'
}

setInterval(paintTime, 1000)

// 아침, 오후, 저녁
// 아침 : am06~11:59 (06~12)
// 오후 pm12~06 (12~18)
// 밤 07~ 새벽 05 (19~05)
