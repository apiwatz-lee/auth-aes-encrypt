import React, { useContext } from 'react'
import { AppContext } from '../App'

const Pagination = () => {

    const {page,setPage,totalPage} = useContext(AppContext)

      const handlePrevious = () => {
        setPage((prev)=> prev !== 1 ? prev - 1 : prev)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }
    
      const handleNext = () => {
        setPage((prev)=>prev !== totalPage ? prev + 1 : prev)
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }

      return (
        <>
          {totalPage > 1 &&      
          
            <div className='flex flex-col sm:flex-row w-96 justify-center items-center gap-10 pb-10'>
            
              <button 
              className='p-3 rounded-full w-32 bg-[#E04132] hover:bg-orange-700 duration-300 text-white font-bold'
              type='button'
              onClick={handlePrevious}
              >Previous
              </button>
              

              <p> {page} of {totalPage}</p>
          
              <button 
              className='p-3 rounded-full w-32 bg-[#E04132] hover:bg-orange-700 duration-300 text-white font-bold'
              type='button'
              onClick={handleNext}
              >Next
              </button>
        
            </div>}
        </>
   
    )
}

export default Pagination