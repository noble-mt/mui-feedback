import Box from "@mui/material/Box"
import { ReactNode } from "react";
import Alert, { AlertProps } from '@mui/material/Alert';
import { SEVERITY } from "../../constants/severity";
import { VARIANT } from "../../constants/variant";
import { AlertGlobalProps } from "context/alertContext";



// import Snackbar from "@mui/material/Snackbar";
export interface MuiAlertProps extends Omit<AlertProps, 'onClose'> {
    message: ReactNode | string
    inout?: number,
    severity?: SEVERITY,
    variant?: VARIANT,
    onClose?: () => void,
    globalProps?: AlertGlobalProps
}

export const MuiAlert = ({ message, severity = 'success', onClose, variant = 'standard', globalProps, ...rest }: MuiAlertProps) => {
    return (
        <Box my="8px">
            <Alert severity={severity} variant={variant} {...globalProps} {...rest} onClose={onClose}>{message} </Alert>
        </Box>
    );
}