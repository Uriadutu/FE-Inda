import { auth } from '@/auth';
import ArsipLaporan from '@/components/ArsipLaporan';
import React from 'react'

const page = async() => {
  const session = await auth();
  return (
    <ArsipLaporan session={session}/>
  )
}

export default page
