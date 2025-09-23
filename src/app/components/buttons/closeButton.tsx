import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


export const CloseButton = ({close}: {close: ()=> void }) => {

  return (
        <IconButton sx={{width: '25px', height: '25px'}} onClick={close}>
            <CloseIcon/>
        </IconButton>
    )
}
