import React from 'react'
import { ShowList } from '../components/ShowList'
import { Container } from 'react-bootstrap'

export const ListEvent = ()=>{
    return(
        <Container>
                <ShowList entity="event"></ShowList>
        </Container>
    )
}