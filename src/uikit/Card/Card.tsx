import { PropsWithChildren } from "react";
import { classNameFactory } from "@/utils/dom";
import "./Card.scss";

const cn = classNameFactory("card");
export function Card(props: PropsWithChildren) {
  return <div className={cn("")}>{props.children}</div>;
}
