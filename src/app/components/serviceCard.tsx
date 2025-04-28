import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

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
}

export const ServiceCard = ({service}: ServiceCardInputProps) => {
    const deleteService = (id: number) => {
      const response = confirm("Are you sure you want to delete this service?")
      if (response) {
        fetch(`http://localhost:8000/services/${id}`, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      }
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
        <IconButton onClick={() => deleteService(service.id)}>
            <DeleteIcon fontSize="large" color={"error"}></DeleteIcon>
        </IconButton>
        <CardMedia
          sx={{ height: 140 }}
          image={service.image_url}
          title={service.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {service.title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {service.description}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            ${service.price}
          </Typography>
        </CardContent>
      </Card>
    )
}

