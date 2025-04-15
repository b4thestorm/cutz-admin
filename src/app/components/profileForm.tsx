import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { SetStateAction, Dispatch, useState } from 'react';


export interface ProfileFormProps {
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
    profile: {
      first_name: string,
      last_name: string,
      title: string,
      description: string
    }
    setProfile: Dispatch<SetStateAction<{ first_name: string; last_name: string; title: string; description: string; }>>;
  }

export function ProfileFormDialog(props: ProfileFormProps) {
    const { visible, profile, setProfile, setVisible } = props;
    const [errors, setErrors] = useState(null)
  
    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        const mutatedProfile = {...profile, [element.id]: element.value}
        setProfile(mutatedProfile)
    }
  
    const handleSubmit = async () => {
      const response = await fetch(`http://localhost:8000/users/2`, {
        method: 'PUT',
        body: JSON.stringify(profile)
      })
      if (!response.ok) {
        setVisible(!visible)}
      }
    }

    return (
      <Dialog open={visible}>
        <DialogTitle>Edit Profile</DialogTitle>
        <form onSubmit={event => { 
          event.preventDefault();
          handleSubmit();
        }
        >
        <DialogContent>
              <Stack direction={"column"} spacing={5}>
                <TextField id="first_name" label="first name" variant="outlined" value={profile.first_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="last_name" label="last name" variant="outlined" value={profile.last_name} onChange={(event) => handleChange(event)} required/>
                <TextField id="title" label="title" variant="outlined" value={profile.title} onChange={(event) => handleChange(event)}/>
                <TextField id="description" label="description" variant="outlined" multiline  value={profile.description}  onChange={(event) => handleChange(event)}/>
              </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant="contained" color="success">Save Profile</Button>
        </DialogActions>
        </form>
      </Dialog>
    );
  }