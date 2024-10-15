import { Schema, Model } from "mongoose";

const GradesSchema = new Schema ([
    {
        id_groups : {
            type : Schema.Types.ObjectId,
            required : true
        }
    },{
        ronda : {
            type : Number,
            required : true
        }
    },{
        id_events : {
            type : Schema.Types.ObjectId,
            required : true
        }
    },{
        grades :[]
    }
])