import { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import Fooditem from './Fooditem'

const Fooddisplay = ({category}) => {

  const { food_list } = useContext(StoreContext)
//console.log(food_list.map(item => item._id))

  return (
    <div className='flex flex-col items-end' >
      <h1 className='text-2xl font-bold mb-4 mt-4 flex w-[90%] '>Top dishes near You</h1>
       <div className=' w-full flex flex-col items-center'>
          <div className='w-[90%] flex flex-wrap gap-6 justify-center'>
            {food_list.map((item ) => {
        
            if( category === "all" ||  category === item.category){
             return (  <Fooditem key={item._id}  id={item._id} name={item.name} description={item.description}  price={item.price} image={item.image} />  ) 
             }          
             })}

          </div>

       </div>
    
    </div>
  )
}

export default Fooddisplay
