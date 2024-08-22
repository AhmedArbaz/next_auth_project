"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const Login = () => {

  const router = useRouter();
  const [user,setUser] = useState({
    email:"",
    password:"",
  })

  //ya state ais liay bani ky jab tak user auper vali fields fill nahi karay ga to ham button disable kar dain gay
  const [buttonDisabled, setButtonDisabled] = useState(true)

//loading kay liay 
  const [loading, setLoading] = useState(false);

  const onLogin = async () =>{
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login",user);
      console.log("Login successful",response.data);
      router.push("/profile"); //ya ham redirect kar rahy hain user ko
      

    } catch (error:any) {
      console.log("Login failed");
      toast.error(error.message) //ya install kia error kay liay 
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false) //to jo ham nay useState bani thi aus ko change kia hay 
    }  
    else{
      setButtonDisabled(true)
    }
  
  }, [user]); //ya ham nay dependency array day dia kay user may koi changes hon to page reload karo

  return (
    <div className='flex flex-col justify-center items-center h-[100vh] bg-black text-white'>
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />
      <label htmlFor="username">username</label> 

      <hr />
      <label htmlFor="email">Email</label> 
      <input 
      type="email" 
      name="email" 
      id="email" 
      className='p-2 border border-gray-300 mb-4 focous:outline-none focous:border-blue-600 rounded-lg text-black' 
      value={user.email} 
      onChange={(e) => setUser({...user,email:e.target.value})} 
      //NOTE ya user ko destructure kia ...user say aur phir bola only username may hi  change karin gay ham to e.target.value
      placeholder="email" />

      
<hr />
      <label htmlFor="password">Password</label> 
      <input 
      type="password" 
      name="password" 
      id="password" 
      className='p-2 border border-gray-300 mb-4 focous:outline-none focous:border-blue-600 rounded-lg text-black' 
      value={user.password} 
      onChange={(e) => setUser({...user,password:e.target.value})} 
      //NOTE ya user ko destructure kia ...user say aur phir bola only username may hi  change karin gay ham to e.target.value
      placeholder="password" />

      <button className=' bg-slate-800  p-2 m-2 rounded-lg font-bold' onClick={onLogin}>
        {buttonDisabled?"Please fill the form":"Login"}
      </button>
    <Link href="/signup" className='text-blue-600 underline'>Visit Signup page</Link>
    </div>
    
  )
}

export default Login
