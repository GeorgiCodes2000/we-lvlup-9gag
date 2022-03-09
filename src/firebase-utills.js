const loginUser = () => {
    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value
    auth.signInWithEmailAndPassword(email, password).then((res) => {
      user = firebaseApp.auth().currentUser
      $('#loginBtn').text('Hello, ' + user.email)
      $('#signUpBtn').text('Logout')
    })
      .catch((err) => {
        alert(err.message)
        console.log(err.message)
      })
  }
  
  const registerUser = () => {
    const email = document.getElementById('email')
    const password = document.getElementById('password')
  
    auth.createUserWithEmailAndPassword(email.value, password.value).then((res) => {
      user = firebaseApp.auth().currentUser
      $('#loginBtn').text('Hello, ' + user.email)
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
  }