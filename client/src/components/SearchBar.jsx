import React,{ useContext }  from 'react'
import { AppContext } from '../App'
import { PiMagnifyingGlassThin } from "react-icons/pi";

const SearchBar = () => {

    const {keyword,setKeyword} = useContext(AppContext)
    
    return (

    <div className='relative'>
        <input 
        type="text" 
        className='border w-[90vw] h-14 rounded-full pl-14 outline-none placeholder:text-gray-400 placeholder:font-light text-gray-500'
        placeholder='Name, Catalogue, Code'
        value={keyword}
        onChange={(e)=>{setKeyword(e.target.value)}}
        />
        
        <PiMagnifyingGlassThin className='absolute top-[18px] left-[30px] text-xl text-gray-400'/>
    </div>
  )
}

export default SearchBar