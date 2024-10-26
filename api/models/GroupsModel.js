import { Schema, Model } from "mongoose";

const TeamsSchema = new Schema ([
    {
        name :{
            type : String,
            required : true
        }
    },{
        is_members : []
    },{
        leader : {
            type : Schema.Types.ObjectId,
            required : true
        }
    },{
        round : {
            type : Number,
            default:0
        }
    },{
        grades : []
    }
])

export const TeamsModel = model("teams", TeamsSchema);