import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import Weather from "@/assets/icon/nav_icon_1@2x.svg?react";
import Remote from "@/assets/icon/nav_icon_2@2x.svg?react";
import Control from "@/assets/icon/nav_icon_3@2x.svg?react";
import Sensor from "@/assets/icon/nav_icon_4@2x.svg?react";
import SensorRecord from "@/assets/icon/nav_icon_5@2x.svg?react";
import Alarm from "@/assets/icon/nav_icon_6@2x.svg?react";
import Cctv from "@/assets/icon/nav_icon_7@2x.svg?react";
import List from "@/assets/icon/list-icon@2x.svg?react";

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <>
      <div className="flex h-screen fixed top-[3.75rem] left-0 z-10">
        <div className={`flex flex-col justify-between h-[calc(100vh-60px)]`}>
          <Sidebar width="12.5rem" rootStyles={rootStyles}>
            <Menu>
              {MENU.map((e) => {
                return (
                  <MenuItem
                    key={e.key}
                    component={<Link to={`${e.path}`} />}
                    icon={e.icon}
                    active={e.path === pathname}
                  >
                    {e.label}
                  </MenuItem>
                );
              })}
            </Menu>
          </Sidebar>
          <div className="w-[12.5rem] max-h-[20.625rem] h-auto bg-[#212120] p-[.625rem] text-white">
            <p className="pb-[.625rem] border-b-2">(주)소하테크</p>
            <div className="pt-4 pb-[1.875rem] flex flex-col gap-1">
              <span className="">대표 윤득중</span>
              <span className="whitespace-break-spaces lg:text-xs">
                사업자등록번호 : 217-81-18219
              </span>
              <span className="lg:text-xs">전화 : 02-978-0461</span>
              <span className="lg:text-xs">팩스 : 02-978-0463</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="whitespace-break-spaces lg:text-xs">
                서울특별시 노원구 노원로 15길 10
              </span>
              <span className="whitespace-break-spaces lg:text-xs">
                하계동 하계테크노타운 A동 403호
              </span>
              <span className="lg:text-xs">(01788)</span>
              <span className="lg:text-xs">sale@soha-tech.com</span>
            </div>
            <span className="whitespace-break-spaces lg:text-xs">
              Copyright ⓒ SOHA-TECH All Right Reserved.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;

const rootStyles = {
  "&.ps-sidebar-root": {
    borderRightWidth: "0",
    color: "#fff",
    height: "100%",
    ".ps-sidebar-container": {
      backgroundColor: "#746A68",
    },
    ".ps-menu-icon": { minWidth: "1.5rem", width: "1.5rem", height: "1.5rem" },
    ".ps-menu-button:hover": {
      backgroundColor: "#D0943A",
    },
    ".ps-active": {
      backgroundColor: "#D0943A",
    },
  },
};

const MENU = [
  {
    key: "기상청 날씨 정보",
    label: "기상청 날씨 정보",
    path: "/weather",
    icon: <Weather />,
  },
  {
    key: "원격 제어",
    label: "원격 제어",
    path: "/control",
    icon: <Remote />,
  },
  {
    key: "제어 기록",
    label: "제어 기록",
    path: "/control-record",
    icon: <Control />,
  },
  {
    key: "센서 보기",
    label: "센서 보기",
    path: "/sensor-view",
    icon: <Sensor />,
  },
  {
    key: "센서 기록",
    label: "센서 기록",
    path: "/sensor-record",
    icon: <SensorRecord />,
  },
  {
    key: "경보 내역",
    label: "경보 내역",
    path: "/alert",
    icon: <Alarm />,
  },
  {
    key: "CCTV",
    label: "CCTV",
    path: "",
    icon: <Cctv />,
  },
  {
    key: "사용자 리스트",
    label: "사용자 리스트",
    path: "/user",
    icon: <List />,
  },
  {
    key: "농가 리스트",
    label: "농가 리스트",
    path: "/farm",
    icon: <List />,
  },
];
