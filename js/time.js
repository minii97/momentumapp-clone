const timeElement = mainContents.querySelector('.main-contents-time')
const phraseElement = mainContents.querySelectorAll('.greeting-phrase')

let hours

function paintGreeting() {
  function paintTime() {
    let currentDate = new Date()

    const years = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    const date = currentDate.getDate()
    hours = currentDate.getHours()
    const formattedHours = String(hours).padStart(2, '0')
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')

    const elementContent = `<time class="main-contents-time" datetime="${years}-${month}-${date} ${formattedHours}:${minutes}">${formattedHours}:${minutes}</time>`

    timeElement.innerHTML = elementContent
  }

  function paintGreetingPhrase() {
    const phraseObj = {
      morning: 'Good Morning',
      afternoon: 'Good Afternoon',
      evening: 'Good Evening',
    }

    phraseElement.forEach((item) => {
      if (hours >= 19 || hours < 6) {
        item.innerHTML = phraseObj.evening
      } else if (6 <= hours && hours <= 11) {
        item.innerHTML = phraseObj.morning
      } else if (12 <= hours && hours <= 18) {
        item.innerHTML = phraseObj.afternoon
      }
    })
  }

  paintTime()

  paintGreetingPhrase()

  setInterval(paintTime, 1000)
}

paintGreeting()
