const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyArOU_-MYCAx-eODG-iYiFDEoLcwk0BViU',
  authDomain: 'gagclone-d19b7.firebaseapp.com',
  projectId: 'gagclone-d19b7',
  storageBucket: 'gagclone-d19b7.appspot.com',
  messagingSenderId: '303503067610',
  appId: '1:303503067610:web:3ab89190aac7d15e5b58e3'
})

let user = {}

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()

const registerUser = () => {
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  auth.createUserWithEmailAndPassword(email.value, password.value).then((res) => {
    console.log(res.user)
    user = firebaseApp.auth().currentUser
  })
    .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
}

const registerForm = document.getElementById('registerForm')
if (registerForm) {
  registerForm.addEventListener('submit', registerUser)
}

const loginUser = () => {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  auth.signInWithEmailAndPassword(email, password).then((res) => {
    user = firebaseApp.auth().currentUser
  })
    .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
}

// const loginForm = document.getElementById('loginForm')
// if (loginForm) {
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     loginUser()
//   })
// }

function changeLoginRegister () {
  $('#content').empty()
  $('#loginBtn').text('Hello, ' + user.email)
  $('#signUpBtn').text('Logout')
  $('#signUpBtn').click(() => {
  //firebaseApp.auth().signOut()
  logout()
  $('#loginBtn').text('Login')
  })
  // $('#loginBtn').off('click')
}

const logout = async () => {
  await firebaseApp.auth().signOut()
}

$(function () {
  $('#loginBtn').click(function () {
    $('#content').load('http://127.0.0.1:5500/src/pages/login.html', function () {
      const loginForm = document.getElementById('loginForm')
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault()
          loginUser()
          // user = firebaseApp.auth().currentUser
          if (user.email) {
            // $('#content').empty()
            // $('#loginBtn').text('Hello, ' + user.email)
            // $('#signUpBtn').text('Logout')
            // $('#signUpBtn').click(() => {
            // firebaseApp.auth().signOut()
            // $('#loginBtn').text('Login')
            // })
            // $('#loginBtn').off('click')
            changeLoginRegister()
          }
        })
      }
    })
  })
})

$(function () {
  $('#signUpBtn').click(function () {
    $('#content').load('http://127.0.0.1:5500/src/pages/register.html', function () {
      const registerForm = document.getElementById('registerForm')
      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault()
          registerUser()
          // user = firebaseApp.auth().currentUser
          if (user.email) {
            // $('#content').empty()
            // $('#loginBtn').text('Hello, ' + user.email)
            // $('#signUpBtn').text('Logout')
            // $('#signUpBtn').click(() => {
            // firebaseApp.auth().signOut()
            // $('#loginBtn').text('Login')
            // })
            // $('#loginBtn').off('click')
            changeLoginRegister()
          }
        })
      }
    })
  })
})

 function updateMemeCanvas (canvas, image, topText, bottomText) {
   const ctx = canvas.getContext('2d')
   const width = image.width
   const height = image.height
   const fontSize = Math.floor(width / 10)
   const yOffset = height / 25

   canvas.width = width
   canvas.height = height

   ctx.drawImage(image, 0, 0)

   ctx.strokeStyle = 'black'
   ctx.lineWidth = Math.floor(fontSize / 4)
   ctx.fillStyle = 'white'
   ctx.textAlign = 'center'
   ctx.lineJoin = 'round'
   ctx.font = `${fontSize}px sans-serif`

  //top text
  ctx.textBaseline = 'top'
  ctx.strokeText(topText, width / 2, yOffset)
  ctx.fillText(topText, width / 2, yOffset)

   //bottom text
   ctx.textBaseline = 'bottom'
   ctx.strokeText(bottomText, width / 2, height - yOffset)
   ctx.fillText(bottomText, width / 2, height - yOffset)
  }

$(function () {
  $('#generateMemeBtn').click(function () {
    $('#content').load('http://127.0.0.1:5500/src/pages/generateMeme.html', function () {
      const imageFileInput = $('#imageFileInput')
      const topText = $('#topTextInput')
      const bottomText = $('#bottomTextInput')
      const canvas = document.getElementById('meme')
      let image
      if (imageFileInput) {
        document.getElementById('topTextInput').addEventListener('change', () => {
          updateMemeCanvas(canvas, image, topText.val(), bottomText.val())
        })

        document.getElementById('bottomTextInput').addEventListener('change', () => {
          updateMemeCanvas(canvas, image, topText.val(), bottomText.val())
        })

        imageFileInput[0].addEventListener('change', () => {
          const imageDataUrl = URL.createObjectURL(imageFileInput[0].files[0])
          console.log(imageDataUrl)
          image = new Image()
          image.src = imageDataUrl
          image.addEventListener('load', () => {
             updateMemeCanvas(canvas, image, topText.val(), bottomText.val())
          }, {once: true})

        })
      }
    })
  })
})
