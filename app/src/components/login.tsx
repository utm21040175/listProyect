import { ReactEventHandler, useState } from "react"
import { Container, Card, Row, Col, Form, Button, FormGroup, FormLabel } from "react-bootstrap"
import Swal from "sweetalert2"
import axios, {AxiosError} from "axios"
import { useNavigate } from "react-router-dom"


type TLoginData ={
    email: string,
    password : string
}
export const Login = () => {
    const [data, setData] = useState<any>({});
    const navigate = useNavigate()
    const onChange = (e:any)=>{
        e.preventDefault()
        const tempoData: any = data
        tempoData[e.target.name] = e.target.value;
        setData(tempoData);
    }
    const onSumit = async()=>{
        try {
            Swal.fire("Guardando datos");
            Swal.showLoading()
            await axios.post("http://localhost:4000/user/login", data)
            Swal.fire("Datos validados con exito", "", "success").then(()=>navigate("/home"))
        } catch (error: any) {
            Swal.fire("Algo salio mal", error.response.msg , "error")
        }

    }
    return (
        <Container>
            <Card style={{ width: "30rem", margin: "auto" }} className="mt-3">
                <Card.Body>
                    <Card.Title className="text-center">Bienvenido! Inicia sesion</Card.Title>

                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <Form.Control className="mb-3" name="email" onChange={onChange}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>contraseña:</Form.Label>
                                <Form.Control type="password  "className="mb-3"  name="password" onChange={onChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Button className="m-3" onClick={()=> onSumit()}>Ingresa</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            ¿Olvidaste tu contraseña? Recuperala <a href="/"> aquí</a>
                        </Col>
                        <Col>
                            ¿Todavía no tienes cuenta? Registrate <a href="/register">aquí</a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    )
}