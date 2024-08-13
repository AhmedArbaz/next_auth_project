import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        //to ya error day raha tha ham nay ! ya lagya error khatam how  Q kay typescript use kar rahy ho to aus nay pucha kay str ay ga bhi ya nahi to ham nay ! ya lagaya jis ka matlab hay ham nay bola bhai ay ga hamin pata hay 

        //ya phir ya karty kay auper ak var may process.env.MONGO_URI k andar store kar kay if else say check karty na ay str to hamri str day do ya 2 way hain karny kay 

        const connection = mongoose.connection;  //ya ham next js may use karty hain kay connection na hoa to ager ho gaya to ab connection may bhot saray events a gay hain

        connection.on("connected",()=>{
            console.log("MongoDB is connected successfully");
        })

        //error kay liay bhi
        connection.on("error",(error)=>{
            console.log("MongoDB is not connected",error);
            process.exit();
        })


        console.log('Connected to DB');
    } catch (error) {
        console.log('Something went wrong in Connecting to DB', error);
        console.log(error);
        
        
    }
}