import * as React from 'react';
import {Card, CardContent, CardMedia, Typography, Button} from '@mui/material/'
import { BASE_URL } from '../utils/utils';


export const CalendarCard = () => {
    const handleAuth = () => {
      fetch(`${BASE_URL}/gcal_int`, {
        credentials: 'include',
        method: 'GET',
      }
      )
    }
    return (
        <Card sx={{ maxWidth: 345}}>
        <CardMedia
          sx={{ height: 140 , width: 140}}
          image={'/gcal_logo.png'}
          title={"gmail logo"}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Gmail is a free, web-based email service provided by Google that allows users to send, receive, and manage emails. 
          </Typography>
          <Button onClick={handleAuth}>
            Authorize
          </Button>
        </CardContent>
      </Card>
    )
}
