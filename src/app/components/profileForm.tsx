import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { SetStateAction, Dispatch } from 'react';


export interface ProfileFormProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    profile: {
      first_name: string,
      last_name: string,
      title: string,
      description: string
    }
    setProfile: Dispatch<SetStateAction<{ first_name: string; last_name: string; title: string; description: string;}>>;
  }

export function ProfileFormDialog(props: ProfileFormProps) {
    const { visible, profile, setProfile, setVisible } = props;
    let csrftoken: string;

    const getCookie = (name: string) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  }
  
    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        const mutatedProfile = {...profile, [element.id]: element.value}
        setProfile(mutatedProfile)
    }
  
    const handleSubmit = async () => {
      csrftoken = getCookie('csrftoken') as string;
      const response = await fetch(`http://localhost:8000/users/2`, {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken
        },
        body: JSON.stringify(profile)
      })
      if (response.ok) {
        setVisible(!visible)
      }
    }


    return (
      <Dialog open={visible}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form>
        <DialogContent>
              <Stack direction={"column"} spacing={3}>
                <TextField id="first_name" label="first name" variant="outlined" value={profile.first_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="last_name" label="last name" variant="outlined" value={profile.last_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="title" label="title" variant="outlined" value={profile.title} onChange={(event) => handleChange(event)}/>
                <TextField id="description" label="description" variant="outlined" multiline  value={profile.description}  onChange={(event) => handleChange(event)}/>
              </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="success" onClick={handleSubmit}>Save Profile</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
  }