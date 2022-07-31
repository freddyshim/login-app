import express from 'express';
import cors from 'cors';
import { LoginExpress, AuthRequest } from 'login-express';
import { Employee } from './models/Employee';
import { connect } from 'mongoose';

// initialize express
const app = express();

// initialize middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// connect to db
connect(process.env.SERVER_MONGODB_URI || '');

// connect to db
connect(process.env.SERVER_MONGODB_URI || '')

// intialize login-express
const loginJS = new LoginExpress({
  jwtSecret: process.env.SERVER_JWT_SECRET || '',
  jwtResetSecret: process.env.SERVER_JWT_RESET_SECRET || '',
  emailFromUser: process.env.SERVER_EMAIL_USER || '',
  emailFromPass: process.env.SERVER_EMAIL_PASS || '',
  emailHost: process.env.SERVER_EMAIL_HOST || '',
  userModel: Employee,
  clientBaseUrl: 'http://localhost',
});

// create express router
const router = express.Router();

// get user
router.get('/user', loginJS.isLoggedIn, (req: AuthRequest, res) => {
  res.status(200).send(req.user);
});

// get user
router.get(
  '/auth-test',
  loginJS.isLoggedIn,
  loginJS.isAdmin,
  (req: AuthRequest, res) => {
    res.status(200).send(req.user);
  }
);

// register
router.post('/register', async (req, res) => {
  const { name, email, password, ...other } = req.body;
  try {
    await loginJS.register(res, { name, email, password, ...other });
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    await loginJS.login(res, { email, password });
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// logout
router.post('/logout', loginJS.isLoggedIn, async (req, res) => {
  try {
    loginJS.logout(res);
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// send verification email
router.post(
  '/send-verify-email',
  loginJS.isLoggedIn,
  async (req: AuthRequest, res) => {
    try {
      await loginJS.sendVerificationEmail(req.user);
      res.status(200).end();
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
);

// verify email
router.patch('/verify-email', async (req, res) => {
  const { token } = req.body;
  try {
    await loginJS.verify(token);
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// request password change
router.post('/send-reset-password', async (req, res) => {
  const { email } = req.body;
  try {
    await loginJS.sendPasswordResetEmail(email);
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// change password
router.patch('/reset-password', async (req, res) => {
  const { resetToken, newPassword } = req.body;
  try {
    await loginJS.changePassword(res, { resetToken, newPassword });
    res.status(200).end();
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// all routes have a /auth path prefix
app.use('/auth', router);

// run express server
app.listen(process.env.SERVER_PORT, () =>
  console.log(`Server is running on port ${process.env.SERVER_PORT}`)
);
