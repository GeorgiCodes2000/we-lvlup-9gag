/* eslint-disable no-undef */
// let user = {}

let user = JSON.parse(window.localStorage.getItem('user'))
const theme = window.localStorage.getItem('theme')
function setMode () {
  const themeChange = document.getElementById('themeChange')

  if (theme && theme === 'light') {
    document.getElementById('navbar').className = 'navbar navbar-expand-lg navbar-light bg-light'
    document.getElementById('dropdown').style = 'color: black !important'

    themeChange.innerHTML = 'Dark mode 🌙'
  } else {
    const element = document.body
    element.classList = ('dark-mode')
    themeChange.innerHTML = 'Light mode 🌞'
    document.getElementById('navbar').className = 'navbar navbar-expand-lg navbar-dark bg-dark'
    document.getElementById('dropdown').style = 'color: white !important'
    document.getElementById('logoHome').style = 'color: white !important'
    const list = document.getElementsByClassName('nav-item nav-link')
    for (let i = 0; i < list.length; i++) {
      list[i].style = 'color: white !important'
    }
  }
}

function darkMode () {
  const element = document.body
  element.classList.toggle('dark-mode')
  if (element.classList.value === 'dark-mode') {
    window.localStorage.setItem('theme', 'dark')
    document.getElementById('navbar').className = 'navbar navbar-expand-lg navbar-dark bg-dark'
    document.getElementById('logoHome').style = 'color: white !important'
    document.getElementById('dropdown').style = 'color: white !important'
    const list = document.getElementsByClassName('nav-item nav-link')
    themeChange.innerHTML = 'Light mode 🌞'
    for (let i = 0; i < list.length; i++) {
      list[i].style = 'color: white !important'
    }
  } else {
    window.localStorage.setItem('theme', 'light')
    document.getElementById('navbar').className = 'navbar navbar-expand-lg navbar-light bg-light'
    document.getElementById('logoHome').style = 'color: black !important'
    document.getElementById('dropdown').style = 'color: black !important'
    const list = document.getElementsByClassName('nav-item nav-link')
    themeChange.innerHTML = 'Dark mode 🌙'
    for (let i = 0; i < list.length; i++) {
      list[i].style = 'color: black !important'
    }
  }
}

$(document).ready(setMode)

function changeLoginRegister () {
  $('#content').empty()
  $('#signUpBtn').click(() => {
    logout()
  })
}

if (!user || user.email === null) {
  $('#authDropdown').css('display', 'none')
  const registerForm = document.getElementById('registerForm')
  if (registerForm) {
    registerForm.addEventListener('submit', registerUser)
  }
} else {
  document.getElementById('loginBtn').innerHTML = 'Hello, ' + user.email
  document.getElementById('signUpBtn').innerHTML = 'Logout'
  $('#authDropdown').css('display', 'block')
  changeLoginRegister()
}
