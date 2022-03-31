const HomeComponent = {
  render: () => {
    jQuery(function () { getDatabeseMemesData() })
  }
}

const Login = {
  render: () => {
    console.log(' i have to render login')

    $('#content').load('http://127.0.0.1:5501/src/pages/login.html', function () {
      const loginForm = document.getElementById('loginForm')
      if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
          e.preventDefault()
          loginUser()

          changeLoginRegister()
        })
      }
    })
  }
}

const Register = {
  render: () => {
    $('#content').load('http://127.0.0.1:5501/src/pages/register.html', function () {
      const registerForm = document.getElementById('registerForm')
      if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
          e.preventDefault()
          registerUser()
          changeLoginRegister()
        })
      }
    })
  }
}

const FreshMemes = {
  render: () => {
    getDatabeseFreshMemesData()
  }
}

const TrendingMemes = {
  render: () => {
    getTrending()
  }
}

const Favourites = {
  render: () => {
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
    setTimeout( getUploadsOFUser(), 7000);
   
  }
}

const Post = {
  render: () => {
    console.log('hey yo')
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
  { path: '/post', component: Post },
]
const parseLocation = () => location.hash.slice(1).toLowerCase() || '/'

const findComponentByPath = (path, routes) => routes.find(r => r.path.match(new RegExp(`^\\${path}$`, 'gm'))) || undefined;

const router = () => {
  // Find the component based on the current path
  const path = parseLocation()
  // If there's no matching route, get the "Error" component
  const { component = ErrorComponent } = findComponentByPath(path, routes) || {}
  // Render the component in the "app" placeholder
  component.render()
  console.log(findComponentByPath(path, routes))
  console.log(routes)
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)