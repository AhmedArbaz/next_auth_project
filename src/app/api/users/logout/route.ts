// hamin hamasha api may route likhtay hain to routes kay liay folder ka jo bhi nam ho file route hi bany gi aur routes may : HAMASYA mongodb connect karna pary ga her route may express may ak bar karty thay ais may bar bar har route may karna hota hay signup,login ho sab ko connect karna hota hay aisi liay connection ka code ham nay ak folder may likha hay

import {connect} from '@/dbConfig/dbConfig'
import { NextResponse, NextRequest } from 'next/server' //nextjs may asay req,res latay hain next server say imp kar kay 




connect()
// ab connect ho gaya ya route

export async function GET(request:NextRequest){

    try {
        const responce = NextResponse.json({
            message:"Logout successfully",
            success:true
        })
        
        responce.cookies.set("token","",{
            httpOnly:true,
            expires:new Date(0)
        })

        return responce


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}