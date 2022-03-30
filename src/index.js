/* eslint-disable no-undef */
// let user = {}

let user = JSON.parse(window.localStorage.getItem('user'))



jQuery(function () { getDatabeseMemesData() })

function changeLoginRegister () {
  $('#content').empty()
  $('#signUpBtn').click(() => {
    logout()
  })
}

$('#fresh').click(() => {
  getDatabeseFreshMemesData()
  history.pushState({
  }, 'Home', '/src/pages/fresh.html')
})
$('#shuffle').click(() => {
  getTrending()
  history.pushState({
  }, 'Home', '/src/pages/trending.html')
})
$('.navbar-brand').click(() => getDatabeseMemesData())
$('#favourites').click(() => {
  getFavourites()
  history.pushState({
  }, 'Home', '/src/pages/favourites.html')
})

$(function () {
  $('#uploadMeme').click(function () {
    $('#content').load('http://127.0.0.1:5500/src/pages/upload.html', function () {
      history.pushState({
      }, 'Home', '/src/pages/upload.html')
    })
  })
})

$(function () {
  $('#seeUploads').click(function () {
    getUploadsOFUser()
    history.pushState({
    }, 'Home', '/src/pages/uploads.html')
  })
})

if (!user || user.email === null) {
  $('#authDropdown').css('visibility', 'hidden')
  const registerForm = document.getElementById('registerForm')
  if (registerForm) {
    registerForm.addEventListener('submit', registerUser)
  }

  $(function () {
    $('#loginBtn').click(function () {
      $('#content').load('http://127.0.0.1:5500/src/pages/login.html', function () {
        const loginForm = document.getElementById('loginForm')
        history.pushState({
          id: 'about-me',
          source: 'web'
      }, 'Login', '/src/pages/login.html')
        if (loginForm) {
          loginForm.addEventListener('submit', (e) => {
            e.preventDefault()
            loginUser()
            changeLoginRegister()
          })
        }
      })
    })
  })

  $(function () {
    $('#signUpBtn').click(function () {
      $('#content').load('http://127.0.0.1:5500/src/pages/register.html', function () {
        const registerForm = document.getElementById('registerForm')
        history.pushState({
        }, 'Register', '/src/pages/register.html')
        if (registerForm) {
          registerForm.addEventListener('submit', (e) => {
            e.preventDefault()
            registerUser()
            changeLoginRegister()
          })
        }
      })
    })
  })
} else {
  document.getElementById('loginBtn').innerHTML = 'Hello, ' + user.email
  document.getElementById('signUpBtn').innerHTML = 'Logout'
  $('#authDropdown').css('visibility', 'visible')
  changeLoginRegister()
}
