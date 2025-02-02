import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { AlertContext } from '../context/context';
import { AlertProvider } from '../context/alertContext';
import { useContext, useState } from 'react';
import { SEVERITY } from '../constants/severity';
import { HORIZONTAL, VERTICAL } from '../constants/position';
import React from 'react';


export const NotificationDemo = () => {
    return (
        <Box display="flex" width="100hw" height="100vh" alignItems="center" justifyContent="center">
            <AlertProvider notificationGlobalProps={{ horizontal: 'center', vertical: 'bottom'}}>
                <Demo />
            </AlertProvider>
        </Box>
    );
}

const Demo = () => {
    const { notification, closeAllNotifications } = useContext(AlertContext);
    const [count, setCount] = useState<number>(0);
    const [severity, setSeverity] = useState<SEVERITY>('success');
    const [horizontal, setHorizontal] = useState<HORIZONTAL>('right');
    const [vertical, setVertical] = useState<VERTICAL>('top');
    
    const handlePositionChange = (position: string) => {
        const [vertical, horizontal] = position.split(' ');
        setVertical(vertical as never);
        setHorizontal(horizontal as never);
    }
    const show = () => {
        setCount(prev => prev + 1)
        notification({
            message: "Hello there! You are welcome" + count,
            vertical,
            horizontal
        });
    }
    return (
        <>
            <Box minWidth="400px">
                <Typography variant="h3">Settings</Typography>
                <Box display="flex">
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Severity</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={severity}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(_e, value: any) => setSeverity(value)}
                            >
                                <FormControlLabel value={'error'} control={<Radio />} label={'error'} />
                                <FormControlLabel value={'success'} control={<Radio />} label={'success'} />
                                <FormControlLabel value={'info'} control={<Radio />} label={'info'} />
                                <FormControlLabel value={'warning'} control={<Radio />} label={'warning'} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box>
                        <FormControl>
                            <FormLabel id="demo-controlled-radio-buttons-group">Position</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={`${vertical} ${horizontal}`}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onChange={(_e, value: any) => handlePositionChange(value)}
                            >
                                <FormControlLabel value={'top left'} control={<Radio />} label={'Top Left'} />
                                <FormControlLabel value={'top center'} control={<Radio />} label={'Top Center'} />
                                <FormControlLabel value={'top right'} control={<Radio />} label={'Top Right'} />
                                <FormControlLabel value={'bottom left'} control={<Radio />} label={'Bottom Left'} />
                                <FormControlLabel value={'bottom center'} control={<Radio />} label={'Bottom Center'} />
                                <FormControlLabel value={'bottom right'} control={<Radio />} label={'Bottom Right'} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </Box>
            </Box>
            <Button variant='contained' onClick={show}>Click Me</Button>
            <Button variant='contained' onClick={closeAllNotifications}>Close All</Button>
        </>
    )
}