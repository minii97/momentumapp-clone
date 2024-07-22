const weatherList = document.querySelector('.weather-list')
const weatherLoading = document.querySelector('.weather-loading')
const weatherLoadFail = document.querySelector('.weather-load-fail')
const weatherLoadFailSpan = weatherLoadFail.querySelector(
  '.weather-load-fail-span'
)

const tempElement = weatherList.querySelector('.temp dd')
const locationElement = weatherList.querySelector('.location dd')
const weatherDescElement = weatherList.querySelector('.desc dd')

navigator.geolocation.getCurrentPosition(getPositionSuccess, getPositionFail)

function getPositionSuccess(pos) {
  const lat = pos.coords.latitude
  const lon = pos.coords.longitude
  //  위도/경도 정보 변수로 할당
  const API_KEY = 'e252c7e10fd1209b34198bab444d0a15'
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`

  fetch(url).then((response) =>
    response
      .json()
      .then((data) => {
        const temp = Math.round(data.main.temp)
        const locationCountry = data.sys.country
        const locationCity = data.name
        const weatherCondition = String(data.weather[0].id)

        const weatherConditionAObj = {
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

        console.log(weatherConditionAObj.rain)

        if (weatherCondition.thunderstorm) {
          weatherDescElement.innerHTML = `<i class="bi bi-lightning"></i>`
        } else if (weatherConditionAObj.rain) {
          weatherDescElement.innerHTML = `<i class="bi bi-umbrella"></i>`
        } else if (weatherConditionAObj.snow) {
          weatherDescElement.innerHTML = `<i class="bi bi-snow"></i>`
        } else if (weatherConditionAObj.mist) {
          weatherDescElement.innerHTML = `<i class="bi bi-cloud-fog2"></i>`
        } else if (weatherConditionAObj.snow) {
          weatherDescElement.innerHTML = `<i class="bi bi-sun"></i>`
        } else if (weatherConditionAObj.clouds) {
          weatherDescElement.innerHTML = `<i class="bi bi-clouds"></i>`
        }
        setTimeout(() => {
          weatherLoading.classList.add('hide')
        }, 500)

        weatherList.classList.remove('hide')
      })
      .catch(() => {
        weatherLoadFailSpan.innerHTML = 'weather'

        setTimeout(() => {
          weatherLoading.classList.add('hide')
        }, 500)

        weatherLoadFail.classList.remove('hide')
      })
  )
}

function getPositionFail(pos) {
  setTimeout(() => {
    weatherLoading.classList.add('hide')
  }, 500)

  weatherLoadFailSpan.innerHTML = 'location'
  weatherLoadFail.classList.remove('hide')
}
