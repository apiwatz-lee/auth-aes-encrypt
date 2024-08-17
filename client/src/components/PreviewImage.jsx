import React from 'react'

const PreviewImage = ({preview,productDetail}) => {
  return (
    <>
         <div className='flex justify-center xl:w-[50%]'>
            
            {preview.length === 0 ?

            <img 
            src={productDetail[0]?.avatars[0].url}
            alt="products" 
            className='w-[95%] h-[350px] xl:h-[70vh] xl:w-full object-cover rounded-3xl'
            />                          

            :
            
            <img 
            src={preview[0].url}
            alt="products" 
            className='w-[95%] h-[350px] xl:h-[70vh] xl:w-full object-cover rounded-3xl'
            />  
              
            }
                        
        </div>
    </>
  )
}

export default PreviewImage