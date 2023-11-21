import { ButtonHTMLAttributes, FC } from "react";
import { classNameFactory } from "@/utils/dom";

import "./IconButton.scss";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const cn = classNameFactory("icon-button");

export const IconButton: FC<IconButtonProps> = ({ children, ...rest }) => {
  return (
    <button className={cn("")} {...rest}>
      {children}
    </button>
  );
};
