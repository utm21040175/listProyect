import { Schema, Model } from "mongoose";

const GroupsSchema = new Schema ([
    {
        name :{
            type : String,
            required : true
        }
    },{
        members : []
    },{
        lider : {
            type : Schema.Types.ObjectId,
            required : true
        }
    },{
        ronda : {
            type : Number,
            required : true
        }
    },{
        grades : []
    }
])