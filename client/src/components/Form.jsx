import React from 'react'
import Dropzone from './Dropzone'
import Input from './Input'
import Button from './Button'
import { useContext } from 'react'
import { AppContext } from '../App'
import {useNavigate} from 'react-router-dom'
import { useToast } from '@chakra-ui/react';
import Textarea from './Textarea'

const Form = ({params}) => {

    const {name,
          setName,
          code,
          setCode,
          price,
          setPrice,
          description,
          setDescription,
          avatars,
          setIsUpdate,
          setIsSubmit,isDelete,setIsDelete} = useContext(AppContext)
          
    const navigate = useNavigate();
    const toast = useToast()

    const handleValidate = () => {
        if(avatars.length === 0){
          toast({
            title: 'Product image.',
            description: "Product image is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(name === ''){
          toast({
            title: 'Product name.',
            description: "Product name is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(code === ''){
          toast({
            title: 'Product code.',
            description: "Product code is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(price === ''){
          toast({
            title: 'Product price.',
            description: "Product price is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(String(price).charAt(0) == 0){
          toast({
            title: 'Product price.',
            description: "Price cannot start with 0",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
          })
        }else if(description === ''){
          toast({
            title: 'Product Description.',
            description: "Price description is required",
            status: 'error',
            duration: 2000,
            isClosable: true,
            position:'top'
        })
        }else if(params.id){
          setIsUpdate(true)
        }else{
          setIsSubmit(true)
        }
      }

     

    return (
        <>
          <form className='flex flex-col gap-5 w-full py-5'>
            <h2 className='text-gray-700 text-lg text-center sm:text-left'>Upload Image</h2>
            <Dropzone/>
            <h3 className='text-center sm:text-right text-gray-400 text-sm font-light'>Image Upload ({avatars.length}/6)</h3>
            <Input 
                id='name' 
                title='Product name' 
                type='text' 
                placeholder='Product name' 
                value={name} 
                onChange={(e)=>{setName(e.target.value)}}/>
            <Input 
                id='code' 
                title='Code' 
                type='text' 
                placeholder='Code' 
                value={code} 
                onChange={(e)=>{setCode(e.target.value)}}/>
            <Input 
                id='price' 
                title='Price' 
                type='number' 
                placeholder='1,000' 
                value={price} 
                onChange={(e)=>{setPrice(e.target.value)}}/>

            <Textarea
                id='description'
                title='Description'
                placeholder='Product description'
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
             
          <div className='flex justify-center gap-5 py-5 sm:p-10'>
            <Button 
                  className='border p-3 rounded-full w-28 sm:w-56 bg-white text-[#E04132] hover:bg-gray-200 hover:text-black duration-300' 
                  type='reset' 
                  title='Cancel' 
                  onClick={()=>navigate('/product')}/>
            <Button 
                  className='border p-3 rounded-full w-28 sm:w-56 text-white bg-[#E04132] hover:bg-orange-700 duration-300' 
                  type='button' 
                  title='Confirm' 
                  onClick={handleValidate}/>
          </div>

            {params.id &&     
                        <Button 
                          type='button'
                          onClick={()=>setIsDelete(true)}
                          className='border bg-red-800 text-white h-14 text-xl font-semibold rounded-xl mb-10 hover:bg-red-600 duration-300'
                          title = 'Delete' />
            }
         

          </form>
        </>
    )
}

export default Form