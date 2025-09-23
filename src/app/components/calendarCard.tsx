'use client'
import {useState, useEffect} from 'react';
import {Card, CardContent, CardMedia, Typography, Button, Stack} from '@mui/material'
import { BASE_URL} from '../utils/utils';


export const CalendarCard = ({isEnabled, setIsEnabled}: {isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;}) => {
  const [response, setResponse] = useState<EventSource>(new EventSource(`${BASE_URL}/integrations/events/`));
  const handleAuth = async () => { 
    fetch(`${BASE_URL}/integrations/gcal_init/`, {
      credentials: 'include',
      method: 'GET',
    })
  }

  useEffect(() => {
        response.onmessage = (event) => {
          let status = JSON.parse(event['data'])['status']
          if (status === "connected") {
            setIsEnabled((prevState: any) => !prevState)
            localStorage.setItem('enabled', 'true')
            response.close()
          }
        }
        response.onerror = () => {
          response.close() //avoid resource leak
        }

        return () => {
          response.close(); // Cleanup on unmount
        };
  }, [response])
   
 
  return (
    <Card sx={{ maxWidth: 345 }}>
        <center>
        <CardMedia
          sx={{ height: 140, width: 140 }}
          image={'/google-calendar-logo.png'}
          title={"gcal logo"}
        />
        </center>
        <CardContent>
          <Stack direction={"column"} spacing={3}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Google Calendar helps you stay on top of your plans - at home,{'\n'}
            at work and everywhere in between. 
          </Typography>
          <Button variant="contained" color="success" onClick={() => handleAuth()}> Authorize </Button>
          </Stack>
        </CardContent>
      
    </Card>
    )
}
