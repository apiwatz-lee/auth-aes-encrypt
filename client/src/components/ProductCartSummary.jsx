import React from 'react'
import { useContext } from 'react';
import { AppContext } from '../App';
import { useEffect } from 'react';
import PayButton from './PayButton';

const ProductCartSummary = () => {

    const {cart,totalQuantity,setTotalQuantity,totalAmount,setTotalAmount} = useContext(AppContext)


    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
      };

      const handleTotalAmount = () => {
        const newCart = [...cart]
        const eachAmount = newCart.map((item)=>item.amount)
        const totalAmount = eachAmount.reduce((prev,curr)=>prev+curr,0)
        setTotalAmount(totalAmount)
      }
    
      const handleTotalQuantity = () => {
        const newCart = [...cart]
        const eachQuantity = newCart.map((item)=>item.quantity)
        const totalQty = eachQuantity.reduce((prev,curr)=>prev+curr,0)
        setTotalQuantity(totalQty)
      }

      useEffect(()=>{
        handleTotalAmount()
        handleTotalQuantity()
      },[cart])


    return (
      <>
        <div className='hidden sticky top-20 shadow-xl w-[500px] lg:w-[700px] h-max mt-5 rounded-xl p-5 lg:flex flex-col items-stretch gap-5'>
          <h1 className='text-center font-bold text-[#E04132] text-3xl'>Your Orders</h1>

          <div className='grid grid-cols-4 justify-items-center'>
              <span className='font-medium'>Product</span>
              <span className='font-medium'>Price(THB)</span>
              <span className='font-medium'>Quantity(pcs.)</span>
              <span className='font-medium'>Amount(THB)</span>
          </div>

          {cart.map((item)=>{
            return ( 
              <div className='grid grid-cols-4 justify-items-center' key={item._id}>
                <span className='text-gray-500 font-light'>{item.name}</span>
                <span className='text-gray-500 font-light'>{formatNumber(item.price)}</span>
                <span className='text-gray-500 font-light'>{item.quantity}</span>
                <span className='text-gray-500 font-light'>{formatNumber(item.amount)}</span>
              </div>
          )})}

          <div className='grid grid-cols-4 justify-items-center text-[#E04132] mt-5 pb-2'>
            <span className='col-span-2 font-bold text-2xl'>Total</span>
            <span className='font-bold text-3xl'>{totalQuantity}</span>
            <span className='font-bold text-3xl'>{formatNumber(totalAmount)}</span>
          </div>
          <PayButton/>
        </div>

        <div className='lg:hidden w-[290px] flex flex-col justify-center items-center shadow-xl rounded-xl gap-5 p-5'>
              <h1 className='text-2xl text-[#E04132] font-semibold'>Your Orders</h1>
              {cart.map((item)=>{
                  return (  
                  <div className='grid grid-cols-3 text-xs justify-self-center p-1 text-center w-full' key={item._id}>
                    <p className='w-full'>{item.name}</p>
                    <p className='w-full'>{formatNumber(item.price)}</p>
                    <p className='w-full'>{item.quantity} pcs</p>
                 </div>)
              })}
              
              <div className='flex flex-col justify-center items-center'>
                <p className='font-medium'>Total Amount</p>
                <span className='text-2xl font-semibold text-[#E04132]'>{formatNumber(totalAmount)}</span>
              </div>


            
        </div>


        </>  
    )
}

export default ProductCartSummary