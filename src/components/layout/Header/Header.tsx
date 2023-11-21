import { classNameFactory } from "@/utils/dom";
import "./Header.scss";

const cn = classNameFactory("header");
export function Header() {
  return (
    <header className={cn("")}>
      <h1>All Feeds</h1>
    </header>
  );
}
