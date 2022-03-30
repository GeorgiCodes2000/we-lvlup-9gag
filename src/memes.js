/* eslint-disable no-undef */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */

function removeItemAll (arr, value) {
  let i = 0
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1)
    } else {
      ++i
    }
  }
  return arr
}

const showToast = (text) => {
  Toastify({
    text: text,
    duration: 3000,
    destination: '',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)'
    },
    onClick: function () {} // Callback after click
  }).showToast()
}

function loopAndAndDomAdd (arr) {
  console.log(arr)
  $('#content').empty()
  const content = document.getElementById('content')
  const memeDiv = document.createElement('div')
  memeDiv.className = 'memeDiv'
  content.appendChild(memeDiv)

  function toggleLike (singleMemeDiv, x, likesCount) {
    x.classList.toggle('fa-thumbs-down')
    like(singleMemeDiv.id, likesCount)
  }
  for (let i = 0; i < arr.length; i++) {
    const singleMemeDiv = document.createElement('div')
    singleMemeDiv.className = 'singleMemeDiv'
    singleMemeDiv.id = arr[i].id
    const author = document.createElement('h3')
    author.innerHTML = arr[i].data().author
    const likesCount = document.createElement('button')
    likesCount.classList = 'btn btn-info'
    likesCount.innerHTML = arr[i].data().ups
    likesCount.id = 'likesCount' + arr[i].id
    const meme = document.createElement('img')
    const likeBtn = document.createElement('i')
    likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
    likeBtn.id = 'like'
    meme.src = arr[i].data().img
    meme.id = arr[i].id
    singleMemeDiv.appendChild(author)
    singleMemeDiv.appendChild(meme)
    singleMemeDiv.appendChild(likesCount)
    singleMemeDiv.appendChild(likeBtn)
    meme.addEventListener('click', () => {
      (function a () {
        $('#content').load('http://127.0.0.1:5500/src/pages/post.html', function () {
          showComments(arr[i].id)
          document.getElementById('change').id = arr[i].id
          const postImg = document.getElementById('post-img')
          const postLike = document.getElementById('post-like')
          const postLikeBtn = document.getElementById('post-like-button')
          postLike.innerHTML = arr[i].data().ups
          postImg.src = arr[i].data().img
          postLikeBtn.addEventListener('click', (x) => toggleLike(arr[i], x.target, postLike.id))
          const commentForm = document.getElementById('comment-form')
          commentForm.addEventListener('submit', (e) => {
            e.preventDefault()
            comment(arr[i].id)
          })
        })
      })()
    })

    likeBtn.addEventListener('click', (x) => toggleLike(singleMemeDiv, x.target, likesCount.id))
    memeDiv.appendChild(singleMemeDiv)
  }
}

let memes = []

const getDatabeseMemesData = () => {
  db.collection('memes')
    .get()
    .then((data) => {
      showMemes(data.docs)
    })
}

const getDatabeseFreshMemesData = () => {
  db.collection('memes')
    .get()
    .then((data) => {
      freshMemes(data.docs)
    })
}

const getTrending = () => {
  db.collection('memes')
    .get()
    .then((data) => {
      trendingMemes(data.docs)
    })
}

const getFavourites = () => {
  db.collection('memes')
    .get()
    .then((data) => {
      const arr = []
      for (let i = 0; i < data.docs.length; i++) {
        if (data.docs[i].data().likedBy.includes(user.email)) {
          arr.push(data.docs[i])
        }
      }
      loopAndAndDomAdd(arr)
    })
}

const showMemes = (arr) => {
  loopAndAndDomAdd(arr)
}

const freshMemes = (arr) => {
  const freshMemesArr = arr.slice().sort(function (a, b) {
    return new Date(b.data().uploaded) - new Date(a.data().uploaded)
  })

  loopAndAndDomAdd(freshMemesArr)
}

const trendingMemes = (arr) => {
  const trendingMemesArr = arr.slice().sort(function (a, b) {
    console.log(a.data().ups)
    return (b.data().ups) - (a.data().ups)
  })

  loopAndAndDomAdd(trendingMemesArr)
}

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

  // top text
  ctx.textBaseline = 'top'
  ctx.strokeText(topText, width / 2, yOffset)
  ctx.fillText(topText, width / 2, yOffset)

  // bottom text
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
            const btnDownload = document.createElement('button')
            btnDownload.innerHTML = 'download'
            document.querySelector('.textInputsFieldsDiv').appendChild(btnDownload)
            btnDownload.addEventListener('click', (e) => {
              e.preventDefault()
              const link = document.createElement('a')
              link.download = 'meme.png'
              link.href = canvas.toDataURL()
              link.click()
              link.delete
            })
          }, { once: true })
        })
      }
    })
  })
})

function uploadMeme () {
  let user = JSON.parse(window.localStorage.getItem('user'))
  const ref = storage.ref(user.uid + '/')
  const file = document.getElementById('photo').files[0]
  const name = new Date() + '-' + file.name
  const metadata = {
    contentType: file.type
  }
  const task = ref.child(name).put(file, metadata)
  console.log(task)
  showToast('Image successfully uploaded')
  // task.then(snapshot => snapshot.ref.getDownloadURL())
  // .then(url => {
  //     const image = document.getElementById('image')
  //     image.src = url
  // })
}

function preview (e) {
  const file = document.getElementById('photo')
  const image = document.getElementById('image')
  const [preview] = file.files
  console.log(preview)
  if (preview) {
    image.src = URL.createObjectURL(preview)
  }
}

function loadUploadedMemes (arr) {
  $('#content').empty()
  const content = document.getElementById('content')
  const memeDiv = document.createElement('div')
  memeDiv.className = 'memeDiv'
  content.appendChild(memeDiv)
  console.log(arr.length)
  for (let i = 0; i < arr.length; i++) {
    arr[i].getDownloadURL().then(url => {
      const singleMemeDiv = document.createElement('div')
      const post = document.createElement('button')
      post.innerHTML = 'Post'
      post.addEventListener('click', () => {
        db.collection('memes').add({
          img: url,
          comments: [],
          author: user.email,
          uploader: user.email,
          ups: 0,
          uploaded: new Date().toLocaleString(),
          likedBy: []
        })
          .then((docRef) => {
            console.log(docRef.id)
          }).catch((error) => {
            alert(error)
          })
      })
      singleMemeDiv.className = 'singleMemeDiv'
      const meme = document.createElement('img')
      meme.src = url
      singleMemeDiv.appendChild(meme)
      singleMemeDiv.appendChild(post)
      memeDiv.appendChild(singleMemeDiv)
    })
  }
}

function getUploadsOFUser () {
  const uploadedMemes = []
  let storageRef = storage.ref()
  let listRef = storageRef.child(user.uid + '/')
  listRef.listAll()
    .then((res) => {
      res.items.forEach((itemRef) => {
        uploadedMemes.push(itemRef)
      })
    }).catch(() => {
    }).finally(() => loadUploadedMemes(uploadedMemes))
}

window.onscroll = async function (ev) {
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    const response = await fetch('https://meme-api.herokuapp.com/gimme/40')
    const data = await response.json()
    const memes = data.memes
    const memeDiv = document.querySelector('.memeDiv')
    function toggleLike (x) {
      x.classList.toggle('fa-thumbs-down')
    }

    for (let i = 0; i < memes.length; i++) {
      if (memes[i].preview[3] !== undefined) {
        const singleMemeDiv = document.createElement('div')
        singleMemeDiv.className = 'singleMemeDiv'
        const meme = document.createElement('img')
        const likeBtn = document.createElement('i')
        const title = document.createElement('h3')
        const likesCount = document.createElement('button')
        likesCount.classList = 'btn btn-info'
        likesCount.id = 'likesCount'
        likesCount.innerHTML = memes[i].ups
        title.className = 'author'
        title.innerHTML = 'Author: ' + memes[i].author
        likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
        likeBtn.id = 'like'
        likeBtn.addEventListener('click', (e) => {
          const author = e.target.parentElement.children[0]
          const element = e.target.parentElement.children[1]
          const likes = e.target.parentElement.children[2]
          let updateLikes = parseInt(likesCount.innerHTML)
          likesCount.innerHTML = ++updateLikes
          saveLikedPost(element.src, author.innerHTML, likes.innerHTML)
          showToast('Post saved to your liked')
        })
        meme.src = memes[i].preview[3]
        singleMemeDiv.appendChild(title)
        singleMemeDiv.appendChild(meme)
        singleMemeDiv.appendChild(likesCount)
        singleMemeDiv.appendChild(likeBtn)
        likeBtn.addEventListener('click', (x) => toggleLike(x.target))
        memeDiv.appendChild(singleMemeDiv)
      }
    }
  }
}

const like = (id, likesCount) => {
  console.log(id)
  let user = JSON.parse(window.localStorage.getItem('user'))
  const docRef = db.collection('memes').doc(id)

  docRef.get().then((doc) => {
    if (user.email && doc.exists && doc.data().likedBy.includes(user.email) === false) {
      console.log('Document data:', doc.data().likedBy)
      docRef.update({
        ups: Number(doc.data().ups) + 1,
        likedBy: [...doc.data().likedBy, user.email]
      }).then(() => {
        showToast('Post liked')
        let ups = doc.data().ups + 1
        document.getElementById(likesCount).innerHTML = ups
      })
    } else if (user.email) {
      // doc.data() will be undefined in this case
      console.log(doc.data().likedBy)
      docRef.update({
        ups: Number(doc.data().ups) - 1,
        likedBy: removeItemAll(doc.data().likedBy, user.email)
      }).then(() => {
        showToast('You no longer like the post')
        let ups = doc.data().ups - 1
        document.getElementById(likesCount).innerHTML = ups
      })
    } else {
      showToast('You have to be logged to like')
    }
  }).catch((error) => {
    console.log('Error getting document:', error)
  })
}

const showComments = (id) => {
  let user = JSON.parse(window.localStorage.getItem('user'))
  const docRef = db.collection('memes').doc(id)
  docRef.get().then((doc) => {
    if (doc.exists) {
      const fatherOfComments = document.getElementById('commentsFather')

      for (let i = 0; i < doc.data().comments.length; i++) {
        const commentToAppend =
        `
        <div class="card mb-3" id="singleCommentToAppend">
        <div class="card-body">
          <div class="d-flex flex-start">
            <div class="w-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-primary fw-bold mb-0">
                  ${doc.data().comments[i].user}
                  <span class="text-dark ms-2">${doc.data().comments[i].comment}</span>
                </h6>
                <p class="mb-0">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        fatherOfComments.insertAdjacentHTML('beforebegin', commentToAppend)
      }
    }
  })
}

const comment = (id) => {
  console.log(id)
  const commentInp = document.getElementById('commentInp')
  let user = JSON.parse(window.localStorage.getItem('user'))
  const docRef = db.collection('memes').doc(id)
  docRef.get().then((doc) => {
    if (doc.exists && user.email) {
      console.log(doc.data())
      docRef.update({
        comments: [...doc.data().comments, { comment: commentInp.value, user: user.email }]
      }).then(() => {
        showToast('Comment added')
        const fatherOfComments = document.getElementById('commentsFather')
        const commentToAppend =
        `
        <div class="card mb-3" id="singleCommentToAppend">
        <div class="card-body">
          <div class="d-flex flex-start">
            <div class="w-100">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h6 class="text-primary fw-bold mb-0">
                  ${user.email}
                  <span class="text-dark ms-2">${commentInp.value}</span>
                </h6>
                <p class="mb-0">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        `
        fatherOfComments.insertAdjacentHTML('beforebegin', commentToAppend)
        commentInp.value = ''
      })
    } else {
      showToast('You have to be logged to comment!')
    }
  }).catch((err) => {
    console.log(err)
  })

  // docRef.get().then((doc) => {
  //   if (user.email && doc.exists && doc.data().likedBy.includes(user.email) === false) {
  //     console.log('Document data:', doc.data().likedBy)
  //     docRef.update({
  //       ups: Number(doc.data().ups) + 1,
  //       likedBy: [...doc.data().likedBy, user.email]
  //     }).then(() => {
  //       showToast('Post liked')
  //       let ups = doc.data().ups + 1
  //       document.getElementById(likesCount).innerHTML = ups
  //     })
  //   } else if (user.email) {
  //     // doc.data() will be undefined in this case
  //     console.log(doc.data().likedBy)
  //     docRef.update({
  //       ups: Number(doc.data().ups) - 1,
  //       likedBy: removeItemAll(doc.data().likedBy, user.email)
  //     }).then(() => {
  //       showToast('You no longer like the post')
  //       let ups = doc.data().ups - 1
  //       document.getElementById(likesCount).innerHTML = ups
  //     })
  //   } else {
  //     showToast('You have to be logged to like')
  //   }
  // }).catch((error) => {
  //   console.log('Error getting document:', error)
  // })
}

// const saveLikedPost = (src, author, ups) => {
//   let user = JSON.parse(window.localStorage.getItem('user'))
//   let parsedUps = parseInt(ups)
//   if (user.email != null) {
//     db.collection(user.uid).add({
//       img: src,
//       comments: [],
//       author: author,
//       ups: parsedUps
//     })
//       .then((docRef) => {
//         console.log(docRef.id)
//       }).catch((error) => {
//         alert(error)
//       })
//   }
// }

// const showLikedPosts = () => {
//   db.collection(user.uid)
//     .get()
//     .then((data) => {
//       logLiked(data.docs)
//     })
// }

// const dislike = (post) => {
//   db.collection(user.uid).doc(post).delete()
//     .then(() => console.log('Remove from liked'))
//   document.getElementById(post).remove()
//   showToast('You no longer like this post')
// }

// const logLiked = (arr) => {
//   $('#content').empty()
//   const content = document.getElementById('content')
//   const memeDiv = document.createElement('div')
//   memeDiv.className = 'memeDiv'
//   content.appendChild(memeDiv)

//   function toggleLike (id, x) {
//     if (x.classList.value === 'fa fa-3x  fa-thumbs-down') {
//       x.classList = 'fa fa-3x  fa-thumbs-up'
//     } else {
//       x.classList = 'fa fa-3x  fa-thumbs-down'
//     }
//     dislike(id)
//   }

//   for (let i = 0; i < arr.length; i++) {
//     const singleMemeDiv = document.createElement('div')
//     singleMemeDiv.className = 'singleMemeDiv'
//     singleMemeDiv.id = arr[i].id
//     const author = document.createElement('h3')
//     author.innerHTML = arr[i].data().author
//     const likesCount = document.createElement('button')
//     likesCount.classList = 'btn btn-info'
//     likesCount.innerHTML = arr[i].data().ups
//     likesCount.id = 'likesCount'
//     const meme = document.createElement('img')
//     const likeBtn = document.createElement('i')
//     likeBtn.classList = 'fa fa-3x  fa-thumbs-down'
//     likeBtn.id = 'like'
//     meme.src = arr[i].data().img
//     meme.id = arr[i].id
//     singleMemeDiv.appendChild(author)
//     singleMemeDiv.appendChild(meme)
//     singleMemeDiv.appendChild(likesCount)
//     singleMemeDiv.appendChild(likeBtn)
//     likeBtn.addEventListener('click', (x) => toggleLike(meme.id, x.target))
//     memeDiv.appendChild(singleMemeDiv)
//   }
//   const seeMoreDiv = document.createElement('div')
//   seeMoreDiv.className = 'seeMoreDiv'
//   const seeMoreH2 = document.createElement('h2')
//   seeMoreH2.innerHTML = '😎See more memes😎'
//   seeMoreDiv.appendChild(seeMoreH2)
//   memeDiv.appendChild(seeMoreDiv)
// }

// FILL WITH MEMES
// async function fillBase () {
//   const response = await fetch('https://meme-api.herokuapp.com/gimme/40')
//   const data = await response.json()
//   memes = data.memes

//   for (let i = 0; i < memes.length; i++) {
//     if(memes[i].preview[3]){
//       db.collection('memes').add({
//         img: memes[i].preview[3],
//         comments: [],
//         author: memes[i].author,
//         ups: memes[i].ups,
//         uploader: 'unknown',
//         uploaded: new Date().toLocaleString(),
//         likedBy: []
//       })
//         .then((docRef) => {
//           console.log(docRef.id)
//         }).catch((error) => {
//           alert(error)
//         })
//     }

// }}
