import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { request } from "https";


//ya token ko extract karta hay method 

    export const getDtatFromToken = (req: NextRequest) => {
        try {

            const token = req.cookies.get("token")?.value || "";
            const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!)
            return decodedToken.id // ya id extract kar lia hay 
        } catch (error:any) {
            throw new Error(error.message)
        }
    }