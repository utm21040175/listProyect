import { ShowList } from '../components/ShowList'
import { Container } from 'react-bootstrap'

export const ListUsers = ()=>{
    return(
        <Container>
                <ShowList entity="user"/>
        </Container>
    )
}