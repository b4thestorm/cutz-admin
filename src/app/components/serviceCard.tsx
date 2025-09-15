import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { properCase } from '../utils/utils';
import { KeyedMutator, mutate } from 'swr';
import { Button, Stack } from '@mui/material';

export interface serviceCardProps {
    id: number;
    title: string;
    description: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image_url: any;
    price: string;
}

export interface ServiceCardInputProps {
    service: serviceCardProps;
    deleteService: (id: number)=>void;
    mutate: KeyedMutator<void>;
}

export const ServiceCard = ({service, deleteService}: ServiceCardInputProps) => {
    const handleDelete = () => {
      const response = window.alert("Sure you want to delete this?")
      console.log(response)
      deleteService(service.id)
      mutate('services/')
    }
    return (
        <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={service.image_url}
          title={service.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {properCase(service.title)}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {service.description}
          </Typography>
          <br/>
          <Stack direction={"row"} spacing={5}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                <strong>${service.price}</strong>
              </Typography>
              <Button color="error" onClick={handleDelete}>
                Remove
              </Button>
          </Stack>
    
        </CardContent>
      </Card>
    )
}

