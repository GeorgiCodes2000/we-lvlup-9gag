let user = {}


const registerForm = document.getElementById('registerForm')
if (registerForm) {
  registerForm.addEventListener('submit', registerUser)
}

function changeLoginRegister () {
  $('#content').empty()
  $('#signUpBtn').click(() => {
  logout()
  })
}



$(function () {
  $('#loginBtn').click(function () {
    $('#content').load('http://127.0.0.1:5500/src/pages/login.html', function () {
      const loginForm = document.getElementById('loginForm')
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault()
          loginUser()
      
            changeLoginRegister()
          
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
          changeLoginRegister()
          
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
