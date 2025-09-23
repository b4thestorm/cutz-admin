'use client'
import useSWR from 'swr'
import { Typography, Box, Button, Grid, Container } from "@mui/material";
import {useState} from 'react';
import { BASE_URL } from '../utils/utils';
import {ServiceCard, serviceCardProps} from '../components/serviceCard';
import { ServiceFormDialog } from "../components/serviceForm";


export default function Services() {
    const [visible, setVisible] = useState(false)

    const getServices = (path: string): Promise<any> => {
        return fetch(`${BASE_URL}/${path}`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                'Content-Type': 'application/json',
            },
        }).then((resp) => {
            return resp.json()
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const deleteService = (id: number) => {
        const response = confirm("Are you sure you want to delete this service?")
        if (response) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          fetch(`${BASE_URL}/services/${id}`, {
          method: "DELETE",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }
        })
        }
    }
    const displayServices = (services: any) => {
        if (!services) {
            return  <Typography>We have no Swag Yet</Typography>
        } else {
            return (
                 <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 1, sm: 8, md: 12 }}>
                    {services?.map((service: serviceCardProps, index: string) => (
                    <Grid key={index} size={{ xs: 1, sm: 4, md: 4 }}>
                        <ServiceCard service={service} key={service.id} deleteService={deleteService}/>
                    </Grid>
                    ))}
                </Grid>
            )
        }
    }

    let { data: services, mutate,  isLoading } = useSWR('services/', getServices, {revalidateOnFocus: true});
    return (
        <Container>
        <Box sx={{justifySelf: "flex-end", alignSelf: "justify", marginTop: "10px"}}>
            <Button variant="contained" sx={{backgroundColor: "#E9B949"}} onClick={() => setVisible(!visible)}>Add Service</Button>
        </Box> 
        <Box sx={{display: "flex", justifyContent: "space-around", marginTop: "10px"}}>
        <Box>
            {isLoading ? (
                <Typography>We have no Swag Yet</Typography>
            ) : (
               displayServices(services)
            )}
        </Box>
        </Box>   
        <ServiceFormDialog visibility={visible} setVisible={setVisible} mutate={mutate}/>
        </Container>
    )
}
