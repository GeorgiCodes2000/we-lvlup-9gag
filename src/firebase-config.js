const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyArOU_-MYCAx-eODG-iYiFDEoLcwk0BViU',
  authDomain: 'gagclone-d19b7.firebaseapp.com',
  projectId: 'gagclone-d19b7',
  storageBucket: 'gagclone-d19b7.appspot.com',
  messagingSenderId: '303503067610',
  appId: '1:303503067610:web:3ab89190aac7d15e5b58e3'
})

const db = firebaseApp.firestore()
const auth = firebaseApp.auth()
const storage = firebaseApp.storage()
