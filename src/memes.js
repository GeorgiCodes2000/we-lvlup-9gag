let memes = []
async function getMemes () {
  const response = await fetch('https://meme-api.herokuapp.com/gimme/50')
  const data = await response.json()
  memes = data.memes
  const content = document.getElementById('content')
  const memeDiv = document.createElement('div')
  memeDiv.className = 'memeDiv'
  content.appendChild(memeDiv);
  for (let i = 0; i < memes.length; i++) {
    const meme = document.createElement('img')
    meme.src = memes[i].preview[2]
    memeDiv.appendChild(meme)
  }
}
