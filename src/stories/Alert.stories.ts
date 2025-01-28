import type { Meta, StoryObj } from '@storybook/react';
import { AlertDemo } from './AlertDemo';



// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Alert',
  component: AlertDemo,
} satisfies Meta<typeof AlertDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Demo: Story = {
  args: {
  },
};
