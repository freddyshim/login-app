import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

interface VerifyEmailProps {
  verified: boolean
}

const VerifyEmailPage = ({ verified }: VerifyEmailProps) => {
  return verified ? <div>Yes</div> : <div>No</div>
}

export const getServerSideProps: GetServerSideProps<VerifyEmailProps> = async ({
  query,
}) => {
  const { token } = query
  try {
    await axios.patch('http://server:5000/auth/verify-email', {
      token,
    })
  } catch (err) {
    axios.isAxiosError(err) && console.error(err.response?.data)
    return {
      props: {
        verified: false,
      },
    }
  }
  return {
    props: {
      verified: true,
    },
  }
}

export default VerifyEmailPage
