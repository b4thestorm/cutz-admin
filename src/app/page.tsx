'use client'
import {useState} from 'react';
import { Container, Typography, Button, Box} from "@mui/material";
import {ProfileFormDialog} from './components/profileForm';

export default function Home() {
  const [profile, setProfile] = useState({first_name: "arnold", last_name: "sanders", title: "super app builder", description: "hood super smart star" })
  const [visible, setVisible] = useState(false)

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
          <Button variant="contained" color="success" onClick={() => setVisible(!open)}>Edit Profile</Button>
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
