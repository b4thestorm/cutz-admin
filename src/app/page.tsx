'use client'
import {useEffect, useState} from 'react';
import { Container, Typography, Button, Box} from "@mui/material";
import {ProfileFormDialog} from './components/profileForm';

export default function Home() {
  const [profile, setProfile] = useState({first_name: "", last_name: "", title: "", description: ""})
  const [visible, setVisible] = useState(false)

  const fetchUser = async (id: number) => {
    const user = await fetch(`http://localhost:8000/users/${id}`, {
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
    console.log(user)
  }

  useEffect(()=> {
    fetchUser(2)
  }, [])
  
  return (
    <Container>
    <Typography variant="h1" component="h2">
      Cutz
    </Typography>
      <hr/>
      <Box sx={{display: "flex", alignItems: "space-between"}}>
        <Box sx={{minWidth: "200px"}}>
          <Typography>Name: {`${profile.first_name} ${profile.last_name}`}</Typography>
          <Typography>Title: {profile.title}</Typography>
          <Typography>Description: {profile.description}</Typography>
          <Typography>Address: 2605 Grand Concourse</Typography>
        </Box>
        <Box sx={{justifySelf: "flex-end"}}>
          <Button variant="contained" color="success" onClick={() => setVisible(!visible)}>Edit Profile</Button>
        </Box>
      </Box>
      <ProfileFormDialog
        visible={visible}
        setVisible={setVisible}
        profile={profile}
        setProfile={setProfile}
      />
    </Container>
  );
}
