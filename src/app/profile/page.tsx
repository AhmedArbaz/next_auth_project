"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import toast, { Toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';
import axios from 'axios';

//NOTE: yaha ham nay ak Link dia hay /profile/${data} jo kay add hota hay /profile/hamari id to asay to koi route hay hi nahi to ham dynamic route banin gay /prfile may forlder bano aur aus may [] square brackets may folder bain gay aus may page.tsx to profile/ jo bhi value ay vo aus route pay chaly jain gay jo [id] bani hay yaha nam kuch bhi day sakty hain [Ahmed] kuch bhi
export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("noting")

  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      console.log(res.data);
      setData(res.data.data._id);
    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
      
    }
  }

  //Logout function 
  const logout = async () => {
    try {
      await axios.get('/api/users/logout'); //ya route hit kia logout ho jay ga vo backend dakh lay ga 
      toast.success("Logout successfully");
      router.push('/login');

    } catch (error:any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white'>
      <h1>Profile page</h1>
      <hr/>
      <h2>{data === 'noting' ? "For Data Click on Get User Details" :<Link href={`/profile/${data}`} className='text-blue-500 underline'>{data}</Link>}</h2>
      {/*NOTE: ya jo link hay /profile/${data} ya /profile may hamri id ko add kar day ga aur phir page not found ay ga Q kay asa to koi page hay hi nahi to ham ak folder banin gay /profile may hi [] asay square brackets may ya dynamic route ho ga hamara  */}
      <hr />
      <button onClick={logout} className='bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
      <button onClick={getUserDetails} className='bg-orange-500 m-4 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>Get user Details</button>
    </div>
  )
}
