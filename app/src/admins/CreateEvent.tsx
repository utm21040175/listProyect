import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Row , FormGroup} from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Swal from "sweetalert2";
import axios from "axios";
import { IEvent } from '../Types';



export const CreateEvent = () => {
    const emptyMetric = {
        description: "",
        max_points: 0
    }
    const [event, setEvent] = useState<IEvent>({
        name: "",
        maxRound: 0,
        metrics: [emptyMetric]
    })

    const onChangeBasic = (e: React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        const data: any = event;
        data[e.target.name] = e.target.value
        setEvent({...data})
    }

    const onChangeMetric = (e: React.ChangeEvent<HTMLInputElement>, i:number)=>{
        e.preventDefault();
        const data: any = event;
        data.metrics[i][e.target.name] = e.target.value
        setEvent({...data})
    }

    const addMetric = () => {
        const data = event;
        data.metrics.push(emptyMetric);
        setEvent({ ...data })
    }
    const removeMetric = (iM:Number)=>{
        const data = event;
        const metcicsFiltered = data.metrics.filter((_metric, i)=> i!=iM)
        data.metrics = metcicsFiltered;
        setEvent({...data})
    }

    const onSumbit = async ()=>{
        try {
            Swal.fire("Guardando evento")
            Swal.showLoading()
            await axios.post("http://localhost:4000/event/createEvent", event)
            Swal.fire("Evento registrado con exito", "", "success")
        } catch (error) {
            console.log(error)
            Swal.fire("Ocurrio un error", "", "error")
        }
    }
    return (
        <Container>
            <Card className='m-3'>
                <Card.Body>
                    <Card.Title>Crear evento</Card.Title>
                    <Form>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Titulo del evento</Form.Label>
                                    <Form.Control name="title" onChange={onChangeBasic}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Numero de rondas</Form.Label>
                                    <Form.Control name="maxRound" type='number' onChange={onChangeBasic}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className='text-center'>
                                <Form.Label>Metricas:</Form.Label>
                                {
                                    event.metrics.map((metric, i) => (
                                        <Row className='mb-3' key={i}>
                                            <Col>
                                                <Form.Label>Descripción:</Form.Label>
                                                <Form.Control name="description" onChange={(e:any)=>onChangeMetric(e, i)}/>
                                            </Col>
                                            <Col>
                                                <Form.Label>Calificación maxima:</Form.Label>
                                                <Form.Control type='number' name="max_points" onChange={(e:any)=>onChangeMetric(e, i)}/>
                                            </Col>
                                            {
                                                event.metrics.length > 1 &&(
                                                    <Col xs={1}>
                                                        <Button variant='danger' onClick={()=>removeMetric(i)}><Trash></Trash></Button>
                                                    </Col>
                                                ) 
                                            }
                                           
                                        </Row>
                                    ))
                                }
                                <div className='text-center'>
                                    <Button variant='info' onClick={() => addMetric()}>Agregar metrica</Button>
                                </div>
                            </Form.Group>
                        </Row>
                        <hr></hr>
                        <div className='text-center'>
                            <Button onClick={()=>onSumbit()}>Guardar evento</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}