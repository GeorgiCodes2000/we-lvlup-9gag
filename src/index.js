/* eslint-disable no-undef */
// let user = {}

let user = JSON.parse(window.localStorage.getItem('user'))

function changeLoginRegister () {
  $('#content').empty()
  $('#signUpBtn').click(() => {
    logout()
  })
}

if (!user || user.email === null) {
  $('#authDropdown').css('visibility', 'hidden')
  const registerForm = document.getElementById('registerForm')
  if (registerForm) {
    registerForm.addEventListener('submit', registerUser)
  }
} else {
  document.getElementById('loginBtn').innerHTML = 'Hello, ' + user.email
  document.getElementById('signUpBtn').innerHTML = 'Logout'
  $('#authDropdown').css('visibility', 'visible')
  changeLoginRegister()
}
