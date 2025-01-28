import Button, { ButtonProps } from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions, { DialogActionsProps } from "@mui/material/DialogActions";
import DialogContent, { DialogContentProps } from "@mui/material/DialogContent";
import DialogTitle, { DialogTitleProps } from "@mui/material/DialogTitle";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Paper, { PaperProps } from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import React from "react";
import Draggable from "react-draggable";
import { CONFIRM_DIALOG_POSITIONS } from "../../constants/position";
import { SxProps } from "@mui/material/styles";
import { GlobalConfirmProps } from "../../context/alertContext";

const PositionStyles: { [key in CONFIRM_DIALOG_POSITIONS]: SxProps } = {
  "top-left": {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  "top-center": {
    alignItems: "flex-start",
    justifyContent: "center",
  },
  "top-right": {
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  "center-left": {
    alignItems: "center",
    justifyContent: "flex-start",
  },
  "center-center": {
    alignItems: "center",
    justifyContent: "center",
  },
  "center-right": {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  "bottom-left": {
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  "bottom-center": {
    alignItems: "flex-end",
    justifyContent: "center",
  },
  "bottom-right": {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
};

const StyledDialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 10,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiDialogTitle-root": {
    color: theme.palette.primary.main,
    fontWeight: "bold",
    padding: "8px 24px",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDialogContent-root": {
    padding: `${theme.spacing(3)} !important`,
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
    justifyContent: "flex-end",
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSxProps = (sx: any, position?: CONFIRM_DIALOG_POSITIONS): any => {
  return position ? {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...((sx ?? {}) as any),
    "& .MuiDialog-container": {
      ...(PositionStyles?.[`${position}`] ?? {}),
      ...(sx?.["& .MuiDialog-container"] ?? {}),
    },
  } : sx;
};

interface ComponentProps {
  dialogProps?: Partial<DialogProps>;
  dialogActionsProps?: Partial<DialogActionsProps>;
  dialogContentProps?: Partial<DialogContentProps>;
  dialogTitleProps?: Partial<DialogTitleProps>;
}

const DraggablePaperComponent = (props: PaperProps) => {
  const nodeRef = React.useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#alert-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
};

export interface MuiConfirmProps {
  globalProps?: GlobalConfirmProps;
  title?: string | React.ReactNode;
  message: string | React.ReactNode;
  onClose?: () => void;
  onSuccess?: () => void;
  successButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  successButtonContent?: string | React.ReactNode;
  cancelButtonContent?: string | React.ReactNode;
  hideCancelButton?: boolean;
  hideSuccessButton?: boolean;
  hideTopCloseButton?: boolean;
  customButtons?: ButtonProps[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFooter?: () => React.ReactNode;
  styledDialogComponent?: typeof StyledDialogBox | typeof Dialog;
  componentProps?: ComponentProps;
  draggable?: boolean;
  position?: CONFIRM_DIALOG_POSITIONS;
  hideButtonProps?: IconButtonProps
}

export const Confirm = ({
  globalProps,
  title,
  message,
  onSuccess,
  onClose = () => {},
  successButtonProps = {},
  cancelButtonProps = {},
  successButtonContent = "Ok",
  cancelButtonContent = "Cancel",
  hideCancelButton,
  hideSuccessButton,
  hideTopCloseButton,
  customButtons,
  styledDialogComponent,
  componentProps,
  customFooter,
  draggable,
  position,
  hideButtonProps
}: MuiConfirmProps) => {
  const DialogCustom = styledDialogComponent  ?? StyledDialogBox;
  return (
    <DialogCustom
      maxWidth="xl"
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      data-testid="confirmation-dialog"
      PaperComponent={ draggable ?? globalProps?.draggable ? DraggablePaperComponent : undefined }
      {...(componentProps?.dialogProps ?? globalProps?.componentProps?.dialogProps)}
      sx={parseSxProps(
        componentProps?.dialogProps?.sx ?? globalProps?.componentProps?.dialogProps?.sx ?? {},
        position ?? globalProps?.position
      )}
    >
      {title && (
        <DialogTitle
          id="alert-dialog-title"
          {...(componentProps?.dialogTitleProps ??
            globalProps?.componentProps?.dialogTitleProps)}
          style={{
            ...(draggable ?? globalProps?.draggable ? { cursor: "move" } : {}),
            ...(componentProps?.dialogTitleProps?.style ?? globalProps?.componentProps?.dialogTitleProps?.style ?? {}),
          }}
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent {...(componentProps?.dialogContentProps ?? globalProps?.componentProps?.dialogContentProps)}>
        {(hideTopCloseButton ?? globalProps?.hideTopCloseButton) ? (
          ""
        ) : (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 0,
              color: theme.palette.grey[500],
            })}
            {...(hideButtonProps ?? globalProps?.hideButtonProps ?? {})}
          >
            x
          </IconButton>
        )}
        {message}
      </DialogContent>
      <DialogActions {...(componentProps?.dialogActionsProps ?? globalProps?.componentProps?.dialogActionsProps)}>
        {!hideCancelButton && !customFooter ? (
          <Button
            onClick={onClose}
            color="secondary"
            variant="outlined"
            data-testid={"cancel-button"}
            {...(cancelButtonProps ?? globalProps?.cancelButtonProps)}
          >
            {cancelButtonContent}
          </Button>
        ) : (
          ""
        )}
        {!hideSuccessButton && !(customFooter ?? globalProps?.customFooter) ? (
          <Button
            onClick={onSuccess}
            color="primary"
            variant="contained"
            data-testid={"success-button"}
            autoFocus
            {...(successButtonProps ?? globalProps?.successButtonProps)}
          >
            {successButtonContent}
          </Button>
        ) : (
          ""
        )}
        {customButtons?.map(({ children, ...rest }, index) => (
          <Button color="secondary" variant="outlined" key={index} {...rest}>
            {children}
          </Button>
        ))}
        {customFooter?.()}
      </DialogActions>
    </DialogCustom>
  );
};
