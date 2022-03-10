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
        // document.getElementById('like').addEventListener('click', (x) => myFunction(x))
        likeBtn.addEventListener('click', (x) => toggleLike(x.target))
        memeDiv.appendChild(singleMemeDiv)
        
      }
    
  }
}
