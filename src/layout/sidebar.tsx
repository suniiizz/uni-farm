import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import Weather from "@/assets/icon/nav_icon_1@2x.svg?react";
import Remote from "@/assets/icon/nav_icon_2@2x.svg?react";
import Control from "@/assets/icon/nav_icon_3@2x.svg?react";
import Sensor from "@/assets/icon/nav_icon_4@2x.svg?react";
import SensorRecord from "@/assets/icon/nav_icon_5@2x.svg?react";
import Alarm from "@/assets/icon/nav_icon_6@2x.svg?react";
import Cctv from "@/assets/icon/nav_icon_7@2x.svg?react";
import List from "@/assets/icon/list-icon@2x.svg?react";

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
                  icon={e.icon}
                >
                  {e.label}
                </MenuItem>
              );
            })}
          </Menu>
          <div className="w-[12.5rem] min-h-[20.625rem] h-auto bg-[#212120] fixed bottom-0 left-0 px-[.625rem] py-4">
            <p className="pb-[.625rem] border-b-2">(주)소하테크</p>
            <div className="pt-4 pb-[1.875rem] flex flex-col gap-2">
              <span className="">대표 윤득중</span>
              <span className="whitespace-break-spaces">
                사업자등록번호 : 217-81-18219
              </span>
              <span>전화 : 02-978-0461</span>
              <span>팩스 : 02-978-0463</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="whitespace-break-spaces">
                서울특별시 노원구 노원로 15길 10
              </span>
              <span className="whitespace-break-spaces">
                하계동 하계테크노타운 A동 403호
              </span>
              <span>(01788)</span>
              <span>sale@soha-tech.com</span>
            </div>
            <span className="whitespace-break-spaces">
              Copyright ⓒ SOHA-TECH All Right Reserved.
            </span>
          </div>
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
    icon: <Weather />,
  },
  {
    key: "원격 제어",
    label: "원격 제어",
    path: "/control",
    icon: <Remote />,
  },
  {
    key: "제어 정보",
    label: "제어 정보",
    path: "/",
    icon: <Control />,
  },
  {
    key: "센서 보기",
    label: "센서 보기",
    path: "/",
    icon: <Sensor />,
  },
  {
    key: "센서 기록",
    label: "센서 기록",
    path: "/",
    icon: <SensorRecord />,
  },
  {
    key: "경보 내역",
    label: "경보 내역",
    path: "/",
    icon: <Alarm />,
  },
  {
    key: "CCTV",
    label: "CCTV",
    path: "/",
    icon: <Cctv />,
  },
  {
    key: "사용자 리스트",
    label: "사용자 리스트",
    path: "/",
    icon: <List />,
  },
  {
    key: "농가 리스트",
    label: "농가 리스트",
    path: "/",
    icon: <List />,
  },
];

const rootStyles = {
  "&.ps-sidebar-root": {
    borderRightWidth: "0",
    color: "#fff",
    ".ps-sidebar-container": { backgroundColor: "#746A68" },
    ".ps-menu-icon": { minWidth: "1.5rem", width: "1.5rem", height: "1.5rem" },
  },
};

export default Nav;
