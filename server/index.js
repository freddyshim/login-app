const express = require('express')
const cors = require('cors')
const { LoginExpress } = require('login-express')
const cookieParser = require('cookie-parser')

// initialize express
const app = express()

// initialize middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

// intialize login-express
const loginJS = new LoginExpress({
  jwtSecret: process.env.SERVER_JWT_SECRET,
  jwtResetSecret: process.env.SERVER_JWT_RESET_SECRET,
  emailFromUser: process.env.SERVER_EMAIL_USER,
  emailFromPass: process.env.SERVER_EMAIL_PASS,
  emailHost: process.env.SERVER_EMAIL_HOST,
  mongoDbUri: process.env.SERVER_MONGODB_URI,
  clientBaseUrl: 'http://localhost',
})

// create express router
const router = express.Router()

// get user
router.get('/user', loginJS.isLoggedIn, (req, res) => {
  res.status(200).send(req.user)
})

// register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    await loginJS.register({ name, email, password })
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    await loginJS.login({ res, email, password })
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// verify email
router.patch('/verify-email', async (req, res) => {
  const { token } = req.body
  try {
    await loginJS.verify(token)
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// request password change
router.put('/reset-password', async (req, res) => {
  const { email } = req.body
  try {
    await loginJS.resetPassword(email)
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// change password
router.patch('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body
  try {
    await loginJS.changePassword({ resetToken, newPassword })
    res.status(200).end()
  } catch (err) {
    res.status(400).send(err.message)
  }
})

// all routes have a /auth path prefix
app.use('/auth', router)

// run express server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
)
