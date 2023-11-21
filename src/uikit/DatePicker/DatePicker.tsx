import { classNameFactory } from "@/utils/dom";
import { FC } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./DatePicker.scss";

const cn = classNameFactory("date-picker");

export const DatePicker: FC<ReactDatePickerProps> = props => {
  return <ReactDatePicker className={cn("")} withPortal {...props} />;
};
