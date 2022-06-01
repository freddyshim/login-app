import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const res = await axios.post('/api/auth/login', { email, password })
    console.log(res)
  }

  return (
    <div className="w-full h-screen flex justify-center mx-auto text-xl">
      <Head>
        <title>Login App</title>
        <meta name="description" content="Login to this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm flex flex-col justify-center items-center space-y-4">
        <div>Login</div>
        <label>
          <p>Email</p>
          <input
            className="bg-gray-200 rounded-sm"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            className="bg-gray-200 rounded-sm"
            type="password"
            autoComplete="password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400"
          onClick={() => login()}
        >
          Log In
        </button>
      </main>
    </div>
  )
}

export default LoginPage
