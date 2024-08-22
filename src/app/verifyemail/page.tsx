"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    //next js ko use kar kay url say data nikalin gay abhi ham nay js ka use kia tha window.location.search k andar say
// const router = useRouter();

    const verifyUserEmail = async () =>{
       try {
         await axios.post("/api/users/verifyemail",{token}) //ya post request khud kar lay ga
         setVerified(true)
         setError(false)
       } catch (error:any) {
        setError(true)
        console.log(error.response.data);
       }
    }

    //ya useEffect only component as soon as mount ho tab hi chaly varna nahi 
    useEffect(() => {
        //NOTE: (window.location.search) ais ka matlab hay window may jo search bar hay vo select ho gi
       const urlToken = window.location.search.split("=")[1] 
       setToken(urlToken || "")

       //by next js on place of js jo ham nay way auper kia hay vo js ka hay lakin hamin next.js say karna hay 
    //    const {query} = router;
    //    const urlTokenTwo = query.token
       //ya ham nay next.js ki help say url say data lay lia 

    }, []);

    //ya tab chaly ga jab token may changes ho rahay hon to token ak bar to run ho ga 
    useEffect(() => {
    if(token.length >0 ){
        verifyUserEmail()
    }
    },[token])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black text-white'>
        <h1 className=' text-4xl text-white'>Verify Email</h1>
        <h2 className='p-2 bg-orange-500 text-black rounded-lg my-2'>
            {token ? `${token}`:"No Token"}
        </h2>
      {verified &&(
        <div>
            <h2 className='text-white'>Verified</h2>
            <Link href="/login" className='bg-blue-600 underline text-white'>Login</Link>
        </div>
      )}
      {error &&(
        <div>
            <h2>Error</h2>
            
        </div>
      )}
    </div>
  )
}
