import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
    return (
        <Card sx={{ maxWidth: 345 }}>
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

