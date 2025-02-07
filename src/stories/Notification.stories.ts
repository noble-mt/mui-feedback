import type { Meta, StoryObj } from "@storybook/react";
import { NotificationDemo } from "./NotificationDemo";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Notification",
  component: NotificationDemo,
} satisfies Meta<typeof NotificationDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: Story = {
  args: {},
};
