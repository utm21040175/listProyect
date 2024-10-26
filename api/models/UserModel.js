import { Schema, Model } from "mongoose";

const UserSchema = new Schema ([
    {
        name : {
            type : String,
            required : true
        }
    },{
        password : {
            type : String,
            required : true
        }
    },{
        email : {
            type : String,
            required : true
        }
    },{
        CURP : {
            type : String,
            required : true
        }
    },{
        rol : {
            type : String,
            enum:["Administrator", "Participant", "Judge"],
            lowercase: true,
            required : true
        }
    }
])

export const UserModel = model("user", UserSchema);