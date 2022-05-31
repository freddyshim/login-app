const express = require('express')
const cors = require('cors')
const { LoginManager } = require('login-express')

// initialize express
const app = express()

// initialize middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// intialize login-express
const loginJS = LoginManager({
  jwtSecret: process.env.SERVER_JWT_SECRET,
  jwtResetSecret: process.env.SERVER_JWT_RESET_SECRET,
  emailFromUser: process.env.SERVER_EMAIL_USER,
  emailFromPass: process.env.SERVER_EMAIL_PASS,
  emailHost: process.env.SERVER_EMAIL_HOST,
})
loginJS.connectToDb(process.env.SERVER_MONGODB_URI)

// create express router
const router = express.Router()

// register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  try {
    await loginJS.register({ name, email, password })
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.status(200).end()
})

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const token = await loginJS.login({ email, password })
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.status(200).send({ token })
})

// verify email
router.patch('/verify', async (req, res) => {
  const { token } = req.body
  try {
    await loginJS.verify(token)
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.status(200).end()
})

// request password change
router.put('/reset-password', async (req, res) => {
  const { email } = req.body
  try {
    await loginJS.resetPassword(email)
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.status(200).end()
})

// change password
router.patch('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body
  try {
    await loginJS.changePassword({ resetToken, newPassword })
  } catch (err) {
    res.status(400).send(err.message)
  }
  res.status(200).end()
})

// all routes have a /auth path prefix
app.use('/auth', router)

// run express server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
)
