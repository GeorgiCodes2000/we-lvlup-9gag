
// function uploadMeme() {
//     let user = JSON.parse(window.localStorage.getItem('user'))

//     const ref = storage.ref(user.uid)
//     const file = document.getElementById('photo').files[0]
//     const name = new Date() + '-' + file.name
//     const metadata = {
//         contentType: file.type
//     }

//     const task = ref.child(name).put(file, metadata)
//     task.then(snapshot => snapshot.ref.getDownloadURL())
//     .then(url => {
//         console.log(url)
//         alert("Image uploaded")
//         const image = document.getElementById('image')
//         image.src = url
//     })
// }