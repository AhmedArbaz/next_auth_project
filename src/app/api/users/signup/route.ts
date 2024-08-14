// hamin hamasha api may route likhtay hain to routes kay liay folder ka jo bhi nam ho file route hi bany gi aur routes may : HAMASYA mongodb connect karna pary ga her route may express may ak bar karty thay ais may bar bar har route may karna hota hay signup,login ho sab ko connect karna hota hay aisi liay connection ka code ham nay ak folder may likha hay

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/user.models'
import { NextResponse, NextRequest } from 'next/server' //nextjs may asay req,res latay hain next server say imp kar kay 
import bcryptjs from 'bcryptjs' //ya install kia for hash password and its types also because of typescript
import { sendEmail } from '@/helpers/mailer'

connect()
// ab connect ho gaya ya route


//asay ham route banty hain yaha pay next.js may
export async function POST(request: NextRequest) {

    try {
        //hamin next.js may middleware nahi lany hoty hain aur body say kuch asay laty hain direct req.json()

        const reqBody = await request.json() //time lagy ga to await kara hay 
        const {username, email, password} = reqBody //ya ham nay destruction kar li
        //validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"},{status: 409});
        }

        //Hasing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

       const newUser = await new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        //Send varification email

        await sendEmail({email, emailType: 'VERIFY', userId: savedUser._id})

        return NextResponse.json({message: "User created successfully",status: 201,savedUser});

        

        
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
        //response asay laty hain import kia tha auper
        
    }
}
