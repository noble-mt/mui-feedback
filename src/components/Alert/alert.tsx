import Box from "@mui/material/Box"
import { ReactNode } from "react";
import Alert, { AlertProps } from '@mui/material/Alert';
import { SEVERITY } from "../../constants/severity";
import { VARIANT } from "../../constants/variant";



// import Snackbar from "@mui/material/Snackbar";
export interface MuiAlertProps extends Omit<AlertProps, 'onClose'> {
    message: ReactNode | string
    inout?: number,
    severity?: SEVERITY,
    variant?: VARIANT,
    onClose?: () => void,
}

export const MuiAlert = ({ message, severity = 'success', onClose, variant = 'standard', ...rest }: MuiAlertProps) => {
    return (
        <Box my="8px">
            <Alert severity={severity} variant={variant} {...rest} onClose={onClose}>{message} </Alert>
        </Box>
    );
}