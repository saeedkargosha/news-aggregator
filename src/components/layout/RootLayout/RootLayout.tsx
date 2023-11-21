import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";
import { classNameFactory } from "@/utils/dom";

import "./RootLayout.scss";

const cn = classNameFactory("root-layout");
export function RootLayout() {
  return (
    <main className={cn("")}>
      <Sidebar />
      <Outlet />
    </main>
  );
}
