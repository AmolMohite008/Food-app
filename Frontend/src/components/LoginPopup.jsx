import { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from "axios"
import { StoreContext } from '../context/StoreContext'


const LoginPopup = ({setshowlogin}) => {

  const {loggedInUser,setLoggedInUser ,url} = useContext(StoreContext)

     const [name, setname] = useState("")
     const [email, setemail] = useState("")
     const [password, setpassword] = useState("")

     

    const [currentstate, setcurrentstate] = useState('signup')

    const submithandler = async (e) =>{
      e.preventDefault();
      try{
        
     const formdata = currentstate === "signup" ?{name ,email ,password} :{email ,password}

    const response = await axios.post( currentstate === "signup" ? url + "/api/user/signup" : url + "/api/user/login", formdata,{ withCredentials: true });//withCredentials: true nahi likhoge → cookie save hi nahi hogi

      setLoggedInUser(response.data.data)

      // Close popup on success
      setshowlogin(false)
          
      // Clear form
      setname("");
      setemail("");
      setpassword("");

      } catch (error){
        console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
      }     
    }
  return (
     <div  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form onSubmit={submithandler}  className="bg-white w-[90%] flex flex-col  gap-6 max-w-md rounded-xl p-6 relative">
    
         <div className='flex items-center justify-between'>
            {currentstate === 'signup'? <h2 className='className=" text-2xl font-semibold capitalize"'>{currentstate}</h2 >:<h2 className='className=" text-2xl font-semibold capitalize"'>{currentstate}</h2>}
         
         <img className='cursor-pointer' onClick={() =>setshowlogin(false)} src={assets.cross_icon}/>
        </div>
        <div className='flex items-cente gap-6  flex-col  '>
            {currentstate=='signup'?<input value={name} onChange={(e) => setname(e.target.value)} type='text'className="border border-gray-300 rounded-md px-3 py-2 "  placeholder='your name 'required ></input> :<></> }
           
            <input  value={email}  onChange={(e) => setemail(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 " type='email' placeholder='Your email' required ></input>
            <input  value={password} onChange={(e) =>setpassword(e.target.value)} type='password'className="border border-gray-300 rounded-md px-3 py-2 "  placeholder='  Enter Password' required ></input>
        </div>
        <button type='submit' className="w-full active:scale-95 cursor-pointer bg-orange-500 text-white font-bold py-2 rounded-md mt-4 transition-all  ">{currentstate=='signup' ?'create account':'Login'}</button>
        <div className=''>{currentstate =='signup' ?<div className="flex justify-around gap-2 text-sm mt-3"><input className='cursor-pointer'  type='checkbox' required/><p>BY  continuing i agree to type terms of use & privacy policy</p> </div> :<></>}</div>   
        <div  >{currentstate == 'signup' ?<p className="text-md font-medium  "   >Already have an account ?<span className='ml-2 cursor-pointer text-orange-500' onClick={()=>setcurrentstate('login')} >Login heare</span> </p> :<p className="text-md font-medium  " >Create a new account ?<span className='ml-2 cursor-pointer text-orange-500'  onClick={()=>setcurrentstate('signup')}>Click here</span> </p>}</div>
       
      </form>
    </div>
  )
}

export default LoginPopup
