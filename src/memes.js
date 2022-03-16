let memes = []
async function getMemes () {
  const response = await fetch('https://meme-api.herokuapp.com/gimme/40')
  const data = await response.json()
  memes = data.memes
  const content = document.getElementById('content')
  const memeDiv = document.createElement('div')
  memeDiv.className = 'memeDiv'
  content.appendChild(memeDiv)

  function toggleLike(x) {
    x.classList.toggle("fa-thumbs-down");
  }
  
  for (let i = 0; i < memes.length; i++) {
    if (memes[i].preview[3] !== undefined) {
      const singleMemeDiv = document.createElement('div')
      singleMemeDiv.className = 'singleMemeDiv'
      const meme = document.createElement('img')
      const likeBtn = document.createElement('i')
       likeBtn.classList = 'fa fa-3x  fa-thumbs-up'
       likeBtn.id = 'like'
        meme.src = memes[i].preview[3]
        singleMemeDiv.appendChild(meme)
        singleMemeDiv.appendChild(likeBtn)
        likeBtn.addEventListener('click', (x) => toggleLike(x.target))
        memeDiv.appendChild(singleMemeDiv)
        
      }
    
  }
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

           } )
         }, { once: true })
       })
     }
   })
 })
})

function uploadMeme() {
  let user = JSON.parse(window.localStorage.getItem('user'))
    const ref = storage.ref(user.uid + '/')
    const file = document.getElementById('photo').files[0]
    const name = new Date() + '-' + file.name
    const metadata = {
        contentType: file.type
    }
    const task = ref.child(name).put(file, metadata)
    task.then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
        const image = document.getElementById('image')
        image.src = url
    })
}


