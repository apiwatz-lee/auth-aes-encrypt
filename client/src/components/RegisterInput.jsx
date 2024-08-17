import React from 'react'

const RegisterInput = ({name,type,placeholder,value,onChange,errorMessage}) => {
  return (
    <div className='flex flex-col gap-2'>
        <label className='text-lg text-center font-semibold w-full text-gray-400 '>{name}</label>
        <input 
            type={type}
            placeholder={placeholder}
            className='bg-transparent border p-3 w-[250px] rounded-lg outline-none text-white placeholder:text-gray-700 placeholder:text-xs placeholder:text-center'
            value={value}
            onChange={onChange}
            />
        <p className='text-red-500 pl-2 text-xs'>{errorMessage && <span>{errorMessage}</span>}</p>
    </div>
  )
}

export default RegisterInput