'use client'

import { Typography, Box, Container } from "@mui/material";
import {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

export default function Services() {
    const [services, setServices] = useState([])
    const [visible, setVisible] = useState(false)
    
    const getServices = async () => {
        //pull services from the api for the barber
        const response = await fetch('http://localhost:8000/services/', {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        setServices(data.json())
    }
    
    console.log(services)

    useEffect(()=> {
        getServices()
    }, [])

    //add a button to this page to bring up a dialog form to make a new service
    
    //add ability to delete services
    //add ability to update services

    return (
        <Container>
        <Typography>Services</Typography>
        <IconButton onClick={() => setVisible(!visible)}>
            <AddIcon fontSize="large" color={"error"}></AddIcon>
        </IconButton>
        <Box>
            {/* //if no services display a empty services message       */}
            <Typography>We have no Swag Yet</Typography>
                {/* // ) : (
                //     //display a list of service cards
                //     services.map(service => {
                //         return (<ServiceCard service={service}></ServiceCard>)
                //     })
                ) */}

        </Box>
        </Container>
    )
}
