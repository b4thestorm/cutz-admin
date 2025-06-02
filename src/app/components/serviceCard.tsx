import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { KeyedMutator, mutate } from 'swr';

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
      deleteService(service.id)
      mutate('services/')
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
        <IconButton onClick={handleDelete}>
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

