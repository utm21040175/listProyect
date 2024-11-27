import { Schema, model } from "mongoose";

const TeamsSchema = new Schema ([
    {
        name :{
            type : String,
            required : true
        }
    },{
        id_members : []
    },{
        id_leader : {
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

export const GroupsModel = model("groups", TeamsSchema);