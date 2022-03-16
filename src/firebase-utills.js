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
      $('#loginBtn').text('Hello, ' + person.email)
    $('#signUpBtn').text('Logout')
    
    }).then(()=>getMemes())
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
      $('#loginBtn').text('Hello, ' + person.email)
      $('#signUpBtn').text('Logout')
    })
    
      .catch((err) => {
      alert(err.message)
      console.log(err.message)
    })
}

const logout = async () => {
  await firebaseApp.auth().signOut()
  $('#signUpBtn').text('Sign up')
  $('#loginBtn').text('Log in')
  const person = {
    email: null,
    uid: null
  }
  window.localStorage.setItem('user', JSON.stringify(person))
}