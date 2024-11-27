import React, { Fragment, useState } from "react"
import { Container, FormControl, FormLabel, FormGroup, Form, CardBody, CardTitle, Card, Button } from "react-bootstrap"
import Swal from "sweetalert2";
import axios from "axios";

type IEvent = {
    name: string,
    metrics: [{ description: string, max_points: number }],
    maxRound: number
}
export const CreateEvent = () => {

    const [data, setData] = useState<IEvent>({
        name: "",
        metrics: [{
            description: "",
            max_points: 0,
        }],
        maxRound: 0
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const tempoData: any = data
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    }
    const onSumit = async () => {
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading()
            await axios.post("http://localhost:4000/event/createEvent", data)
            Swal.fire("Datos validados con exito", "", "success");
        } catch (error: any) {
            Swal.fire("Algo salio mal", error.response.msg, "error")
        }
    }
        
    return (
        <Container>
            <Card>
                <Card.Body>
                    <CardTitle>Crear evento.</CardTitle>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre:</Form.Label>
                            <FormControl name="name" onChange={onChange}></FormControl>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Numero de rondas:</Form.Label>
                            <FormControl name="email" onChange={onChange}></FormControl>
                        </Form.Group>
                    </Form>
                    <br></br>
                    <Card>
                        <Card.Body>
                            <Form>
                                <Card.Title>Metrics: </Card.Title>
                                <Form.Group>
                                    <Form.Label>Descripcion: </Form.Label>
                                    <FormControl name="description" onChange={onChange}></FormControl>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Maximo de puntos: </Form.Label>
                                    <FormControl name="max_points" onChange={onChange}></FormControl>
                                </Form.Group>
                                <Button>Añadir metrica</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Button onClick={() => onSumit()}>Registrate</Button>
                </Card.Body>
            </Card>
        </Container>
    )
}