const loginUser = () => {
  const email = document.getElementById('loginEmail').value
  const password = document.getElementById('loginPassword').value
  auth.signInWithEmailAndPassword(email, password).then((res) => {
    const person = {
      email: firebaseApp.auth().currentUser.email,
      uid: firebaseApp.auth().currentUser.uid
    }
    window.localStorage.setItem('user', JSON.stringify(person))
    // user = firebaseApp.auth().currentUser
    $('#authDropdown').css('visibility', 'visible')
    $('#loginBtn').text('Hello, ' + person.email)
    $('#signUpBtn').text('Logout')
    location.reload()
    changeLoginRegister()
  }).then(() => getDatabeseMemesData())
    .catch((err) => {
      showToast('Wrong email or password ❕', 'ff0000', 'ff0000')
      console.log(err.message)
    })
}

const registerUser = () => {
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  auth.createUserWithEmailAndPassword(email.value, password.value).then((res) => {
    console.log(res)
    const person = {
      email: firebaseApp.auth().currentUser.email,
      uid: firebaseApp.auth().currentUser.uid
    }
    window.localStorage.setItem('user', JSON.stringify(person))
    // user = firebaseApp.auth().currentUser
    $('#loginBtn').text('Hello, ' + person.email)
    $('#signUpBtn').text('Logout')
    $('#authDropdown').css('visibility', 'visible')
    document.getElementById('authDropdown').style.visibility = 'show'
    changeLoginRegister()
  }).then(() => getDatabeseMemesData())
    .catch((err) => {
      showToast('Email already in use ❕', 'ff0000', 'ff0000')
      console.log(err.message)
    })
}

const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  console.log(provider)
  console.log(auth)
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const name = result.user.displayName
      const email = result.user.email
      const profilePic = result.user.photoURL
      const person = {
        name,
        email,
        profilePic
      }
      window.localStorage.setItem('user', JSON.stringify(person))
      $('#authDropdown').css('visibility', 'visible')
      $('#loginBtn').text('Hello, ' + person.email)
      $('#signUpBtn').text('Logout')
      location.reload()
      changeLoginRegister()
    })
    .catch((error) => {
      console.log(error)
    })
}

const logout = async () => {
  await firebaseApp.auth().signOut()
  $('#signUpBtn').empty()
  $('#signUpBtn').append('<a href="#/register">Register</a>')
  $('#loginBtn').empty()
  $('#loginBtn').append('<a href="#/login">Login</a>')
  $('#authDropdown').css('visibility', 'hidden')
  const registerForm = document.getElementById('registerForm')
  const person = {
    email: null,
    uid: null
  }
  location.reload()
  window.localStorage.setItem('user', JSON.stringify(person))
}
