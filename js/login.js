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
