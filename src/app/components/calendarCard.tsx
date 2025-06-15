import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, Button} from '@mui/material/'


export const CalendarCard = () => {
    return (
        <Card sx={{ maxWidth: 345}}>
        <CardMedia
          sx={{ height: 140 , width: 140}}
          image={'/gmail_logo.png'}
          title={"gmail logo"}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Gmail is a free, web-based email service provided by Google that allows users to send, receive, and manage emails. 
          </Typography>
          <Button>
            Authorize
          </Button>
        </CardContent>
      </Card>
    )
}
