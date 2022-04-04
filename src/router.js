const HomeComponent = {
  render: () => {
    jQuery(function () { getDatabeseMemesData() })
  }
}

const Login = {
  render: () => {
    $('#content').load('http://127.0.0.1:5501/src/pages/login.html', function () {
      const googleReg = document.getElementById('googleReg')
      googleReg.addEventListener('click', (e) => {
        e.preventDefault()
        signInWithGoogle()
      })
      const loginForm = document.getElementById('loginForm')
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault()
          loginUser()
        })
      }
    })
  }
}

const Register = {
  render: () => {
    $('#content').load('http://127.0.0.1:5501/src/pages/register.html', function () {
      const googleReg = document.getElementById('googleReg')
      googleReg.addEventListener('click', (e) => {
        e.preventDefault()
        signInWithGoogle()
      })
      const registerForm = document.getElementById('registerForm')
      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault()
          registerUser()
        })
      }
    })
  }
}

const FreshMemes = {
  render: () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    getDatabeseFreshMemesData()
  }
}

const TrendingMemes = {
  render: () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    getTrending()
  }
}

const Favourites = {
  render: () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
    getFavourites()
  }
}

const Upload = {
  render: () => {
    $('#content').load('http://127.0.0.1:5501/src/pages/upload.html', function () {
    })
  }
}

const Uploads = {
  render: () => {
    getUploadsOFUser()
  }
}

const Post = {
  render: () => {
    getDetails(linkArr, linkIndex)
  }
}

const ErrorComponent = {
  render: () => {
    return `
        <section>
          <h1>Error</h1>
          <p>This is just a test</p>
        </section>
      `
  }
}

const routes = [
  { path: '/home', component: HomeComponent },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/fresh', component: FreshMemes },
  { path: '/trending', component: TrendingMemes },
  { path: '/favourites', component: Favourites },
  { path: '/upload', component: Upload },
  { path: '/uploads', component: Uploads },
  { path: '/post', component: Post }
]
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/'

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined

const router = () => {
  // Find the component based on the current path
  const path = parseLocation()
  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
  // Render the component in the "app" placeholder
  component.render()
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
