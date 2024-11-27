import { EventModel } from "../models/EventsModel.js";
import { GradesModel } from "../models/GradesModel.js";
import {GroupsModel} from "../models/GradesModel.js";




export default{
    createGrades: async (req,res)=> {
        try {
            const idGroup = req.params.idGroup;

            const group = await GroupsModel.findById(idGroup);
            if(!group){
                return res.status(400).json ({msj : "Grupo no encontrado."})
            }

            const round = req.body.round;
            if(!round){
                return res.status(400).json ({msj : "Ronda invalida."})
            }

            
            const idEvent = req.params.idEvent;
            const event = await EventModel.findById(idEvent)
            if(!event){
                return res.status(400).json ({msj : "Evento no encontrado."})
            }
        
            //validar que el equipo este validado al evento 

            if(!event.groups.includes(group._id)){
                return res.status(400).json({msj : "No hay correlacion entre el grupo y la base de datos"})
            }
            //calificaciones 
            //validar que la calificacion no exista 
            const gradesFromDb = await GradesModel.findOne({id_event:event._id, round, id_group:group._id})
            gradesFromDb.grades.filter((grade)=>{
                grade.id_judge == req.body.id_judge
            })
            

            const grades = req.body.grades;

        } catch (error) {
            
        }
    },
    changeRound = async(req, res)=>{
        try {
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if (!event) {
                return res.status(400).json({msg:"Evento no encontrado"})
            }
            const teamsPerRound = req.query.maxTeams ? req.query.maxTeams : 5;
            //Traer las calificaciones por grupo
            const {groups} = event;
            for (const group of groups) {
                const {gradesPerGroup} = await GradesModel.findById({idEvent: event._id, idGroup: event._id});
                //Calificar por metrica
                const average = grades.map((value,i,arreglo))=>{
                    
                }
            } 
        } catch (error) {
            return res.status(500).json({msg:"Error al cambiar la ronda"})
        }
    }
    
}