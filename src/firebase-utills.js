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
    history.pushState({
    }, 'Home', '/src/pages/index.html')
    $('#authDropdown').css('visibility', 'visible')
    $('#loginBtn').text('Hello, ' + person.email)
    $('#signUpBtn').text('Logout')
  }).then(() => getDatabeseMemesData())
    .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
}

const registerUser = () => {
  const email = document.getElementById('email')
  const password = document.getElementById('password')

  auth.createUserWithEmailAndPassword(email.value, password.value).then((res) => {
    const person = {
      email: firebaseApp.auth().currentUser.email,
      uid: firebaseApp.auth().currentUser.uid
    }
    window.localStorage.setItem('user', JSON.stringify(person))
    // user = firebaseApp.auth().currentUser
    history.pushState({
    }, 'Home', '/src/pages/index.html')
    $('#loginBtn').text('Hello, ' + person.email)
    $('#signUpBtn').text('Logout')
    $('#authDropdown').css('visibility', 'visible')
    document.getElementById('authDropdown').style.visibility = 'show'
  }).then(() => getDatabeseMemesData())
    .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
}

const logout = async () => {
  await firebaseApp.auth().signOut()
  $('#signUpBtn').text('Sign up')
  $('#loginBtn').text('Log in')
  $('#authDropdown').css('visibility', 'hidden')
  const registerForm = document.getElementById('registerForm')
  const person = {
    email: null,
    uid: null
  }
  window.localStorage.setItem('user', JSON.stringify(person))
}
