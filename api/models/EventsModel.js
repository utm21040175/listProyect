import { Schema, Model } from "mongoose";

const EventSchema = new Schema ([
    {
        mettrics: [
            {
                description: {
                    type: String,
                    required : true
                }, 
                max_points :{
                    type: Number,
                    required : true
                }
            }

        ]
    },{
        round : {
            type: Numeber,
            required : true
        }
    },{
        status : {
            type : String,
            enum:["Pending", "Active", "Done"],
            lowercase: true,
            required : true
        }
    },{
        groups : []
    },
    {
        judges : []
    }
]);

export const EventModel = model("events", EventSchema);