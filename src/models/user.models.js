import { verify } from "crypto";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});

// Export in nextjs 
// next js ko pata nahi hota hay kay kia model phalay bana hay ya nahi to hamin kuch asay export karna hota hay 
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User

// ya line ya kar rhi hay kay phaly models likha hay to jitny model hain aun may users dhoondy ga phir nahi mila to bana day ga