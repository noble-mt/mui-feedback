import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDemo, CustomFooter } from "./ConfirmDemo";
import { styled, Dialog } from "@mui/material";

// background-color: var(--palette-background-paper);
// color: var(--palette-text-primary);
// background-image: none;
// position: relative;
// overflow-y: auto;
// display: flex
// ;
// flex-direction: column;
// max-height: calc(100% - 64px);
// max-width: 600px;
// box-shadow: var(--customShadows-dialog);
// transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1);
// border-radius: 16px;
// margin: calc(2* var(--spacing));

const CustomDialogBox = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 16,
    boxShadow: "0px 11px 15px -7px rgba(145 158 171 / 0.2), 0px 24px 38px 3px rgba(145 158 171 / 0.14), 0px 9px 46px 8px rgba(145 158 171 / 0.12)",
    // margin: theme.spacing(2),
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
  },
  "& .MuiDialogTitle-root": {
    fontWeight: "600",
    padding: "24px"
  },
  "& .MuiDialogContent-root": {
    "& .mui-f-close-button": {
      color: (theme).palette.grey[800],
      ...theme.applyStyles('dark', {
        color: (theme).palette.common.white,
      }),
    }
  },
  "& .MuiDialogActions-root": {
    padding: "16px",
    justifyContent: "flex-end",

    "& .mui-f-success-button": {
        textTransform: 'none',
        backgroundColor: (theme).palette.grey[800],
        color: (theme).palette.common.white,
        ...theme.applyStyles('dark', {
          backgroundColor: (theme).palette.common.white,
          color: (theme).palette.grey[800],
        }),
      },
      "& .mui-f-cancel-button": {
        textTransform: 'none',
        borderColor: (theme).palette.grey[800],
        color: (theme).palette.grey[800],
        ...theme.applyStyles('dark', {
          borderColor: (theme).palette.common.white,
          color: (theme).palette.common.white,
        }),
      }
  },
}));

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Confirm",
  component: ConfirmDemo,
} satisfies Meta<typeof ConfirmDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    title: "Confirm",
    message:
      "Are you absolutely sure you want to permanently delete this user? This action cannot be undone.",
  },
};

export const CustomDialogStyle: Story = {
  args: {
    message:
      "Are you absolutely sure you want to permanently delete this user? This action cannot be undone.",
    componentProps: {
      dialogProps: {
        maxWidth: "xs",
        fullWidth: true,
        sx: {
          "& .MuiDialog-container": {
            backgroundColor: "gray",
          },
        },
      },
    },
    // customButtons: [
    //   {
    //     children: "Agree",
    //   },
    //   {
    //     children: "Not Agree",
    //     variant: "contained",
    //     color: "primary",
    //   },
    // ],
    // hideCancelButton: true,
    // hideSuccessButton: true,
    title: "Confirm",
    onSuccess: () => {},
    styledDialogComponent: CustomDialogBox,
    hideButtonProps: {
      style: { fontWeight: 'bold' }
    }
  },
};

export const CustomFooterDemo: Story = {
  args: {
    message:
      "Are you absolutely sure you want to permanently delete this user?",
    title: "Confirm",
    customFooter: CustomFooter,
  },
};

export const DraggableDemo: Story = {
  args: {
    message:
      "Are you absolutely sure you want to permanently delete this user?",
    title: "Confirm",
    draggable: true,
  },
};
