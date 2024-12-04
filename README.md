# 모멘텀 앱 클론 코딩

---

크롬 익스텐션 "Momentum" App 클론 코딩

## 📆 제작기간

2024.07.11 ~ 2024.07.24 (약 10일)

## ⚙️ 개발환경

- HTML 5
- SCSS
- Javascript

## 🧑🏻‍💻 프로젝트 목표

- Ajax를 이용한 서버에서의 데이터 송신 및 출력
- 실시간으로 시계 표현
- 로컬스토리지를 이용한 입력 데이터 저장
- openWeatherMap API를 이용하여 날씨 데이터 받아오기
- 로드할때마다 랜덤 배경이미지 및 인용구 표현

## 📌 주요 코드

### 1. 로그인

- 마크업

```html
<div class="login-wrap">
  <div class="login">
    <h1 class="login-title">Hello! What's your name?</h1>
    <form class="login-form" method="get" action="#">
      <input
        type="text"
        class="login-form-input"
        required
        maxlength="20"
        autocomplete="off"
      />
      <p class="login-form-text">
        <span
          >Please enter your first name or the name you prefer to be
          called.</span
        >
        <span class="hide">Please enter a real name, not a blank space</span>
      </p>
      <button type="submit" class="login-form-btn">
        Continue <i class="bi bi-arrow-right-short"></i>
      </button>
    </form>
  </div>
</div>
```

- 스크립트

```javascript
const logo = document.querySelector('.logo')

const loginContainer = document.querySelector('.login-wrap')
const loginForm = loginContainer.querySelector('.login-form')
const loginFormTextArr = loginForm.querySelectorAll('.login-form-text span')
const loginFormInput = loginForm.querySelector('input')

function login(e) {
  e.preventDefault()

  if (loginFormInput.value.trim() == '') {
    const FormTextDefault = loginFormTextArr[0]
    const FormTextAlert = loginFormTextArr[1]
    FormTextDefault.classList.add('hide')
    FormTextAlert.classList.remove('hide')
  } else {
    localStorage.setItem('username', loginFormInput.value.trim())

    loginContainer.classList.add('hide')
    logo.classList.add('hide')
    mainContents.classList.remove('hide')

    mainContentsUsernameElement.forEach((item) => {
      item.innerHTML = `${localStorage.getItem('username')}.`
    })
  }
}

loginForm.addEventListener('submit', login)

function toggleLoginAndMainContents(login) {
  if (login == 'login') {
    loginContainer.classList.add('hide')
    logo.classList.add('hide')
    mainContents.classList.remove('hide')

    mainContentsUsernameElement.forEach((item) => {
      item.innerHTML = `${localStorage.getItem('username')}.`
    })
  } else if (login == 'not login') {
    loginContainer.classList.remove('hide')
    logo.classList.remove('hide')
    mainContents.classList.add('hide')
  }
}

if (localStorage.getItem('username') !== null) {
  toggleLoginAndMainContents('login')
} else {
  toggleLoginAndMainContents('not login')
}

// 로그인하면 로컬스토리지에 값 저장
// 로컬스토리지에 username키에 저장값이 있으면 로그인 화면 숨김 / 저장값 없으면 로그인 화면 나오게
```

### 2. 랜덤 배경 인용구

- 난수 생성하는 function을 global.js에 생성하고 랜덤 배경화면/인용구를 표현하는데 사용할 수 있게함

  ```javascript
  function crateRandomNum(length) {
    randomNum = Math.floor(Math.random() * length) + 1
    return randomNum
  }
  ```

- 랜덤 배경

  - 마크업

  ```html
  <div class="bg-container"></div>
  ```

  - 스크립트

  ```javascript
  const bgContainer = document.querySelector('.bg-container')
  const bgImagesLength = 5

  crateRandomNum(bgImagesLength)
  // 파일명이 1.jpg~5.jpg이기 때문에 랜덤 이미지 출력을 위해서 1~5의 정수 출력을 위해서 해당 식을 이용
  bgContainer.style.backgroundImage = `url(./assets/img/${randomNum}.jpg)`
  ```

- 랜덤 인용구

  - 마크업

  ```html
  <div class="quote-container">
    <button type="button" class="quote-btn sm-only">Random Quote</button>

    <div class="quote-contents">
      <dl class="quote-list">
        <div class="quote-item">
          <dt class="visually-hidden">Quote</dt>
          <dd class="quote"></dd>
        </div>
        <div class="quote-item">
          <dt class="visually-hidden">Author</dt>
          <dd class="author"></dd>
        </div>
      </dl>
    </div>
  </div>
  ```

```javascript
const quoteBtn = document.querySelector('.quote-btn')
const quoteContents = document.querySelector('.quote-contents')

function activeQuoteContainer() {
  overlay.classList.remove('hide')
  quoteContents.classList.add('is-active')

  function hideQuoteContainer(e) {
    e.currentTarget.classList.add('hide')
    quoteContents.classList.remove('is-active')

    overlay.removeEventListener('click', hideQuoteContainer)
  }

  overlay.addEventListener('click', hideQuoteContainer)
}

quoteBtn.addEventListener('click', activeQuoteContainer)

fetch('./assets/data/quote.json')
  .then((res) => res.json())
  .then((data) => {
    const author = document.querySelector('.author')
    const quote = document.querySelector('.quote')

    crateRandomNum(data.length - 1)

    author.innerHTML = data[randomNum].author
    quote.innerHTML = `"${data[randomNum].quote}"`
  })
  .catch((error) => {
    quoteContents.innerHTML = '<p>Failed to load quote list from server.'
  })

// Ajax를 통한 서버에서의 데이터 수신을 구현하기 위하여 assets 폴더 내에 데이터를 저장하고 해당 폴더를 가상의 서버로 지정하여 해당 url에서 데이터를 받아옴
// 배경이미지는 파일명이 1로 시작해서 length 값을 파일 갯수 그대로 "5"라고 하였지만 인용구의 경우엔 array에서 data를 받아오는 것이라서 (첫번째 데이터의 index가 0으로 시작) length값을 받아온 data의 갯수 - 1로 지정
// 모바일에서는 버튼을 눌러야 DOM요소가 나오도록함.
```

### 3. 시계

- 마크업

```html
<div class="main-contents-time">
  <time datetime="2024-07-03 00:00">00:00</time>
</div>

<div class="main-contents-greeting lg-only">
  <h3 class="greeting-text">
    <span class="greeting-phrase"></span>,
    <span class="username"></span>
  </h3>
</div>
```

- 스크립트

```javascript
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
// 시/분은 두자릿수 이하일때는 앞에 "0"을 붙여 두자릿수 표현 (padStart(2,"0"))
// 사이트 로드시의 접속 시간대에 따라 인삿말을 다르게함
// 사이트 로드시 paintTime / paintGreetingPhrase 함수를 실행하고 실시간으로 시간데이터를 받아오기 위하여 paintTime함수를 setInterval을 이용해 1초에 한번씩 시간데이터를 받아옴.
```

### 4. 날씨

- 마크업

```html
<div class="weather-container">
  <dl class="weather-list hide">
    <div class="weather-item desc">
      <dt class="visually-hidden">Weather</dt>
      <dd>
        <i class="bi bi-sun"></i>
        <span class="visually-hidden"></span>
      </dd>
    </div>
    <div class="weather-item temp">
      <dt class="visually-hidden">Temp</dt>
      <dd></dd>
    </div>
    <div class="weather-item location">
      <dt class="visually-hidden"></dt>
      <dd></dd>
    </div>
  </dl>

  <span class="weather-loading">Loading...</span>
  <p class="weather-load-fail hide">
    <span><i class="bi bi-exclamation-circle"></i> Failed to load</span>
    <span><span class="weather-load-fail-span">location</span> info.</span>
  </p>
</div>
```

- 스크립트

```javascript
const weatherContainer = document.querySelector('.weather-list')
const weatherLoading = document.querySelector('.weather-loading')
const weatherLoadFail = document.querySelector('.weather-load-fail')
const weatherLoadFailSpan = weatherLoadFail.querySelector(
  '.weather-load-fail-span'
)

const tempElement = weatherContainer.querySelector('.temp dd')
const locationElement = weatherContainer.querySelector('.location dd')
const weatherDescElement = weatherContainer.querySelector('.desc dd')

const hideWeatherLoading = (item) => {
  setTimeout(() => {
    weatherLoading.classList.add('hide')
  }, 500)

  item.classList.remove('hide')
}

navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFail)

function getPositionSuccess(pos) {
  const lat = pos.coords.latitude
  const lon = pos.coords.longitude
  const API_KEY = 'e252c7e10fd1209b34198bab444d0a15'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

  fetch(url).then((response) =>
    response
      .json()
      .then((data) => {
        // 날씨 데이터를 성공적으로 Load 하였을때
        const temp = Math.round(data.main.temp)
        const locationCountry = data.sys.country
        const locationCity = data.name
        const weatherCondition = String(data.weather[0].id)

        const weatherConditionObj = {
          thunderstorm: weatherCondition.startsWith('2'),
          rain:
            weatherCondition.startsWith('3') ||
            weatherCondition.startsWith('5'),
          snow: weatherCondition.startsWith('6'),
          mist: weatherCondition.startsWith('7'),
          clear: weatherCondition == '800',
          clouds: weatherCondition.startsWith('8') && weatherCondition != '800',
        }

        tempElement.innerHTML = `${temp}&#8451;`
        locationElement.innerHTML = `${locationCity}, ${locationCountry}`

        if (weatherConditionObj.thunderstorm) {
          weatherDescElement.innerHTML = `<i class="bi bi-lightning"></i>`
        } else if (weatherConditionObj.rain) {
          weatherDescElement.innerHTML = `<i class="bi bi-umbrella"></i>`
        } else if (weatherConditionObj.snow) {
          weatherDescElement.innerHTML = `<i class="bi bi-snow"></i>`
        } else if (weatherConditionObj.mist) {
          weatherDescElement.innerHTML = `<i class="bi bi-cloud-fog2"></i>`
        } else if (weatherConditionObj.snow) {
          weatherDescElement.innerHTML = `<i class="bi bi-sun"></i>`
        } else if (weatherConditionObj.clouds) {
          weatherDescElement.innerHTML = `<i class="bi bi-clouds"></i>`
        }

        hideWeatherLoading(weatherContainer)
      })
      .catch(() => {
        // 날씨 데이터를 Load 하지 못했을 때
        weatherLoadFailSpan.innerHTML = 'weather'
        hideWeatherLoading(weatherLoadFail)
      })
  )
}

function getPositionFail(pos) {
  // 위치 데이터를 받아오지 못했을때
  weatherLoadFailSpan.innerHTML = 'location'
  hideWeatherLoading(weatherLoadFail)
}

// openWeatherMap API에서 받아온 json 데이터를 기반하여 날씨 데이터 표현
// weatherCondition 데이터 값에 따라서 현재 날씨를 아이콘으로 표현
```
