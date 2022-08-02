import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const ChangePasswordPage = () => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const router = useRouter()
  const { token } = router.query

  const changePassword = async () => {
    if (password !== confirm) {
      console.log('passwords do not match')
      return
    }
    console.log(token)
    const res = await axios.patch('/server/auth/reset-password', {
      resetToken: token,
      newPassword: password,
    });
  }

  return (
    <div className="w-full h-screen flex justify-center mx-auto text-xl">
      <Head>
        <title>Login App</title>
        <meta name="description" content="Login to this app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full max-w-sm flex flex-col justify-center items-center space-y-4">
        <div>Change Password</div>
        <label>
          <p>New Password</p>
          <input
            className="bg-gray-200 rounded-sm"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <label>
          <p>Confirm Password</p>
          <input
            className="bg-gray-200 rounded-sm"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.currentTarget.value)}
          />
        </label>
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400"
          onClick={() => changePassword()}
        >
          Confirm Password Change
        </button>
      </main>
    </div>
  )
}

export default ChangePasswordPage
