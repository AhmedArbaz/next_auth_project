//profile vali file may ham nay Link dia jo kay /profile/${data} tha to asa to koi route hay hi nahi hamara Q ky data may hamari _id a rahi thi to ham nay aisi folder may naya route/folder banaya [] square brackets may jo kay [id] kay name say bana nam kuch bhi day do ais file ais may file bana di ab aisay handle karin gay

//NOTE: profile/ jo bhi ay vo ais route may handle ho jay ga yaha a jay ga ya hota hay dynamic route
import React from 'react'

export default function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-black text-white py-2'>
      <h1>Profile page</h1>
      <h2 className=' p-3 bg-orange-500  rounded-lg'>{params.id}</h2>
      {/*NOTE: jo bhi ap nay [] may name dia hay vohi yaha likh do to ap jo bhi /profile/ anyting vo yaha show ho jay ga  */}
    </div>
  )
}
