import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div
      className="flex min-h-screen transition-all duration-300"
      style={{ background: "var(--bg)" }}
    >
      <Sidebar />
      <div className="flex-1 w-full lg:ml-64">
        <Navbar />
        <main className="pt-20 px-4 lg:px-6">
          <div className="max-w-350 2xl:max-w-400 mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
