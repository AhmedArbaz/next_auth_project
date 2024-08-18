import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.models'
import { NextResponse, NextRequest } from 'next/server' //nextjs may asay req,res latay hain next server say imp kar kay 
import { getDtatFromToken } from '@/helpers/getDtatFromToken';



connect()
// ab connect ho gaya ya route

export async function POST(request:NextRequest){

    //extract data from token
    const userId = await getDtatFromToken(request)
    const user = await User.findOne({_id:userId}).select("-password -username")

    //check if there is no user
    if(!user) return NextResponse.json({error:"No user found"}, {status: 400})
        
        //So yaha tak a gay to user ho ga to responce send karin gay 

    return NextResponse.json({
        message:"User found",
        data:user
    })
  
}