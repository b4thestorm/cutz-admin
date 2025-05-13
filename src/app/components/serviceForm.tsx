import {Dispatch, SetStateAction, useState} from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { serviceCardProps } from './serviceCard';
import {getCookie} from '../utils/utils'; 

export interface ServiceFormProps {
    visibility: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export function ServiceFormDialog ({visibility, setVisible}: ServiceFormProps) {
    const [service, setService] = useState<serviceCardProps>({id: 2, title: "", description: "", image_url: "", price: ""})
    
    const handleChange = (event: React.SyntheticEvent<EventTarget>) => {
        const element = event.target as HTMLInputElement
        let mutatedProfile = {...service, [element.id]: element.value}
        if (element.files) {
          const file = element.files?.[0] || null;
          mutatedProfile = {...service, "image_url": file }
        }
        setService(mutatedProfile)
    }
    
    const handleSubmit = async () => {
        console.log("this is run")
        const csrftoken = getCookie('csrftoken') as string;
        const formData = new FormData()
        formData.append("barber", service.id.toString());
        formData.append("title", service.title);
        formData.append("description", service.description);
        formData.append("price", service.price);
        if (service.image_url) {
          formData.append("image_url", service.image_url);
        }

        const response = await fetch(`http://localhost:8000/services/`, {
          credentials: 'include',
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken
          },
          body: formData,
        })
        if (response.ok) {
          setVisible(false)
        }
      }
  
    console.log(setVisible)

    return (
        <Dialog open={visibility}>
            <button onClick={() => setVisible(false)}>X</button>
            <DialogTitle>New Service</DialogTitle>
            <form>
            <DialogContent>
                  <Stack direction={"column"} spacing={3}>
                    <TextField id="title" label="title" variant="outlined" value={service.title} onChange={(event) => handleChange(event)} required/>
                    <TextField id="description" label="description" variant="outlined" value={service.description} onChange={(event) => handleChange(event)} required/>
                    <input id="image_url" type="file" onChange={(event) => handleChange(event)}/>
                    <TextField id="price" label="price" variant="outlined" multiline  value={service.price}  onChange={(event) => handleChange(event)}/>
                  </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleSubmit}>Create Service</Button>
            </DialogActions>
            </form>
          </Dialog>
    )
}

