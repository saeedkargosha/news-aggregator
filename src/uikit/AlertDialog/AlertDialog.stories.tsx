import type { Meta, StoryObj } from "@storybook/react";

import { AlertDialog } from "./AlertDialog";

const meta = {
  title: "AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Delete Item",
    description: "Desc",
    isOpen: true,
  },
};
