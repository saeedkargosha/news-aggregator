import { classNameFactory } from "@/utils/dom";
import "./Divider.scss";

const cn = classNameFactory("divider");

export function Divider() {
  return <div className={cn("")} />;
}
