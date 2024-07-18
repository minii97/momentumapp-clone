const timeElement = mainContents.querySelector('.main-contents-time')
// timeElement를 <time>태그를 감싼 div로 한 이유는 innerHTML method 사용을 위해서임.
const phraseElement = mainContents.querySelector('.greeting-phrase')

function paintGreeting() {
  function paintTime() {
    let currentDate = new Date()
    // Date 객체 생성자 => 년/월/일/시/분/초 정보를 받아오기 위함.

    const years = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    // 월이 0부터 시작함 => +1로 해주어 우리가 사용하는 월의 개념으로 치환
    const date = currentDate.getDate()
    hours = currentDate.getHours()
    const formattedHours = String(hours).padStart(2, '0')
    // "시"를 00,01 식으로 두자리 표기하기 위하여 string으로 처리해주고 padStart 메소드를 이용하여 2자리인지 확인하고 그 미만이면 앞을 0으로 채워준다. (밑줄의 "분"도 동일.)
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')

    const elementContent = `<time class="main-contents-time" datetime="${years}-${month}-${date} ${formattedHours}:${minutes}">${formattedHours}:${minutes}</time>`

    timeElement.innerHTML = elementContent
  }

  function paintGreetingPhrase() {
    if (hours >= 19 || hours < 6) {
      phraseElement.innerHTML = 'Good Evening'
      // 만일 hours가 19 이상 혹은 6미만이면 span에 good evening
    } else if (6 <= hours && hours <= 11) {
      phraseElement.innerHTML = 'Good Morning'
      // 만일 hours가 6 이상 혹은 11이하면 span에 good morning
    } else if (12 <= hours && hours <= 18) {
      phraseElement.innerHTML = 'Good Afternoon'
      // 만일 hours가 12 이상 혹은 18이하면 span에 good afternoon
    }
  }

  paintTime()
  // 페이지 로드시 바로 시간 데이터를 받아와서 span에 입력
  paintGreetingPhrase()
  // 시간 데이터에 따라 인사문구 다르게 출력
  setInterval(paintTime, 1000)
  // 1초에 한번씩 시간데이터를 받아와서 실시간 시계 역할을 할 수 있게 setInterval 함수 이용.
  // setInterval(콜백함수,실행주기(ms))
}

paintGreeting()
