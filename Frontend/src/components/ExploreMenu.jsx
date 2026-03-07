import React from 'react'
import { menu_list } from '../assets/assets'

const ExploreMenu = ({ category, setcategory }) => {
  return (
    <div  id='explore' className='flex items-center p-2 flex-col'>
      
      <div className='flex w-[90%] flex-col'>
        <h1 className="text-3xl font-bold">Explore our menu</h1>
        <p className="text-gray-600 text-md leading-relaxed">
          Choose from a diverse menu feaature a delectable array of dishes crofted 
          with the finest ingredients and culinery experties . Our mission to is to 
          satisfy your craving and elevetred your dinning experinence , Once delicious 
          meal at a time
        </p>
      </div>

      <div className="flex gap-8 items-center overflow-x-auto px-4 py-4 w-[90%] scrollbar-hide">

        {menu_list.map((item,index) => {
          return (
            <div
              key={index}
              onClick={() => setcategory(prev => prev === item.menu_name ? "all" : item.menu_name)}
              className='flex gap-2 min-w-[120px] flex-col items-center justify-around cursor-pointer'
            >
              
              <img
                src={item.menu_image}
                className={category === item.menu_name ? "border-4 border-orange-500 rounded-full" : ""}
              />

              <p className={category === item.menu_name ? "text-orange-500 font-semibold" : ""}>
                {item.menu_name}
              </p>

            </div>
          )
        })}

      </div>
    </div>
  )
}

export default ExploreMenu
