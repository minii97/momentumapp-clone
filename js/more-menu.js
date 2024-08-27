const moreBtn = [
  document.querySelector('.greeting-more .more-btn'),
  document.querySelector('.greeting-btn'),
  document.querySelector('.goals-more .more-btn'),
]

let moreMenuItem = document.querySelectorAll('.more-menu-item button')

let moreMenu
let activateMoreBtn
let activatedMoreBtn

let editNameInputs

const emptyValueAlertElement = document.querySelector('.greeting-message')

moreBtn.forEach((item) => {
  item.addEventListener('click', () => {
    togglingMoreMenu(item)
  })
})

function activeMoreMenu(item) {
  activatedMoreBtn = item
  moreMenu = item.nextElementSibling

  activatedMoreBtn.classList.add('is-active')
  moreMenu.classList.add('is-active')
}

function togglingMoreMenu(item) {
  if (!mql.matches) {
    // 태블릿 이상 사이즈에서 moreBtn 클릭시
    if (moreMenu == undefined) {
      // moreBtn을 최초로 눌렀을때
      activeMoreMenu(item)
    } else {
      // moreBtn이 이미 한번이상 눌린 상태.
      activateMoreBtn = item
      // 현재 누른 버튼을 activateMoreBtn 변수에 할당

      if (activateMoreBtn == activatedMoreBtn) {
        // 만일 똑같은 버튼을 눌렀다면
        activatedMoreBtn.classList.toggle('is-active')
        moreMenu.classList.toggle('is-active')
        //   is-active를 토글
      } else {
        // 이미 버튼이 눌려져있던 상황에서 다른 버튼을 누르면
        activatedMoreBtn.classList.remove('is-active')
        moreMenu.classList.remove('is-active')
        //   기존에 is-active되어있던 요소 숨김

        activeMoreMenu(item)
        //   현재 클릭한 버튼요소와 그 뒤에 오는 list-wrap 요소를 보여줌
      }
    }
  } else {
    moreMenu = item.nextElementSibling

    if (moreMenu.querySelector('.editing')) {
      moreMenu = undefined

      return false
    } else {
      moreMenu.classList.add('is-active')
      overlay.classList.remove('hide')
      overlay.addEventListener('click', hideMoreMenuSm)

      function hideMoreMenuSm() {
        if (moreMenu != undefined) {
          moreMenu.classList.remove('is-active')
        }

        overlay.classList.add('hide')

        setTimeout(() => {
          moreMenu = undefined
        }, 300)

        overlay.removeEventListener('click', hideMoreMenuSm)
      }
    }
  }

  window.addEventListener('click', hideMoreMenu)

  function hideMoreMenu(e) {
    if (!e.target.closest('.more-menu')) {
      moreMenu = item.nextElementSibling
      moreMenu.classList.remove('is-active')
      item.classList.remove('is-active')
      window.removeEventListener('click', hideMoreMenu)
    }
  }
}

moreMenuItem.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (activatedMoreBtn != undefined) {
      activatedMoreBtn.classList.remove('is-active')
    }

    moreMenu.classList.remove('is-active')
    overlay.classList.add('hide')

    moreMenu = undefined

    function pushClearAndEditBtn() {
      if (e.currentTarget.classList.contains('clear-btn')) {
        todayGoalsFormInput.value = ''
      }
      if (e.currentTarget.classList.contains('edit-btn')) {
        todayGoalsFormInput.value = todayGoals.text
      }
      todayGoalsForm.classList.remove('hide')
      todayGoalsContainer.classList.add('hide')
      todayGoalsCheckBox.checked = false
      todayGoalsMoreBtn.classList.remove('clickable')
      todayGoalsLabel.classList.remove('clickable')
    }

    if (
      e.currentTarget.classList.contains('clear-btn') ||
      e.currentTarget.classList.contains('edit-btn')
    ) {
      pushClearAndEditBtn()
    } else if (e.currentTarget.classList.contains('edit-name-btn')) {
      if (!e.currentTarget.classList.contains('editing')) {
        mainContentsUsernameElement.forEach((item) => {
          item.innerHTML = `<input class="edit-name-input" type="text" value="${localStorage.getItem(
            'username'
          )}" autocomplete="off" maxlength="20"/>`
        })

        editNameInputs = document.querySelectorAll('.edit-name-input')
      }

      e.currentTarget.classList.toggle('editing')

      editNameInputs.forEach((item) => {
        function editName(e) {
          if (e.keyCode == 13) {
            if (item.value.trim() == '') {
              emptyValueAlertElement.classList.add('is-active')
            } else {
              localStorage.setItem('username', item.value.trim())
              emptyValueAlertElement.classList.remove('is-active')
              mainContentsUsernameElement.forEach((item) => {
                item.innerHTML = `${localStorage.getItem('username')}.`
              })

              document.querySelectorAll('.edit-name-btn').forEach((item) => {
                item.classList.remove('editing')
              })
            }
          }
        }

        item.addEventListener('keydown', editName)
      })
    } else if (e.currentTarget.classList.contains('logout-btn')) {
      logout()
    }

    function logout() {
      const logoutAlert = document.querySelector('.logout')
      const logoutButtons = logoutAlert.querySelectorAll('button')

      logoutAlert.classList.add('is-active')
      overlay.classList.remove('hide')

      logoutButtons.forEach((item) => {
        item.addEventListener('click', () => {
          if (item.classList.contains('yes-btn')) {
            localStorage.clear()
            location.reload(true)
          } else if (item.classList.contains('no-btn')) {
            logoutAlert.classList.remove('is-active')
            overlay.classList.add('hide')
          }
        })
      })
    }
  })
})
