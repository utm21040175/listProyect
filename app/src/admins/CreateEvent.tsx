import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import axios from "axios";



export const CreateEvent = () => {
  const [Values, setValues] = useState<{ //estado inicial con un array de objetos con los parametros necesarios
    description: string, max_points: number | null }[]>([{ description: "", max_points: null }]);

  // Función para actualizar el nuevo estado
  const addInput = () => {
    setValues([...Values, { description: "", max_points: null }]);
  };

  // Función para manejar el cambio en un input
  const createEvent = (index: number, name: string, value: string) => {
    const lastValues = [...Values];
    if (name === "description") {
      lastValues[index].description = value;
    } else if (name === "max_points") {
      lastValues[index].max_points = value ? parseInt(value) : null;
    }
    setValues(lastValues);
  };
  //funcion para subir a la base de datos la informacion
  const onSumit = async()=>{
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading()
            await axios.post("http://localhost:4000/event/createEvent", Values)
            Swal.fire("Datos validados con exito", "", "success");
        } catch (error: any) {
            Swal.fire("Algo salio mal", error.response.msg , "error")
        }
    }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Crear Evento</Card.Title>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Título del evento</Form.Label>
                  <Form.Control name="title" />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Número de rondas</Form.Label>
                  <Form.Control name="rounds" />
                </Form.Group>
              </Col>
            </Row>
            <Card.Subtitle className="text-center mt-4 mb-3">Métricas</Card.Subtitle>
            {Values.map((value, i) => (
              <div key={i} className="mb-3">
                <Form.Group>
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    name="description"
                    value={value.description}
                    onChange={(e) => createEvent(i, e.target.name, e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Calificación máxima</Form.Label>
                  <Form.Control
                    name="max_points"
                    type="number"
                    value={value.max_points ?? ""}
                    onChange={(e) => createEvent(i, e.target.name, e.target.value)}
                  />
                </Form.Group>
              </div>
            ))}
            <Row className="text-center">
              <Col>
                <Button className="m-3" onClick={addInput}>Añadir Métrica</Button>
              </Col>
            </Row>
            <Row className="text-center">
              <Col>
                <Button className="m-3" onSubmit={()=>onSumit()}>Crear evento</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
