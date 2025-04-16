'use client'
import {useEffect, useState} from 'react';
import { Container, Typography, Button, Box} from "@mui/material";
import {ProfileFormDialog} from '../components/profileForm';

export default function Profile() {

const [profile, setProfile] = useState({first_name: "", last_name: "", title: "", description: "", image_url: null, street_address: "", city: "", state: "", zip_code: ""})
const [visible, setVisible] = useState(false)

const fetchUser = async (id: number) => {
  const response= await fetch(`http://localhost:8000/users/${id}`, {
    method:"GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  return await response.json();
}

useEffect(()=> {
   const user = fetchUser(2)
   user.then((data) => {
    const clone = {first_name: data.first_name, last_name: data.last_name, title: data.title, description: data.description, street_address: data.street_address, city: data.city, state: data.state, zip_code: data.zip_code, image_url: data.image_url}
    setProfile({...clone})
   })
}, [])

return (
  <Container>
    <Box sx={{display: "flex", justifyContent: "space-around", marginTop: "10px"}}>
      <Box sx={{minWidth: "200px"}}>
        <Typography>Name: {`${profile.first_name} ${profile.last_name}`}</Typography>
        <Typography>Title: {profile.title}</Typography>
        <Typography>Description: {profile.description}</Typography>
        <Typography>Address:  {profile.street_address}</Typography>
        <Typography>City:  {profile.city}</Typography>
        <Typography>State:  {profile.state}</Typography>
        <Typography>Zip Code:  {profile.zip_code}</Typography>
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
)}