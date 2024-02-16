import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

// import { ReactComponent as Weather } from "@/assets/icon/nav_icon_1@2x.svg";

const Nav = () => {
  return (
    <>
      <div className="flex h-screen fixed top-[3.75rem] left-0 z-10">
        <Sidebar width="12.5rem" rootStyles={rootStyles}>
          <Menu>
            {MENU.map((e) => {
              return (
                <MenuItem
                  key={e.key}
                  component={<Link to={`${e.path}`} />}
                  // icon={
                  //   <span
                  //     className={`bg-[url('src/assets/icon/nav_icon_1@2x.svg)']`}
                  //   ></span>
                  // }
                  // icon={e.icon}
                >
                  {e.label}
                </MenuItem>
              );
            })}
          </Menu>
        </Sidebar>
      </div>
    </>
  );
};

const MENU = [
  {
    key: "기상청 날씨 정보",
    label: "기상청 날씨 정보",
    path: "/",
    // icon: <Weather />,
  },
  {
    key: "원격 제어",
    label: "원격 제어",
    path: "/control",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "제어 정보",
    label: "제어 정보",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "센서 보기",
    label: "센서 보기",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "센서 기록",
    label: "센서 기록",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "경보 내역",
    label: "경보 내역",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "CCTV",
    label: "CCTV",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "사용자 리스트",
    label: "사용자 리스트",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
  {
    key: "농가 리스트",
    label: "농가 리스트",
    path: "/",
    icon: "nav_icon_1@2x.svg",
  },
];

const rootStyles = {
  "&.ps-sidebar-root": {
    borderRightWidth: "0",
    color: "#fff",
    ".ps-sidebar-container": { backgroundColor: "#746A68" },
  },
};

export default Nav;
