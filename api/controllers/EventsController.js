import { EventModel } from "../models/EventsModel";


export default {
    createEvent: async (req,res)=>{
        try {
            //validar que sea un array
            if (!Array.isArray(req.body.metrics)) {
                return res.status(400).json({msj: "Metricas no es un arreglo"})
            }
            //validar si tiene al menos una metrica
            if (!(req.body.metrics.length > 0)){
                return res.status(400).json({msj: "Metricas viene vacio"})
            }
            //validar los dos campos 
            const incompleteMetrics = req.body.metrics.filter((metrics)=> (!metrics.description ) || (!metrics.maxPoints))
            if(incompleteMetrics.length > 0){
                return res.status(400).json({msj :"Alguna de las metricas esta incompleta"})
            }

            const invalidMetrics = req.body.metrics.filter((metrics)=> (metrics.description.length === 0 ) || (metrics.maxPoints === 0))
            if(invalidMetrics.length > 0){
                return res.status(400).json({msj :"Alguna de las metricas es invalida"})
            }
            const event = {
                name :req.body.name,
                metrics : req.body.metrics,
                maxRound: req.body.maxRound
            }

            await EventModel.create(event);
             return res.status(200).json({msj : "Evento creado con exito"})
        } catch (error) {
            console.log(error)
            return res.status(500).json({msg : "El evento no fue registrado correctamente"});
        }
        
    }
}