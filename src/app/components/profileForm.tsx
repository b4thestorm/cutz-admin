import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { SetStateAction, Dispatch } from 'react';
import {BASE_URL, getCookie} from '../utils/utils'; 


export interface ProfileFormProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    profile: {
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
    let csrftoken: string;

    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        let mutatedProfile = {...profile, [element.id]: element.value}
        if (element.files) {
          const file = element.files?.[0] || null;
          mutatedProfile = {...profile, "image_url": file}
        }
        setProfile(mutatedProfile)
    }
  
    const handleSubmit = async () => {
      csrftoken = getCookie('csrftoken') as string;
      const formData = new FormData()
      formData.append("first_name", profile.first_name);
      formData.append("last_name", profile.last_name);
      formData.append("title", profile.title);
      formData.append("description", profile.description);
      if (profile.image_url) {
        formData.append("image_url", profile.image_url);
      }
      formData.append("street_address", profile.street_address);
      formData.append("city", profile.city)
      formData.append("state", profile.state)
      formData.append("zip_code", profile.zip_code);

      fetch(`${BASE_URL}/users/2/`, {
        credentials: 'include',
        method: 'PATCH', //Thank you gentleman on Stackoverflow =)
        headers: {
          'Accept': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: formData,
      }).then((data)=> {
        if (data.statusText === "OK") {
          setSaved(true)
          setVisible(!visible)
        }
      })
    }


    return (
      <Dialog open={visible}>
        <DialogTitle>Edit Profile</DialogTitle>
        <button onClick={() => setVisible(false)}>X</button>
        <form>
        <DialogContent>
              <Stack direction={"column"} spacing={3}>
                <TextField id="first_name" label="first name" variant="outlined" value={profile.first_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="last_name" label="last name" variant="outlined" value={profile.last_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="title" label="title" variant="outlined" value={profile.title} onChange={(event) => handleChange(event)}/>
                <TextField id="description" label="description" variant="outlined" multiline  value={profile.description}  onChange={(event) => handleChange(event)}/>
                <input id="image_url" type="file" onChange={(event) => handleChange(event)}/>
                <TextField id="street_address" label="street address" variant="outlined" value={profile.street_address}  onChange={(event) => handleChange(event)}/> 
                <TextField id="city" label="city" variant="outlined" value={profile.city}  onChange={(event) => handleChange(event)}/> 
                <TextField id="state" label="state" variant="outlined" value={profile.state}  onChange={(event) => handleChange(event)}/> 
                <TextField id="zip_code" label="zip code" variant="outlined" value={profile.zip_code}  onChange={(event) => handleChange(event)}/>
              </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="success" onClick={handleSubmit}>Save Profile</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
  }