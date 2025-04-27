'use client'

import { Typography, Box, Container } from "@mui/material";
import {useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import {ServiceCard, serviceCardProps} from '../components/serviceCard';

export default function Services() {
    const [services, setServices] = useState<[serviceCardProps]>([{id: 2, title: "Light Caesar", description: "light top, light sides", price: "20.00", image_url: "/light_caesar.jpg"}])
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
    //add ability to delete services
    //add ability to update services

    return (
        <Container>
        <Box sx={{padding: 10, display: "flex", justifyContent: "space-between"}}>
        <Typography variant={"h2"}>Services</Typography>
        <IconButton onClick={() => setVisible(!visible)}>
            <AddIcon fontSize="large" color={"error"}></AddIcon>
        </IconButton>
        </Box>
        <Box>
            { services.length < 1 ? (
                <Typography>We have no Swag Yet</Typography>
            ) : (
                services.map(service => {
                    return <ServiceCard service={service} key={service.id}/>
                })
            )}
        </Box>
        </Container>
    )
}
