import { EventModel } from "../models/EventsModel.js";
import { GroupsModel } from "../models/GroupsModel.js";
import { GradesModel} from "../models/GradesModel.js"

const validateEvent = (metrics, name, maxRound) => {
    const data = {
        idValid: false,
        msg: ""
    }
    //validar que sea un array
    if (!Array.isArray(metrics)) {
        data.msj = "Metricas no es un arreglo "
        return data
    }
    //validar si tiene al menos una metrica
    if (!(metrics.length > 0)) {
        data.msj = "Metricas viene vacio"
        return data
    }
    //validar los dos campos 
    const incompleteMetrics = metrics.filter((metrics) => (!metrics.description) || (!metrics.max_points))
    if (incompleteMetrics.length > 0) {
        data.msj = "Alguna de las metricas esta incompleta"
        return data
    }

    const invalidMetrics = metrics.filter((metrics) => (metrics.description.length === 0) || (metrics.max_points === 0))
    if (invalidMetrics.length > 0) {
        data.msj = "Alguna de las metricas es invalida"
        return data
    }

    if (!name && !name.length) {
        data.msj = "El nombre del equipo esta vacio"
        return data
    }

    if (!req.body.maxRound) {
        data.msj = "Numero de rondas invalido"
        return data
    }
    //si no se cumplen es valido 
    data.isValid = true;
    return data
}

export default {
    createEvent: async (req, res) => {
        try {
            //desestructurar
            const { metrics, name, maxRound } = req.body
            const { isValid, msj } = validateEvent(metrics, name, maxRound)
            if (!isValid) {
                return res.status(400).json({ msj })
            }
            const event = {
                name: req.body.name,
                metrics: req.body.metrics,
                maxRound: req.body.maxRound
            }

            await EventModel.create(event);
            return res.status(200).json({ msj: "Evento creado con exito" })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "El evento no fue registrado correctamente" });
        }

    },
    updateEvent: async (req, res) => {
        const idEvent = req.params.id;
        const event = await EventModel.findById(idEvent)

        if (!event) {
            return res.status(400).json({ msj: "El evento no existe" })
        }

        const { metrics, name, maxRound } = req.body
        const { isValid, msj } = validateEvent(metrics, name, maxRound)
        if (!isValid) {
            return res.status(400).json({ msj })
        }
        await EventModel, findByIdAndUpdate(idEvent, {
            $set: {
                metrics,
                name,
                maxRound
            }
        })
    },
    changeStatus: async (req, res) => {
        const idEvent = req.params.id;
        const event = await EventModel.findById(idEvent)
        if (!event) {
            return res.status(400).json({ msj: "Evento no encontrado" });

        }
        if (!["pending", "active", "done"].includes(req.body.status.toLowerCase())) {
            return res.status(400).json({ msj: "El status que envias no es aceptable" })
        }
        await EventModel.findByIdAndUpdate(idEvent, {
            $set: {
                status: req.body.status
            }
        })
        return res.status(200).json({ msj: "se actualizo el status" })
    },
    changeRound: async (req, res) => {
        try{
            const idEvent = req.params.id;
            const event = await EventModel.findById(idEvent);
            if(!event){
                return res.status(400).json({msg:"Evento no encontrado"})
            }
            const teamsPerRound = req.query.maxTeams ? req.query.maxTeams : 5;
            //1. Traer calificaciones por grupo
            const { groups } = event;
            const teamWithFinalGrade = [];
            for(const group of groups){
                const gradesPerMetric = [];
                //Aqui tenemos calificacion por grupo
                const { grades } = await GradesModel.findOne({id_event:event._id, id_group: group});
                //2. Promediar por metrica
                const alreadyChecked = [];
                for(const grade of grades){
                    const filteredGrades = grades.filter(item=>
                    grade.id_metric === item.id_metric && !alreadyChecked.includes(grade.id_metric))
                    console.log(filteredGrades)
                    let gradesPerMetric = 0
                    if(filteredGrades.length > 0 ){
                        gradesPerMetric = filteredGrades.reduce((a,b)=>a.grade + b.grade);
                    }
                    if (!alreadyChecked.includes(grade.id_metric)){
                        alreadyChecked.push(filteredGrades[0].id_metric)
                        gradesPerMetric.push({
                            id_metric : grade.id_metric,
                            grade: gradePerMetric /filteredGrades.length //PARA SACAR EL PROMEDIO POR METRICA 
                        })
                    }
                }
                    //3. Promedio final
                const finalGrade = gradesPerMetric.reduce((a,b)=> a.grade + b.grade) / gradesPerMetric.length //PROMEDIO GENERAL DE LAS METRICAS 
                            //4.1 Crear arreglo de promedios finales
                teamWithFinalGrade.push({
                    idTeam: group,
                    finalGrade,
                    gradesPerMetric
                })
            }                
            //4. Ordenar de mayor a menor(COMO?)
                    teamWithFinalGrade.sort((a, b)=> a - b);
            //5. Tomar solo la cantidad de maximo de puntos
                const passedTeams = sortedTeams.slice(0 , teamsPerRound)
            //actualizar la ronda de los equipos y calificaciones 
            for(const team of passedTeams){
                await GroupsModel.findByIdAndUpdate(team.idTeam,{
                    $set: {
                        round : req.body.round,
                        grades : []
                    }
                });
            }
            //actualizar el arreglo de equipos en los eventos
            const nextTeams = passedTeams.map((i)=>i.idTeam); //elige quien pasa a la siguente ronda 
            await EventModel.findByIdAndUpdate(event._id,{
                $set:{
                    groups: nextTeams, //actualizar la ronda a los equipos
                    round: req.body.round //actualiza la ronda del evento 
                }
            })
            return res.json({msj: "Cambio la ronda con exito"})
        } catch(error){
            return res.status(500).json({msg:"Error al cambiar de ronda"})
        }
    }
}
