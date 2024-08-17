// hamin hamasha api may route likhtay hain to routes kay liay folder ka jo bhi nam ho file route hi bany gi aur routes may : HAMASYA mongodb connect karna pary ga her route may express may ak bar karty thay ais may bar bar har route may karna hota hay signup,login ho sab ko connect karna hota hay aisi liay connection ka code ham nay ak folder may likha hay

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.models'
import { NextResponse, NextRequest } from 'next/server' //nextjs may asay req,res latay hain next server say imp kar kay 
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'; //jwt install kia sath may ais ki types dependency bhi install ki typescript ki vaja say jwt ais liay kia Q kay ager login hay user to aus ko jwt to dana ho ga na 



connect()
// ab connect ho gaya ya route

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        //validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User not found"}, {status: 400})
        }
        
        console.log(user);

        //ya method bcrypt hi data hay kay compare karo vo ak str lata hay aur password 
       const validPassord = await bcryptjs.compare(password, user.password)

       if (!validPassord) {

        return NextResponse.json({error: "Invalid credentials"}, {status: 400})       
       }

    //    ager yaha tak a gay hain to user ko jwt dana ho ga 
       const tokenData = {
        id:user._id,
        username:user.username,
        email:user.email,
       }
       //ya data ususally kam rakhty hain Q kay bandwidth lata hay zada normally id latay hain 

       const token = jwt.sign(tokenData, process.env.JWT_SECRET! , {
        expiresIn: '1d'
       })

       //responce bhajnay ka new tarika return kay bina likha Q kay hamin cookie chiay thi nextjs khud hi cookie data hay package install ki need nahi hay 
       const responce = NextResponse.json({message:"Logged in successfully",success:true}, {status: 200})
 
       responce.cookies.set('token', token,{
        httpOnly: true,
       })
       return responce //yaha pay responce send kia hay ab user login ho gaya responce bhajny kay bad

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
