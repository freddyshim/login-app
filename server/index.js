const express = require('express')
const app = express()
const loginJS = require('login-express')
const cors = require('cors')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// required
const dbConfig = {
  mongodbURI: process.env.SERVER_MONGODB_URI,
  jwtSecret: process.env.SERVER_JWT_SECRET,
}

// required
const appConfig = {
  jwtResetSecret: process.env.SERVER_JWT_RESET_SECRET,
  emailFromAddress: process.env.SERVER_EMAIL_ADDRESS,
  emailFromUser: process.env.SERVER_EMAIL_USER,
  emailFromPass: process.env.SERVER_EMAIL_PASS,
  emailHost: process.env.SERVER_EMAIL_HOST,
  emailPort: 465,
  emailSecure: true,
}

loginJS(dbConfig, appConfig, app, express, {}, {}, '/auth')

app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
)
