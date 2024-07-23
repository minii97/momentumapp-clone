const logo = document.querySelector('.logo')

const loginContainer = document.querySelector('.login-wrap')
const loginForm = loginContainer.querySelector('.login-form')
const loginFormText = loginForm.querySelectorAll('.login-form-text span')
const loginFormInput = loginForm.querySelector('input')

function login(e) {
  e.preventDefault()

  if (loginFormInput.value.trim() == '') {
    // 만약 인풋입력값의 앞뒤 공백을 삭제한 값이 ""라면 = 스페이스바 이외에 아무값도 입력하지 않았을때
    loginFormText[0].classList.add('hide')
    // "당신의 이름을 입력해주세요" 멘트를 숨긴다.
    loginFormText[1].classList.remove('hide')
    // "빈칸이 아닌 당신의 이름을 입력해주세요" 멘트를 보인다.
  } else {
    // 값이 입력되어있는 경우엔
    localStorage.setItem('username', loginFormInput.value.trim())
    // 로컬스토리지 username key에 인풋입력값(=사용자 지정 닉네임)을 저장한다.

    loginContainer.classList.add('hide')
    logo.classList.add('hide')
    mainContents.classList.remove('hide')
    // 로그인 화면/로고를 없애고, 메인컨텐츠 (= 투두 입력하는 화면)를 보이게함

    mainContentsUsernameElement.forEach((item) => {
      item.innerHTML = `${localStorage.getItem('username')}.`
    })
    // main contents의 username부분을 내가 입력하여 로컬스토리지에 저장한 값을 불러와서 집어 넣음.
  }
}

loginForm.addEventListener('submit', (e) => {
  login(e)
})

if (localStorage.getItem('username') !== null) {
  // 만약 로컬스토리에 저장값이 있다면 = 로그인 되어있다면
  loginContainer.classList.add('hide')
  logo.classList.add('hide')
  mainContents.classList.remove('hide')
  // 로그인 화면과 로고를 안보이게 하고 투두 입력화면을 보이게함.

  mainContentsUsernameElement.forEach((item) => {
    item.innerHTML = `${localStorage.getItem('username')}.`
  })
} else {
  loginContainer.classList.remove('hide')
  logo.classList.remove('hide')
  mainContents.classList.add('hide')
  // 로그인 화면과 로고를 보이게 하고 투두 입력화면을 안보이게함.
}
