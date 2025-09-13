'use client'
import {useContext, useEffect, useState} from 'react';
import { Container, Typography, Button, Box} from "@mui/material";
import {ProfileFormDialog} from '../components/profileForm';
import { UserContext } from "../contexts/userContext";
import { mapUser } from '../utils/utils';

export default function Profile() {
const {fetchUser, profile, setProfile, } = useContext(UserContext);
const [visible, setVisible] = useState(false)
const [saved, setSaved] = useState(false)

const mutateUser = async (id: string) => {
 const fetchedUser = await fetchUser(id)
 const mutatedUser = mapUser(fetchedUser)
 localStorage.setItem('user', JSON.stringify(mutatedUser))
}

useEffect(() => {
  if (localStorage.hasOwnProperty('user')) {
    const user = localStorage.getItem('user') || null
    if (user) {
      setProfile(JSON.parse(user))
    }
  }
}, [])

useEffect(() => {
  mutateUser('2')
}, [saved])

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
      setSaved={setSaved}
    />
  </Container>
)}