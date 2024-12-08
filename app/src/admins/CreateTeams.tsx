import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import Swal from 'sweetalert2';


export const CreateTeam = () => {
    const emptyUser = {
        memberName: "", 
    };
    const [group, setGroup] = useState({
        name: "",
        id_members: [emptyUser],
        leader: "",
        round: 0,
        grades: [],
    });

    const addMember = () => {
        const data = group;
        data.id_members.push(emptyUser);
        setGroup({ ...data });
    };
    const removeMember = (i: number) => {
        const data = group;
        const membersFiltered = data.id_members.filter((_, index) => index !== i);
        data.id_members = membersFiltered;
        setGroup({ ...data });
    };

    const onChangeBasicFields = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const data: any = group;
        data[e.target.name] = e.target.value;
        setGroup({ ...data });
    };
    const onChangeMember = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
        e.preventDefault();
        const data: any = group;
        data.id_members[i] = { memberName: e.target.value }; 
        setGroup({ ...data });
    };

    const onSubmit = async () => {
        try {
            Swal.fire("Guardando grupo...");
            Swal.showLoading();
            await axios.post("http://localhost:4000/team/createTeam", group);
            Swal.fire("Grupo registrado con exitosamente", "", "success");
        } catch (error) {
            Swal.fire("Ocurrió un error al registrar al equipo", "", "error");
        }
    };
    return (
        <Container>
            <Card className="m-3">
                <Card.Body>
                    <Card.Title className="text-center">Crear Equipo </Card.Title>
                    <Form>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre del Equipo: </Form.Label>
                                    <Form.Control onChange={onChangeBasicFields} name="name" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Nombre del lider: </Form.Label>
                                    <Form.Control onChange={onChangeBasicFields} name="leader" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label>Ronda: </Form.Label>
                                    <Form.Control onChange={onChangeBasicFields} name="round" type="number" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Form.Group className="text-center">
                                <Form.Label>Participantes:</Form.Label>
                                {group.id_members.map((member, i) => (
                                    <Row className="mb-3" key={i}>
                                        <Col>
                                            <Form.Label>Participante {i + 1}</Form.Label>
                                            <Form.Control
                                                onChange={(e: any) => onChangeMember(e, i)}
                                                name="memberName"
                                                value={member.memberName}
                                            />
                                        </Col>
                                        {group.id_members.length > 1 && (
                                            <Col xs={1}>
                                                <Button onClick={() => removeMember(i)} variant="danger">
                                                    <Trash />
                                                </Button>
                                            </Col>
                                        )}
                                    </Row>
                                ))}
                                <div className="text-center">
                                    <Button variant="info" onClick={() => addMember()}>
                                        Agregar participante
                                    </Button>
                                </div>
                            </Form.Group>
                        </Row>
                        <hr />
                        <div className="text-center">
                            <Button onClick={() => onSubmit()}>Registrar Equipo</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};