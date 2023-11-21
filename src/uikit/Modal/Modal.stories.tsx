import type { Meta, StoryObj } from "@storybook/react";

import { Modal } from "./Modal";

const meta = {
  title: "Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: "Modal",
    children: "this is",
  },
};
