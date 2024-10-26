import { Schema, Model } from "mongoose";

const EventSchema = new Schema ([
    {
        name :{
            type: String,
            required: true
        }
    },{
        metrics: [
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
        maxRound : {
            type: Numeber,
            required : true
        }
    },{
        round : {
            type: Numeber,
            default: 0
        }
    },{
        status : {
            type : String,
            enum:["Pending", "Active", "Done"],
            lowercase: true,
            default: "Pending"
        }
    },{
        groups : []
    },
    {
        judges : []
    }
]);

export const EventModel = model("events", EventSchema);