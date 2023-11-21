import { forwardRef, useId } from "react";
import "./TextField.scss";
import { classNameFactory } from "@/utils/dom";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  fullWidth?: boolean;
  error?: string;
}

const cn = classNameFactory("text-field");

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, fullWidth = false, error, required, ...restProps } = props;

  const id = useId();
  return (
    <div className={cn("", { full: fullWidth })}>
      {label && (
        <label htmlFor={id} className={cn("label")}>
          {label}
          {required && (
            <span className={cn("star")} aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <input aria-invalid={!!error} id={id} className={cn("input")} {...restProps} required={required} ref={ref} />
      <p className={cn("error-message")} role="alert">
        {error}
      </p>
    </div>
  );
});
