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

function scrollTop (div) {
  div.scrollTop = div.scrollHeight

  setTimeout(function () {
    div.scrollTop = 0
  }, 500)
}

const home = document.getElementById('logoHome')

function showToast (text, col1, col2) {
  if (arguments.length > 1) {
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
        background: `linear-gradient(to right, #${col1}, #${col2})`
      },
      onClick: function () {} // Callback after click
    }).showToast()
  } else {
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
}

let linkId = ''

function getDetails (id) {
  function toggleLike (singleMemeDiv, x, likesCount, liked) {
    if (liked) {
      x.classList = 'fa fa-3x  fa-thumbs-up'
    } else {
      x.classList = 'fa fa-3x  fa-thumbs-down'
    }

    like(singleMemeDiv.id, likesCount)
  }

  $('#content').load('http://127.0.0.1:5501/src/pages/post.html', function () {
    const docRef = db.collection('memes').doc(id)

    docRef.get().then((doc) => {
      let liked = false
      const likeBtn = document.getElementById('post-like-button')
      if (user && user.email && doc.data().likedBy.includes(user.email)) {
        likeBtn.classList = 'fa fa-3x  fa-thumbs-down'
        liked = true
      } else {
        likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
      }
      showComments(doc.id)
      document.getElementById('change').id = doc.id
      const postImg = document.getElementById('post-img')
      const postLike = document.getElementById('post-like')
      const postLikeBtn = document.getElementById('post-like-button')
      postLike.innerHTML = doc.data().ups
      postImg.src = doc.data().img
      postLikeBtn.addEventListener('click', (x) => {
        toggleLike(doc, x.target, postLike.id, liked)
        liked = !liked
      })
      const commentForm = document.getElementById('comment-form')
      commentForm.addEventListener('submit', (e) => {
        e.preventDefault()
        comment(doc.id)
      })
    })
  })
}

function loopAndAndDomAdd (arr) {
  $('#content').empty()
  const content = document.getElementById('content')
  const memeDiv = document.createElement('div')
  memeDiv.className = 'memeDiv'
  content.appendChild(memeDiv)

  if (window.location.href === 'http://127.0.0.1:5501/src/pages/index.html#/favourites') {
    scrollTop(memeDiv)
  }

  if (window.location.href === 'http://127.0.0.1:5501/src/pages/index.html#/favourites' && arr.length === 0) {
    const noLikes = document.createElement('h2')
    noLikes.innerHTML = 'You have not liked anything yet 🖖'
    memeDiv.appendChild(noLikes)
  }

  function toggleLike (singleMemeDiv, x, likesCount, liked) {
    if (window.location.href === 'http://127.0.0.1:5501/src/pages/index.html#/favourites') {
      singleMemeDiv.remove()
    }
    if (liked) {
      console.log(x)
      x.classList = 'fa fa-3x  fa-thumbs-up'
    } else {
      x.classList = 'fa fa-3x  fa-thumbs-down'
    }

    like(singleMemeDiv.id, likesCount)
  }
  for (let i = 0; i < arr.length; i++) {
    let liked = false
    const singleMemeDiv = document.createElement('div')
    singleMemeDiv.className = 'singleMemeDiv'
    singleMemeDiv.id = arr[i].id
    const author = document.createElement('h3')
    author.innerHTML = arr[i].data().author
    const likeCountAndBtnDiv = document.createElement('div')
    const likesCount = document.createElement('button')
    likesCount.classList = 'btn btn-secondary likesCount'
    likesCount.innerHTML = arr[i].data().ups
    likesCount.id = 'likesCount' + arr[i].id
    const meme = document.createElement('img')
    meme.classList = 'memeInDiv'
    const likeBtn = document.createElement('i')
    if (user && user.email && arr[i].data().likedBy.includes(user.email)) {
      likeBtn.classList = 'fa fa-3x  fa-thumbs-down'
      liked = true
    } else {
      likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
    }

    likeBtn.id = 'like'
    meme.src = arr[i].data().img
    meme.id = 'img' + arr[i].id
    const link = document.createElement('a')
    link.href = '#/post'
    linkId = arr[i].id
    link.appendChild(meme)
    likeCountAndBtnDiv.className = 'likeCountAndBtnDiv'
    likeCountAndBtnDiv.append(likesCount, likeBtn)
    singleMemeDiv.appendChild(author)
    singleMemeDiv.appendChild(link)
    singleMemeDiv.appendChild(likeCountAndBtnDiv)

    link.addEventListener('click', () => {
      linkId = arr[i].id
    })

    likeBtn.addEventListener('click', (x) => {
      toggleLike(singleMemeDiv, x.target, likesCount.id, liked)
      liked = !liked
    })
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
      favourites(data.docs)
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
    return (b.data().ups) - (a.data().ups)
  })

  loopAndAndDomAdd(trendingMemesArr)
}

const favourites = (arr) => {
  const arr1 = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].data().likedBy.includes(user.email)) {
      arr1.push(arr[i])
    }
  }
  loopAndAndDomAdd(arr1)
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
    $('#content').load('http://127.0.0.1:5501/src/pages/generateMeme.html', function () {
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

  let next = function (snapshot) { console.log('next') }
  let error = function () { console.log('error') }
  let complete = function () {
    console.log(ref.child(name).getDownloadURL().then(url => {
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
          showToast('Meme posted 👏')
        }).catch((error) => {
          alert(error)
        })
    }))
  }
  const task = ref.child(name).put(file, metadata)
  task.on(
    firebase.storage.TaskEvent.STATE_CHANGED,
    next,
    error,
    complete)
}

function preview (e) {
  const file = document.getElementById('photo')
  const image = document.getElementById('image')
  const [preview] = file.files
  if (preview) {
    image.src = URL.createObjectURL(preview)
  }
}

function loadUploadedMemes (arr) {
  const passArr = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].data().author === user.email) {
      passArr.push(arr[i])
      loopAndAndDomAdd(passArr)
    }
  }
}

function getUploadsOFUser () {
  db.collection('memes')
    .get()
    .then((data) => {
      loadUploadedMemes(data.docs)
    })
}

// window.onscroll = async function (ev) {
//   if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
//     const response = await fetch('https://meme-api.herokuapp.com/gimme/40')
//     const data = await response.json()
//     const memes = data.memes
//     const memeDiv = document.querySelector('.memeDiv')
//     const seeMoreDiv = document.createElement('div')
//     seeMoreDiv.className = 'seeMoreDiv'
//     const seeMoreH2 = document.createElement('h2')
//     seeMoreH2.innerHTML = '😎See more memes😎'
//     seeMoreDiv.appendChild(seeMoreH2)
//     memeDiv.appendChild(seeMoreDiv)
//     function toggleLike (x) {
//       x.classList.toggle('fa-thumbs-down')
//     }

//     for (let i = 0; i < memes.length; i++) {
//       if (memes[i].preview[3] !== undefined) {
//         const singleMemeDiv = document.createElement('div')
//         singleMemeDiv.className = 'singleMemeDiv'
//         const meme = document.createElement('img')
//         const likeBtn = document.createElement('i')
//         const title = document.createElement('h3')
//         const likesCount = document.createElement('button')
//         likesCount.classList = 'btn btn-info'
//         likesCount.id = 'likesCount'
//         likesCount.innerHTML = memes[i].ups
//         title.className = 'author'
//         title.innerHTML = 'Author: ' + memes[i].author
//         likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
//         likeBtn.id = 'like'
//         likeBtn.addEventListener('click', (e) => {
//           const author = e.target.parentElement.children[0]
//           const element = e.target.parentElement.children[1]
//           const likes = e.target.parentElement.children[2]
//           let updateLikes = parseInt(likesCount.innerHTML)
//           likesCount.innerHTML = ++updateLikes
//           saveLikedPost(element.src, author.innerHTML, likes.innerHTML)
//           showToast('Post saved to favourites 👑')
//         })
//         meme.src = memes[i].preview[3]
//         singleMemeDiv.appendChild(title)
//         singleMemeDiv.appendChild(meme)
//         singleMemeDiv.appendChild(likesCount)
//         singleMemeDiv.appendChild(likeBtn)
//         likeBtn.addEventListener('click', (x) => toggleLike(x.target))
//         memeDiv.appendChild(singleMemeDiv)
//       }
//     }
//   }
// }

const like = (id, likesCount) => {
  let user = JSON.parse(window.localStorage.getItem('user'))
  const docRef = db.collection('memes').doc(id)

  docRef.get().then((doc) => {
    if (user.email && doc.exists && doc.data().likedBy.includes(user.email) === false) {
      docRef.update({
        ups: Number(doc.data().ups) + 1,
        likedBy: [...doc.data().likedBy, user.email]
      }).then(() => {
        showToast('You like this post 🔥')
        let ups = doc.data().ups + 1
        document.getElementById(likesCount).innerHTML = ups
      })
    } else if (user.email) {
      // doc.data() will be undefined in this case
      docRef.update({
        ups: Number(doc.data().ups) - 1,
        likedBy: removeItemAll(doc.data().likedBy, user.email)
      }).then(() => {
        showToast('You no longer like the post 💔')
        let ups = doc.data().ups - 1
        document.getElementById(likesCount).innerHTML = ups
      })
    } else {
      showToast('You have to be logged to like 🕵', 'ff0000', 'ff0000')
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
      document.getElementById('detailsAuthor').innerHTML = doc.data().author
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
  const commentInp = document.getElementById('commentInp')
  let user = JSON.parse(window.localStorage.getItem('user'))
  const docRef = db.collection('memes').doc(id)
  docRef.get().then((doc) => {
    if (doc.exists && user.email) {
      docRef.update({
        comments: [...doc.data().comments, { comment: commentInp.value, user: user.email }]
      }).then(() => {
        showToast('Comment added 😍')
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
      showToast('You have to be logged to comment 🕵', 'ff0000', 'ff0000')
    }
  }).catch((err) => {
    console.log(err)
  })
}
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
