import { ButtonHTMLAttributes, forwardRef } from "react";
import { classNameFactory } from "@/utils/dom";
import classNames from "classnames";
import "./Button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const cn = classNameFactory("button");

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, className: classNameProp, variant, ...rest } = props;

  const className = classNames(cn("", { secondary: variant === "secondary" }), classNameProp);

  return (
    <button ref={ref} className={className} {...rest}>
      <span className="content">{children}</span>
    </button>
  );
});
