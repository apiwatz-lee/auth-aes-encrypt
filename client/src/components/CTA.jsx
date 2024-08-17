import React from 'react'
import { Link } from 'react-router-dom'

const CTA = () => {
  return (
    <main className='h-screen w-screen flex justify-center items-center bg-shopping bg-cover bg-top bg-no-repeat  font-poppins'>
        <div className='w-full h-full flex flex-col justify-center items-center backdrop-blur-lg gap-10'>
            <p className='text-xl text-white text-center px-5'>You can always find something you want</p>
            <p>- Sophie Kinsella -</p>
            <Link to='/product' className='border p-10 rounded-xl'>
                <p className='text-white text-center animate-bounce text-4xl sm:text-5xl font-bold hover:text-amber-200 duration-500'>Shop now</p>
            </Link>
        </div>
    </main> 
  )
}

export default CTA