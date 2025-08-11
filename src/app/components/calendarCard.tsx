'use client'
import {useState, useEffect} from 'react';
import {Card, CardContent, CardMedia, Typography, Button} from '@mui/material'
import { BASE_URL} from '../utils/utils';


export const CalendarCard = () => {
  const [type, setType] = useState<string>("gcal");
  const [enabled, setEnabled] = useState<boolean>(() => {
    let state = localStorage.getItem(`${type}`)
    return (state === "true")
  })

  const handleAuth = () => { 
    fetch(`${BASE_URL}/integrations/gcal_init/`, {
      credentials: 'include',
      method: 'GET',
    })
    setType("gcal")
  }

  const checkConnected = async () => {
      const response = await fetch(`${BASE_URL}/integrations/connected/?type=${type}`, {
      credentials: 'include',
      method: 'GET',
      })

      if (response.status === 304) {
        setTimeout(() => {
          console.log("polling")
        }, 3000);
        await checkConnected()
      } else if (response.status === 200) {
        setEnabled(true)
        localStorage.setItem(`${type}`, "true")
      }
  }

  useEffect(()=> {
      if (!enabled) {
        //Short POLL on 3 second interval
        checkConnected()
      }
  }, [handleAuth])
  
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
        <Button onClick={handleAuth}>
            Authorize
        </Button> 
    </Card>
    )
}
