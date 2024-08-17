import React from 'react'

const Textarea = ({id,title,placeholder,value,onChange}) => {
  return (
    <>
        <label htmlFor="description">{title}</label>
        <textarea 
            className='outline-none border resize-none rounded-lg p-3 pl-7 text-gray-500 font-light placeholder:font-light placeholder:text-gray-300 '
            placeholder={placeholder}
            name={id} 
            id={id}
            cols="30" 
            rows="10"
            value={value}
            onChange={onChange}
            />
    </>
  )
}

export default Textarea