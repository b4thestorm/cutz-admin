'use client'
import {useState, useEffect, useContext} from 'react';
import {Card, CardContent, CardMedia, Typography, Button, Stack, Input, TextField} from '@mui/material'
import { BASE_URL, getCookie} from '../utils/utils';
import { CalendarContext } from '../contexts/calendarContext';


export const CalendarCard = ({isEnabled, setIsEnabled}: {isEnabled: boolean, setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;}) => {
  const { disconnect, response } = useContext(CalendarContext)
  const [calendarId, setCalendarId] = useState('')
  const handleAuth = (event: any) => { 
    event.preventDefault();
    const csrftoken = getCookie('csrftoken') as string;
    fetch(`${BASE_URL}/integrations/gcal_init/?calendar_id=${calendarId}`, {
      credentials: 'include',
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          'X-CSRFToken': csrftoken
      },
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
          sx={{ height: 250, width: 140 }}
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
          {
            !isEnabled ? (
              <form onSubmit={handleAuth}>
              <TextField type={'text'} value={calendarId} variant="filled" onChange={(event) => setCalendarId(event.target.value)}  placeholder="Your Calendar ID" fullWidth />
              <Button variant="contained" type="submit" color="success" sx={{marginTop: 2}} fullWidth> Connect </Button>
              </form>
            ) : (
              <Button variant="contained" color="error" onClick={() => disconnect()}>Disconnect</Button>
            )
          }
          
          </Stack>
        </CardContent>
      
    </Card>
    )
}
