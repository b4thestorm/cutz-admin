'use client'
import {useContext, useEffect, useState} from 'react';
import { Container, Typography, Button, Box} from "@mui/material";
import {ProfileFormDialog} from '../components/profileForm';
import { UserContext } from "../contexts/userContext";

import useSWR from 'swr';

export default function Profile() {
const { fetchUser } = useContext(UserContext);
const [profile, setProfile] = useState({first_name: "", last_name: "", title: "", description: "", image_url: null, street_address: "", city: "", state: "", zip_code: ""})
const [visible, setVisible] = useState(false)

const { mutate } = useSWR('id', fetchUser)

useEffect(() => {
  if (window.localStorage.hasOwnProperty('user')) {
    const user = window.localStorage.getItem('user') || null
    if (user) {
      setProfile(JSON.parse(user))
    }
  }
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
      mutate={mutate}
    />
  </Container>
)}