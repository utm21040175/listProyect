import React, { Fragment , useState} from "react"
import { Container, FormControl, FormLabel , FormGroup, Form, CardBody, CardTitle, Card, Button} from "react-bootstrap"
import Swal from "sweetalert2";
import axios from "axios";

type IUser ={
    name: string,
    email : string,
    CURP: string,
    password: string,
    rol: string
}
export const RegisterParticipant = ()=>{

        const [data, setData] = useState<IUser>({
            name: "",
            email: "",
            CURP: "",
            password: "",
            rol: "participant"
        });
    
        const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            const tempoData: any = data
            tempoData[e.target.name] = e.target.value;
            setData(tempoData);
        }
        const onSumit = async()=>{
            try {
                Swal.fire("Guardando datos");
                Swal.showLoading()
                await axios.post("http://localhost:4000/user/register", data)
                Swal.fire("Datos validados con exito", "", "success");
            } catch (error: any) {
                Swal.fire("Algo salio mal", error.response.msg , "error")
            }
        }
    return(
        <Container>
            <Card>
                <Card.Body>
                    <CardTitle>Registro participante.</CardTitle>
                    <Form>
                            <Form.Group>
                                <Form.Label>Nombre:</Form.Label>
                                <FormControl name= "name" onChange={onChange}></FormControl>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Correo:</Form.Label>
                                <FormControl name = "email"onChange={onChange}></FormControl>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>CURP:</Form.Label>
                                <FormControl name = "CURP"onChange={onChange}></FormControl>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Contraseña:</Form.Label>
                                <FormControl name = "password"onChange={onChange}></FormControl>
                            </Form.Group>
                            <Button onClick={()=>onSumit()}>Registrate</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}