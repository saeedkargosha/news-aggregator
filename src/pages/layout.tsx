import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components";

export default function RootLayout() {
  return (
    <main className="main">
      <Sidebar />
      <Outlet />
    </main>
  );
}
