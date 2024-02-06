import { Outlet } from "react-router-dom";
import Header from "@/layout/header";
import Nav from "@/layout/sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <Nav />

      <main className="pl-[12.5rem] pt-[3.75rem] w-[100vw] h-[100vh] bg-sub">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
