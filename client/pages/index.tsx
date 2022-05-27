import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'

const Home: NextPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const register = async () => {
    await axios.post('/api/auth/register', { name, email, password })
  }

  return (
    <div className="w-full h-screen flex justify-center mx-auto text-xl">
      <Head>
        <title>Login App</title>
        <meta name="description" content="Login to this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm flex flex-col justify-center items-center space-y-4">
        <div>Register</div>
        <label>
          <p>Name</p>
          <input
            className="bg-gray-200 rounded-sm"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </label>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400"
          onClick={() => register()}
        >
          Sign Up
        </button>
      </main>
    </div>
  )
}

export default Home
