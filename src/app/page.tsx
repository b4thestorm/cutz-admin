'use client'
import {Typography, Box, Container, Card, CardMedia, Stack, Divider} from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';


export default function Home() {
  const heights = [250, 450, 190, 270, 170]
  const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

  return (
    <Box sx={{backgroundColor: "#0a0a0a"}}>
      <Container sx={{height: "1200px"}}>
        <br/>
        <Typography variant={"h3"}>Your Next Hair Cut, Simplified.</Typography>
        <br/>
        <br/>
        <Masonry columns={3} spacing={2}>
        {heights.map((height, index) => (
        <Item key={index} sx={{ height }}>
           <Card>
            <CardMedia
              sx={{ height: 140 }}
              image={`barberImg${index + 1}.jpeg`}
              title={'example'}
            />
            </Card>
        </Item>
        ))}
      </Masonry>
      <Stack sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10}} direction={'row'} spacing={10}>
        <Typography sx={{width: 250}}>
          <Typography variant={'h5'} >Boost your bottom line:</Typography> Keep your chair full and your calendar booked. Cutz helps you manage appointments and minimize no-shows, so you can focus on your craft, not your schedule.
        </Typography>

        <Typography sx={{width: 250}}>
          <Typography variant={'h5'}>Grow your client list:</Typography> Attract new customers by making your shop easy to find and book, 24/7. Cutz puts your talent in front of a wider audience, helping you build your business effortlessly.
        </Typography>

        <Typography sx={{width: 250}}>
          <Typography variant={'h5'}>Increase client loyalty:</Typography>Give your exisiting clients a simple way to retain your services. Using the companion iphone and android app, a client can instantly stay up to date with your schedule and book quickly.
        </Typography>
      </Stack>
      </Container>
   
    </Box>
  );
}
