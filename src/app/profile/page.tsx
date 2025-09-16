'use client'
import {useContext, useEffect, useState} from 'react';
import { Container, Typography, Button, Box, Card, CardMedia} from "@mui/material";
import {ProfileFormDialog} from '../components/profileForm';
import { UserContext } from "../contexts/userContext";
import { mapUser } from '../utils/utils';

export default function Profile() {
const {fetchUser, profile, setProfile } = useContext(UserContext);
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
  mutateUser(profile.id)
}, [saved])

return (
  <Container>
    <Box sx={{display: "flex", justifyContent: "space-around", marginTop: "10px"}}>
      <Card sx={{minWidth: "400px", display: "flex", flexDirection: "column", alignItems: "center", padding: "2em"}}>
        <CardMedia
          sx={{ height: 75 , width: 75, borderRadius: "100%", position: "relative", bottom: "20px"}}
          image={`${profile.image_url}`}
          title={"gcal logo"}
        />
        <Typography variant={'h4'}>{`${profile.first_name} ${profile.last_name}`}</Typography>
        <Typography  variant={'h6'}>{profile.title}</Typography>
        <Typography>{profile.street_address}</Typography>
        <Typography>{`${profile.city} ${profile.state} ${profile.zip_code}`}</Typography>
      </Card>
      <Box sx={{justifySelf: "flex-end"}}>
        <Button variant="contained" sx={{backgroundColor: "#E9B949"}} onClick={() => setVisible(!visible)}>Edit Profile</Button>
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