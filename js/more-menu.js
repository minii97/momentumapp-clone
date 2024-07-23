const moreBtn = [
  document.querySelector('.greeting-more .more-btn'),
  document.querySelector('.greeting-btn'),
  document.querySelector('.todo-more .more-btn'),
]

// mobile에선 greeting 문구자체가 버튼의 역할을 하기때문에 querySelectorAll이 아니라 각각 querySelector를 이용하여 array에 저장

let moreMenuItem = document.querySelectorAll('.more-menu-item button')

let moreMenu
let activateMoreBtn
let activatedMoreBtn
// 각각을 let을 이용하여 변수를 선언해주고 버튼을 누를때마다 각각의 변수에 클릭한 요소 혹은 관련 요소가 각 변수에 할당되게 함.

let editNameInputs
// editNameInputs라는 빈 변수를 선언하고 edit-btn 눌러서 이름 수정할때 생겨나는 input 요소들을 해당 변수에 저장.
const emptyValueAlertElement = document.querySelector('.greeting-message')
const logoutAlert = document.querySelector('.logout')
const logoutButtons = logoutAlert.querySelectorAll('button')

moreBtn.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-name-input')) {
      return false
    }
    // 모바일에서 edit-name-btn을 눌러 이름 수정중에는 edit-name-input이 moreBtn의 자식요소가 되기 때문에 input을 클릭했을때 function이 실행되지않도록함.

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

      overlay.addEventListener('click', () => {
        // quoteBtn이 눌려서 overlay가 보일때 눌리는 경우에 moreMenu가 undefined라서 에러가 나는 경우를 대비하기위해서 moreMenu에 할당된 값이 있을 때만 is-active 클래스가 사라지도록
        if (moreMenu != undefined) {
          moreMenu.classList.remove('is-active')
        }

        overlay.classList.add('hide')

        setTimeout(() => {
          moreMenu = undefined
        }, 300)
      })
    }
  }
}

moreMenuItem.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (activatedMoreBtn != undefined) {
      activatedMoreBtn.classList.remove('is-active')
    }
    // 모바일에서는 activatedMoreBtn 변수를 따로 활용하지 않기 때문에 activateMoreBtn 변수에 할당된 값이 있을때만 해당 요소의 class를 remove해줌

    moreMenu.classList.remove('is-active')
    overlay.classList.add('hide')

    moreMenu = undefined
    // 모바일/태블릿 -> Pc로 전환시 activatedMoreBtn 변수에는 값이 저장이 되어있지 않기 때문에 moreMenu의 저장된 값을 비워줌
    if (
      e.currentTarget.classList.contains('clear-btn') ||
      e.currentTarget.classList.contains('edit-btn')
    ) {
      if (e.currentTarget.classList.contains('clear-btn')) {
        todoFormInput.value = ''
      }
      if (e.currentTarget.classList.contains('edit-btn')) {
        todoFormInput.value = localStorage.getItem('todo')
      }
      todoForm.classList.remove('hide')
      todoContainer.classList.add('hide')
      todoCheckBox.checked = false
      localStorage.removeItem('checked')
      localStorage.removeItem('todo')
      todoMoreBtn.classList.remove('clickable')
      todoLabel.classList.remove('clickable')

      //   todo-more에서 edit/clear 버튼을 눌러 today-goals 수정시 today-goals 컨텐츠를 숨기고 form 요소를 보이게하고 체크박스 해제/localStorage에 저장된 checkbox값/today-goals 목록 삭제/moreBtn과 label요소를 클릭 불가하게 함.
    } else if (e.currentTarget.classList.contains('edit-name-btn')) {
      // greeting-more의 edit-name-btn을 눌러 username을 수정할때엔 editing이라는 class를 붙여줌
      if (!e.currentTarget.classList.contains('editing')) {
        // 해당 버튼을 눌렀는데 editing 클래스가 없으면 = 수정중이 아니라면
        mainContentsUsernameElement.forEach((item) => {
          item.innerHTML = `<input class="edit-name-input" type="text" value="${localStorage.getItem(
            'username'
          )}" autocomplete="off" maxlength="20"/>`
        })
        // .username span에 이름을 수정할 수 있도록 input요소를 추가함.

        editNameInputs = document.querySelectorAll('.edit-name-input')
        // editNameInputs 변수에 생성된 .edit-name-input 요소를 할당
      } else {
        // 해당 버튼을 눌렀는데 editing 클래스가 있다면 = 수정중이라면 , 아무런 동작도 하지않음.
        return false
      }

      e.currentTarget.classList.toggle('editing')

      editNameInputs.forEach((item) => {
        item.addEventListener('keydown', (e) => {
          if (e.keyCode == 13) {
            // edit-name-input 요소를 수정하고 enter를 눌렀을때 ("keycode=13")
            if (item.value.trim() == '') {
              emptyValueAlertElement.classList.add('is-active')
              //   message 출력 ("공백이 아닌 값을 입력해주세요")
            } else {
              localStorage.setItem('username', item.value.trim())
              emptyValueAlertElement.classList.remove('is-active')
              mainContentsUsernameElement.forEach((item) => {
                item.innerHTML = `${localStorage.getItem('username')}.`
              })

              document.querySelectorAll('.edit-name-btn').forEach((item) => {
                item.classList.remove('editing')
              })

              // 빈칸이 아니라면 앞뒤 공백값을 제외하고 로컬 스토리지에 값을 저장하고 .username에 수정한 값을 innerHTML을 이용하여 넣어주고 수정이 끝났으니 .edit-name-btn에 editing 클래스를 삭제하여 눌렀을때 이름 수정이 가능하게 해줌.
            }
          }
        })
      })
    } else if (e.currentTarget.classList.contains('logout-btn')) {
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
