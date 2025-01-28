import { Alert, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertContext } from '../context/context';
import { AlertProvider } from '../context/alertContext';
import { useContext, useState } from 'react';
import { MuiConfirmProps } from '../components/Confirm/confirm';
import { CONFIRM_DIALOG_POSITIONS } from '../constants/position';


export const ConfirmDemo = ({ ...rest }: MuiConfirmProps) => {
    return (
        <Box display="flex" width="100hw" height="100vh" alignItems="center" justifyContent="center">
            <AlertProvider confirmGlobalProps={{ position: 'center-center'}}>
                <Demo {...rest } />
            </AlertProvider>
        </Box>
    );
}


export const CustomFooter = () => {
    return (
        <Box display="flex" width="100%" justifyContent="center">
            <Alert severity='success' variant='outlined'>Custom Footer</Alert>
        </Box>
    )
}

const Demo = ({ ...rest }: MuiConfirmProps) => {
    const { confirm } = useContext(AlertContext);
    const [position, setPosition] = useState<CONFIRM_DIALOG_POSITIONS>('center-center');

    const show = () => {
        confirm({
            ...rest,
            position
        });
    }
    console.log('here')
    return (
        <>
        
            <Box>
                <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">Position</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={position}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(_e, value: any) => setPosition(value)}
                    >
                        <FormControlLabel value={'center-left'} control={<Radio />} label={'Center Left'} />
                        <FormControlLabel value={'center-center'} control={<Radio />} label={'Center Center'} />
                        <FormControlLabel value={'center-right'} control={<Radio />} label={'Center Right'} />
                        <FormControlLabel value={'top-left'} control={<Radio />} label={'Top Left'} />
                        <FormControlLabel value={'top-center'} control={<Radio />} label={'Top Center'} />
                        <FormControlLabel value={'top-right'} control={<Radio />} label={'Top Right'} />
                        <FormControlLabel value={'bottom-left'} control={<Radio />} label={'Bottom Left'} />
                        <FormControlLabel value={'bottom-center'} control={<Radio />} label={'Bottom Center'} />
                        <FormControlLabel value={'bottom-right'} control={<Radio />} label={'Bottom Right'} />
                    </RadioGroup>
                </FormControl>
            </Box>
            <Button variant='contained' onClick={show}>Click Me</Button>
        </>
    )
}