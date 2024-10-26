//crear teams
//inscribirse al evento

import { EventModel } from "../models/EventsModel";
import {GroupsModel, TeamsModel} from "../models/GroupsModel"

export default{
    createTeam: async (req,res)=>{
        try {
            const team = {
                name: req.body.name,
                id_members : req.body.id_members,
                leader: req.body.id_leader
            };
            await GroupsModel.create(team);
            return res.tatus(200).json({msg: "Grupo creado con exito"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msj: "Ocurrio un error"})
        }
    },
    registerEvent : async (req,res)=>{
        try {
            const idGroup = req.params.id;
            const group = await TeamsModel.findById(idGroup)
            if(!group){
                return res.status(400).json({msj : "El equipo no existe"})
            }
            const idEvent = re.params.id_event;
            const event = await EventModel.findById(idEvent)
            if(!event){
                return res.status(400).json({msj : "El evento no existe"})
            }
            //Registrar al equipo 
            await EventModel.findByIdAndUpdate(idEvent, {
                $push:{
                    "groups": idGroup
                }
            })
            return res.status(200).json({msj: "El equipo se inscribio con exito "})
        } catch (error) {
            console.log(error)
            res.status(500).json({msg : "El equipo no fue registrado correctamente"});
        }
    }
}