
import React from 'react'

const page = ({params}: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-2 min-h-screen">
      <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white'>Profile page</h1>
      <h2 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-white'>{params.id}</h2>
    </div>
  )
}

export default page
