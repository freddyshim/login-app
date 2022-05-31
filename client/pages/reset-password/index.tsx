import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState, useEffect } from 'react'

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('')

  const requestReset = async () => {
    try {
      const res = await axios.put('/api/auth/reset-password', { email })
      console.log(res.data)
    } catch (err) {
      axios.isAxiosError(err) && console.error(err.response?.data)
    }
  }

  return (
    <div className="w-full h-screen flex justify-center mx-auto text-xl">
      <Head>
        <title>Login App</title>
        <meta name="description" content="Login to this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm flex flex-col justify-center items-center space-y-4">
        <div>Reset Password</div>
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
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400"
          onClick={() => requestReset()}
        >
          Send Password Reset Email
        </button>
      </main>
    </div>
  )
}

export default ResetPasswordPage
