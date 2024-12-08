import React from 'react'
import { ShowList } from '../components/ShowList'
import { Container } from 'react-bootstrap'

export const ListTeams = ()=>{
    return(
        <Container>
                <ShowList entity="team"></ShowList>
        </Container>
    )
}