import { Container, Card, Row , Col, Form, Button} from "react-bootstrap"

export const Login = () =>{
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Card.Title>Bienvenido! Inicia sesion</Card.Title>

                    <Row>
                        <Col>
                            <Form.Control/>
                            <Form.Control/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button>Ingresa</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            ¿Olvidaste tu contraseña? Recuperala <a>aquí</a>
                        </Col>
                        <Col>
                            ¿Todavía no tienes cuenta? Registrate <a>aquí</a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}