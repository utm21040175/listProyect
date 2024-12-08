import axios from "axios";
import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { IEvent, ITeams, IUser } from "../Types";
import { Card, CardBody, CardTitle, Table } from "react-bootstrap";

interface props{
    entity: "user"|"team"|"event"
}

export const ShowList = ({entity}: props)=>{

    const [data, setData] = useState([])

    useEffect (()=>{
        getData()
    },[]);


    const getData = async()=>{
        try {
            const {data} = await axios.get("http://localhost:4000/" + entity + "/list")
            setData(data);
        } catch (error) {
            console.log(error)
            Swal.fire("Opps ocurrio un error", "No se pudieron obtener los datos de la tabla", "error")
        }
    }

    const getColumns = ()=>{
        const userColumns = ["Nombre", "Correo", "CURP", "Rol"]
        const eventColumns = ["MNombre del  evento", "Cantidad de rondas"]
        const teamsColumns = ["Nombre del equipo", "Nombre del lider"]

        let columns = [];
        if(entity == "event"){
            columns = eventColumns;
        }else if(entity == "team"){
            columns = teamsColumns
        }else {
            columns = userColumns
        }

        const HTMLColumns = columns.map((c)=>(
            <th>{c}</th>
        ))
        return HTMLColumns;
    }

    const getName = ()=>{
        let name = "";
        if(entity == "event"){
            name = "eventos";
        }else if(entity == "team"){
            name = "equipos"
        }else {
            name = "usuarios"
        }
        return name;
    }
    
    return(
        <Card>
            <Card.Body>
                <Card.Title>Listado de {getName()}</Card.Title>
                <Table>
                    <thead>
                        {getColumns()}
                    </thead>
                    <tbody>
                        {
                            entity =="event"&&(
                                data.map((event:IEvent)=>(
                                    <tr>
                                        <td>{event.name}</td>
                                        <td>{event.maxRound}</td>
                                    </tr>
                                ))
                            ) || 
                            entity =="team"&&(
                                data.map((team:ITeams)=>(
                                    <tr>
                                        <td>{team.name}</td>
                                        <td>{team.leader}</td>
                                    </tr>
                                ))
                            )  || 
                            entity =="user"&&(
                                data.map((user:IUser)=>(
                                    <tr>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.CURP}</td>
                                        <td>{user.rol}</td>
                                    </tr>
                                ))
                            ) 
                        }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    )
}