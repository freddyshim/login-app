import axios from 'axios'
import Head from 'next/head'
import { useState } from 'react'

const LogoutPage = () => {
  const logout = async () => {
    const res = await axios.post('/server/auth/logout');
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
        <div>Logout</div>
        <button
          className="bg-gray-200 px-4 py-2 rounded-full hover:bg-gray-400"
          onClick={() => logout()}
        >
          Log Out
        </button>
      </main>
    </div>
  )
}

export default LogoutPage
