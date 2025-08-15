'use client'
import {useState, useEffect} from 'react';
import {Card, CardContent, CardMedia, Typography, Button} from '@mui/material'
import { BASE_URL} from '../utils/utils';


export const CalendarCard = ({isEnabled, setIsEnabled}: {isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;}) => {

  const handleAuth = async () => { 
    fetch(`${BASE_URL}/integrations/gcal_init/`, {
      credentials: 'include',
      method: 'GET',
    })
  }

  useEffect(()=> {
    //can check for multiple types of events here, which is a cool thing to be able to do
    const response = new EventSource(`${BASE_URL}/integrations/events/`) //Open SSE connection
    response.onmessage = (event) => {
      if (event.data['status'] === "connected") {
          setIsEnabled((prevState: any) => !prevState)
          localStorage.setItem('enabled', isEnabled.toString())
          response.close()
      }

    }
    response.onerror = (error) => {
      response.close()
    }
    return () => {
      response.close() //avoid resource leak
    }
  }, [])

  
  return (
    <Card>
        <CardMedia
          sx={{ height: 140 , width: 140}}
          image={'/gcal_logo.png'}
          title={"gcal logo"}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Google Calendar helps you stay on top of your plans - at home, at work and everywhere in between. 
          </Typography>
        </CardContent>
        <Button onClick={() => handleAuth()}> Authorize </Button>
    </Card>
    )
}
