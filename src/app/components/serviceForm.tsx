import {Dispatch, SetStateAction, useState, useRef} from 'react';
import { Button, Dialog, DialogActions, DialogContent, Stack, TextField } from '@mui/material';
import { serviceCardProps } from './serviceCard';
import {getCookie, BASE_URL} from '../utils/utils'; 
import { CloseButton } from './buttons/closeButton';
import { CurrencyInput } from 'react-currency-mask';

export interface ServiceFormProps {
    visibility: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
}

export function ServiceFormDialog ({visibility, setVisible}: ServiceFormProps) {
    const [service, setService] = useState<serviceCardProps>({id: 2, title: "", description: "", image_url: "", price: ""})
    const fileInput = useRef(null)

    
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
        const csrftoken = getCookie('csrftoken') as string;
        const formData = new FormData()
        formData.append("barber", service.id.toString());
        formData.append("title", service.title);
        formData.append("description", service.description);
        formData.append("price",  service.price);
        if (service.image_url) {
          formData.append("image_url", service.image_url);
        }

        const response = await fetch(`${BASE_URL}/services/`, {
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
      
      const handler = () => {
        setVisible(false)
      }

    
    return (
        <Dialog open={visibility} onClose={() => setVisible(false)}>
            <CloseButton close={handler}/>
            <form>
            <DialogContent>
                  <Stack direction={"column"} spacing={3}>
                    <TextField id="title" label="title" variant="outlined" value={service.title} onChange={(event) => handleChange(event)} required/>
                    <TextField id="description" label="description" variant="outlined" value={service.description} onChange={(event) => handleChange(event)} required/>
                    <Button id="image_url"
                    variant="contained"
                    sx={{backgroundColor: "#E9B949"}}
                    onClick={() => { 
                     if (fileInput.current) {
                        fileInput.current.click()
                     }
                    }
                  }>Select Picture</Button>
                  <input id="image_url" type='file' ref={fileInput} onChange={(event)=> handleChange(event)} style={{display: "none"}}/>
                  <CurrencyInput
                      currency="usd"
                      locale="en-US"
                      onChangeValue={(event, originalValue, maskedValue) => {
                        event.target.value = originalValue.toString()
                        handleChange(event)
                  }}
                  InputElement={<TextField id="price" label="price" variant="outlined" value={service.price} multiline />}
                  />
                  </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="success" onClick={handleSubmit}>Create Service</Button>
            </DialogActions>
            </form>
          </Dialog>
    )
}

