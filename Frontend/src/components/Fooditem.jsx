import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'

const Fooditem = ({ id, name, price, description, image }) => {

  

  const {addToCart ,removecart ,cartitem ,url} = useContext(StoreContext)

  return (
    <div className='w-[220px] flex flex-col border rounded-xl overflow-hidden shadow-2xl'>

      {/* Image */}
      <div className='w-full h-[160px]'>
      <img src={url + "/uploads/" + image} alt="food" className='w-full h-full object-cover' />
      </div>

      {/* Content */}
      <div className='p-3 flex flex-col gap-2'>

        <div className='flex justify-between items-center'>
          <p className='font-semibold text-sm'>{name}</p>
          <img src={assets.rating_starts} className='w-16' />
        </div>

        <p className='text-xs text-gray-500'>{description}</p>

        <div className='flex justify-between items-center mt-1'>
          <span className='font-bold text-sm  text-orange-400'>₹ {price}</span>
          { !cartitem[id] ? ( <button onClick={() => addToCart(id)} className='border rounded-md  px-2 py-0.5 text-md'>Add </button>) :(<div className='border flex items-center  gap-2 rounded-md px-2 py-0.5 text-xs'> 
             {/* Minus */}
      <button
        onClick={() => removecart(id)}
        className="w-6 h-6  flex items-center justify-center rounded-full bg-red-400 text-white text-xl font-bold leading-[0] hover:bg-red-500 active:scale-95 transition"
      >
        −
      </button>
            <span className='font-bold text-[14px]' >{cartitem[id]}</span>
           {/* Plus */}
      <button
        onClick={() => addToCart(id)}
        className="w-6 h-6 flex  items-center justify-center rounded-full bg-green-400 text-white text-xl font-bold leading-[0] hover:bg-green-500 active:scale-95 transition"
      >
        +
      </button>
            </div>) }
        </div>

      </div>

    </div>
  )
}

export default Fooditem
