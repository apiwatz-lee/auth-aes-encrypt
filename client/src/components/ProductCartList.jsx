import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../App'

const ProductCartList = () => {

    const {cart,setCart} = useContext(AppContext)
 
    const handleAddQuantity = (id) => {
        const newCart = [...cart]
        const findProduct = newCart.find((product)=>product._id === id)
        findProduct.quantity++;
        findProduct.amount = findProduct.price * findProduct.quantity
        setCart(newCart)
      }
    
    const handleReduceQuantity = (id,index) => {
        const newCart = [...cart];
        const findProduct = newCart.find((product) => product._id === id);
        if (findProduct.quantity > 1) {
          findProduct.quantity--;
          findProduct.amount = findProduct.price * findProduct.quantity
        } else if (findProduct.quantity === 1) {
          newCart.splice(index, 1);
        }
        setCart(newCart);
      }
     
    const handleDeleteProduct = (id) => {
        const newCart = [...cart]
        const deleteProduct = newCart.filter((item)=>item._id !== id)
        setCart(deleteProduct)
      }

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      };

      

    return (
        <div> 
            {cart.map((item,index)=>{
              return ( 
                <div className='relative shadow-xl flex flex-col gap-5 lg:gap-0 lg:flex-row justify-center lg:w-[40vw] mt-5 rounded-xl p-3 lg:p-6' key={item._id}>
                           
                  <div className='flex flex-col justify-center items-center gap-5'>
                      <img className='w-full h-36 rounded-lg object-cover' src={item.avatars[0].url} alt={item.name} />
                      <div className='w-full lg:w-48 h-10 rounded-xl flex justify-center items-center'>
                        <button
                            className='border w-20 h-10 rounded-l-lg p-1'
                            onClick={()=> handleReduceQuantity(item._id,index)}>
                        -</button>
                        <input 
                            className='border w-28 h-10 p-1 outline-none text-center' 
                            type="number" 
                            placeholder='pcs' 
                            value={item.quantity} 
                            readOnly
                        />
                        <button
                            className='border w-20 h-10 rounded-r-lg p-1'
                            onClick={()=> handleAddQuantity(item._id)}
                        >+</button>
                            
                      </div>
                  </div>      
                          
                  <div className='w-full pl-8 flex flex-col justify-center gap-2'>
                      <h1 className='text-gray-500 font-light'>Product: <span className='font-medium text-black'>{item.name}</span></h1>
                      <p className='text-gray-500 font-light'>Code: <span className='font-medium text-black'>{item.code}</span></p>
                      <p className='text-gray-500 font-light'>Price: <span className='font-medium text-black'>{formatNumber(item.price)} </span> <span className='text-gray-500 font-light'>per piece</span></p>
                      <p className='text-gray-500 font-light'>Qty: <span className='font-medium text-black'>{item.quantity}</span></p>
                      <div className='w-full flex flex-col items-end pr-2'>
                        <p className='font-medium text-gray-500'>Amount(THB)</p>
                        <p className='font-semibold text-lg lg:text-3xl'>{formatNumber(item.amount)} ฿</p>
                      </div>
                  </div>
                  
                  <div
                    className='hidden absolute top-[27px] right-[20px] p-2 w-18 h-8 2xl:flex justify-center items-center text-[#E04132] cursor-pointer underline'
                    onClick={()=>handleDeleteProduct(item._id)}
                  >remove</div>
                </div>
            )})}
        </div>
  )
}

export default ProductCartList