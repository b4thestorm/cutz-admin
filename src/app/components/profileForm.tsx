import {Box, Button, Dialog, DialogActions, DialogContent, Popper, Stack, TextField, Typography } from '@mui/material';
import { SetStateAction, Dispatch, useRef, useState, MouseEvent, useEffect } from 'react';
import {BASE_URL, getCookie} from '../utils/utils'; 
import Image from 'next/image';
import { CloseButton } from './buttons/closeButton';
import React from 'react';


export interface ProfileFormProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    profile: {
      id: string,
      first_name: string,
      last_name: string,
      title: string,
      description: string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      image_url: any,
      street_address: string,
      city: string,
      state: string,
      zip_code: string,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setProfile: Dispatch<SetStateAction<{ first_name: string; last_name: string; title: string; description: string; image_url: any; street_address: string; city: string; state: string; zip_code: string; }>>;
    setSaved: Dispatch<SetStateAction<boolean>>;
  }

export function ProfileFormDialog(props: ProfileFormProps) {
    const { visible, profile, setProfile, setVisible, setSaved } = props;
    const [error, setError] = useState<any>(null)
    const [timedError, setTimedError] = useState<string | null>(null)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const [open, setOpen] = useState(false)
    const fileInput = useRef<HTMLInputElement | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>('');

    let csrftoken: string;

    const buildPreviewUrl = (e: any) => {
      const url = URL.createObjectURL(e.target.files[0]);
      setPreviewUrl(url);
    };
  
    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        let mutatedProfile = {...profile, [element.id]: element.value}
        if (element.files) {
          const file = element.files?.[0] || null;
          buildPreviewUrl(event)
          mutatedProfile = {...profile, "image_url": file}
        }
        setProfile(mutatedProfile)
    }
  
    const handleSubmit = async (event: any) => {
      csrftoken = getCookie('csrftoken') as string;
      
      setAnchorEl(anchorEl ? null : event.currentTarget);
      const formData = new FormData()
      formData.append("first_name", profile.first_name);
      formData.append("last_name", profile.last_name);
      formData.append("title", profile.title);
      formData.append("description", profile.description);
      if (profile.image_url instanceof File) {
        formData.append("image_url", profile.image_url);
      }
      formData.append("street_address", profile.street_address);
      formData.append("city", profile.city)
      formData.append("state", profile.state)
      formData.append("zip_code", profile.zip_code);

      await fetch(`${BASE_URL}/users/${profile.id}/`, {
        credentials: 'include',
        method: 'PATCH', //Thank you gentleman on Stackoverflow =)
        headers: {
          'X-CSRFToken': csrftoken
        },
        body: formData,
      }).then((response) => {
        if (!response.ok) {
          // check if there was JSON
          const contentType = response.headers.get('Content-Type')
          if (contentType && contentType.includes('application/json')) {
            // return a rejected Promise that includes the JSON
            return response.json().then((json) => Promise.reject(json))
          }
          // no JSON, just throw an error
          throw new Error('Something went horribly wrong 💩')
        }
        return response.json()
      }).then((data)=> {
        setSaved(true)
        setVisible(!visible)
      }).catch((e) => {
        if (e) {
          setError(e)
        }
      })
    }

    const handler = () => {
      setVisible(false)
    }

    useEffect(() => {
      if (error) {
        for(let key in error) {
          let value = error[key]
          setOpen(true)
          setTimedError(`${key} ${value}`)
          setTimeout(()=> {
            setOpen(false)
          }, 3000)
        }
      }
    }, [error, timedError])
    
    return (
      <Dialog open={visible} onClose={()=> setVisible(false)}>
        <CloseButton close={handler}/>
        <form>
        <DialogContent>
              <Stack direction={"row"} spacing={3}>
                <Stack direction={"column"} spacing={2}>
                  <TextField id="first_name" label="first name" variant="outlined" value={profile.first_name} onChange={(event) => handleChange(event)} required/>
                  <TextField id="last_name" label="last name" variant="outlined" value={profile.last_name} onChange={(event) => handleChange(event)} required/>
                  <TextField id="title" label="title" variant="outlined" value={profile.title} onChange={(event) => handleChange(event)}/>
                  <TextField id="description" label="description" variant="outlined" multiline  value={profile.description}  onChange={(event) => handleChange(event)}/>
                   <Button id="image_url"
                    variant="contained"
                    sx={{backgroundColor: "#2e7d32"}}
              onClick={() => { 
              if (fileInput.current) {
                fileInput.current?.click()
              }
              }
                  }>Change Picture</Button>
                  <input id="image_url" type='file' ref={fileInput} onChange={(event)=> handleChange(event)} style={{display: "none"}}/>
                </Stack>
                <Stack direction={"column"} spacing={2}>
                  <TextField id="street_address" label="street address" variant="outlined" value={profile.street_address}  onChange={(event) => handleChange(event)}/> 
                  <TextField id="city" label="city" variant="outlined" value={profile.city}  onChange={(event) => handleChange(event)}/> 
                  <TextField id="state" label="state" variant="outlined" value={profile.state}  onChange={(event) => handleChange(event)}/> 
                  <TextField id="zip_code" label="zip code" variant="outlined" value={profile.zip_code}  onChange={(event) => handleChange(event)}/>
                  {previewUrl && (
                      <Image src={previewUrl} width={50} height={50} alt="picture" />
                  )}
                </Stack>
              </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="success" onClick={(e) => handleSubmit(e)}>Save Profile</Button>
        </DialogActions>
        <Popper open={open} anchorEl={anchorEl}>
          <Box sx={{ border: 1, p: 1, bgcolor: 'red' }}>
            <Typography>{timedError}</Typography>
          </Box>
        </Popper>
        </form>
      </Dialog>
    );
  }