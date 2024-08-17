import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
import { useToast } from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../context/Authentication';

const ProductInfo = ({productDetail,handlePreview,preview,role}) => {

  const {cart,setCart} = useContext(AppContext)
  const toast = useToast()
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()

  const handleAddToCart = () => {
    const newCart = [...cart]
    const productExist = newCart.some((item)=>item._id === productDetail[0]._id)
    if(productExist){
      const findProduct = newCart.find((item)=>item._id === productDetail[0]._id)
      findProduct.quantity++
      findProduct.amount = findProduct.price * findProduct.quantity
      setCart(newCart)
      toast({
        title: 'Already in cart',
        description: `The quantity of ${productDetail[0]?.name} has been added to ${findProduct.quantity} in the cart successfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      })
    }else{
      setCart([...cart,{...productDetail[0],quantity:1,amount:productDetail[0].price}])
      toast({
        title: 'Add to the cart',
        description: `${productDetail[0]?.name} is added to the cart successfully`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position:'top'
      }) 
    }
    
  }

  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  const handleAlert = () => {
    toast({
      title: 'Sign in',
      description: "Please log in before adding to the cart.",
      status: 'error',
      duration: 2000,
      isClosable: true,
      position:'top'
    })
  }

  return (
    <>
        <div className='xl:w-[50%] flex flex-col-reverse xl:flex-col justify-center gap-5 sm:gap-12'>

          <section className='w-full xl:h-[340px] px-5 text-center xl:text-start flex flex-col justify-evenly gap-3'>
            <h1 className='w-full pt-5 xl:pt-0 font-bold text-3xl xl:text-5xl text-center'>{productDetail[0]?.name}</h1>
            <p className='text-gray-400 text-center text-xl'>{productDetail[0]?.code}</p>
            <p className='text-[#E04132] font-bold text-4xl'>{productDetail[0]?.price && formatNumber(productDetail[0].price)} ฿</p>
            <p className='text-gray-800'>{productDetail[0]?.description}</p>
            <div className='w-full pb-10 xl:pb-0 mt-2 flex justify-center items-center gap-5 py-5'>
              <button 
                onClick={isAuthenticated ? ()=>handleAddToCart() : ()=>handleAlert()}
                className='border p-4 rounded-xl w-52 text-white bg-[#E04132] text-lg sm:text-2xl font-bold hover:bg-orange-700 duration-300'> 
                Add to cart
              </button>
              <button 
                onClick={()=>navigate('/product')}
                className='border p-4 rounded-xl w-52 text-gray-700 bg-gray-300 text-lg sm:text-2xl font-bold hover:bg-white hover:text-black duration-300'> 
                Shop more
              </button>
            </div>
          </section>
      
          <section className='flex flex-wrap justify-center gap-3 px-5'>
            { preview.length !== 0 ?                 
              productDetail[0]?.avatars?.map((item)=> 
                <img 
                  key={item.publicId}
                  src={item.url} 
                  alt="products" 
                  className={`${item.publicId === preview[0].publicId ? 'opacity-100' : 'opacity-20'} object-cover w-14 sm:w-20 h-18 sm:h-24  rounded-xl`}
                  onMouseOver={()=>handlePreview(item.publicId)}
              />)
              :
              productDetail[0]?.avatars.map((item)=> 
                <img 
                  key={item.publicId}
                  src={item.url} 
                  alt="products" 
                  className={`${item.publicId === productDetail[0].avatars[0].publicId ? 'opacity-100' : 'opacity-20'} object-cover w-14 sm:w-20 h-18 sm:h-24  rounded-xl`}
                  onMouseOver={()=>handlePreview(item.publicId)}
              />)                               
            }              
          </section>

        </div>
    </>
  )
}

export default ProductInfo