// hamin hamasha api may route likhtay hain to routes kay liay folder ka jo bhi nam ho file route hi bany gi aur routes may : HAMASYA mongodb connect karna pary ga her route may express may ak bar karty thay ais may bar bar har route may karna hota hay signup,login ho sab ko connect karna hota hay aisi liay connection ka code ham nay ak folder may likha hay

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.models'
import { NextResponse, NextRequest } from 'next/server' //nextjs may asay req,res latay hain next server say imp kar kay 

connect()
// ab connect ho gaya ya route

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {token} = reqBody //token ko destructure kar lia hai
        console.log(token);

        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}})
            //ya $gt ka matlab greater then to ais ka matlab hoa kay jab vo verify kar raha hay aus ki date say aur jab mail kia tha aus then date ka difference kahin khatam to nahi ho gaya token
       
            if(!user){
                return NextResponse.json({error: "User not found"}, {status: 400})
            }

            console.log(user);

            // ager yaha tak a gay to user ho ga signup to ham kuch cheezen set karin gay kay tokens undifined kar diay aur isVerified ko ture kar dia 
            user.isVerified = true; //ya bhi model may banaya tha 
            user.verifyToken = undefined;
            user.verifyTokenExpiry = undefined;

            await user.save()
            return NextResponse.json({message: "User verified successfully",success:true}, {status: 200})
            
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}