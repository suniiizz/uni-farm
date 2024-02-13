import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";

import Button from "@/components/common/button";
import ControlContent from "@/components/pages/control";
import { ModalContext } from "@/components/common/modal/context/modalContext";
import ControlModal from "@/components/pages/control/modal/control";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import VerticalTab from "@/components/common/tab";
import DeviceModal from "@/components/pages/control/modal";

const WeatherControl = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState("");
  const [value, setValue] = useState(0);
  const [modalType, setModalType] = useState("");
  const { isOpen, onOpenModal } = useContext(ModalContext);
  value;

  useEffect(() => {
    const parsedSection = searchParams.get("section");
    setSection(parsedSection ? parsedSection : "1");
  }, [location]);

  const handleSideTabChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenModal = (type: string) => {
    setModalType(type);
    onOpenModal();
  };

  return (
    <>
      <div className="w-full">
        <div className="m-6 bg-bg rounded-[.625rem] h-[calc(100vh-6.75rem)]">
          {/* 상단 타이틀 */}
          <div className="h-full relative">
            <div className="h-[4.375rem] p-6 bg-main rounded-t-[.625rem] border-b border-mainLine flex justify-between items-center relative">
              <div className="flex gap-6 items-center">
                <h2 className="text-[1.625rem] text-[#fff] font-bold">
                  원격제어
                </h2>
                <span className="text-[#fff]">2023-12-18 15:25:46</span>
                <Button customType="MAIN" className="w-[7.5rem]">
                  기상청 날씨
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  customType="MAIN"
                  className="w-[7.5rem] gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                  onClick={() => handleOpenModal("control")}
                >
                  <span className="w-6 h-6 inline-block bg-[url('./assets/icon/setting@2x.png')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                  제어설정
                </Button>
                <Button
                  customType="MAIN"
                  className="w-[7.5rem] gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                  onClick={() => handleOpenModal("device")}
                >
                  <span className="w-6 h-6 inline-block bg-[url('./assets/icon/setting@2x.png')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                  장치설정
                </Button>
              </div>
            </div>

            {/* 사이드 탭 */}
            <div className="py-[1.25rem] flex items-center flex-col justify-between gap-[1.125rem] left-0 top-[4.375rem] w-[4.375rem] h-[calc(100%-4.375rem)] bg-main rounded-bl-[.625rem]">
              <div className="flex flex-col gap-[.625rem] h-full">
                {/* <span className="cursor-pointer w-6 h-6 inline-block bg-[url('./assets/icon/section-arw-up-white@3x.png')] bg-no-repeat bg-center bg-contain"></span> */}
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  role="navigation"
                  selectionFollowsFocus
                  onChange={handleSideTabChange}
                >
                  <div className="flex flex-col gap-[.625rem] h-full">
                    {LIST.map((list, index) => {
                      return (
                        <Link
                          key={list.id}
                          to={`?section=${list.num}`}
                          className={`bg-mainButton/30 !p-0 leading-[2rem] rounded-lg border border-white ${list.num === section && "bg-yellow/100 border-none"} w-[3.125rem] h-[7.5rem] flex items-center justify-center hover:no-underline hover:text-white focus:no-underline focus:text-white text-white`}
                        >
                          <Tab
                            value={list.num}
                            label={
                              <span className="text-[1.875rem]">
                                {list.num}
                                <br />동
                              </span>
                            }
                            {...VerticalTab(index)}
                            className="!text-[1.875rem] !p-0 !min-w-[3.125rem]"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </Tabs>
                {/* <span className="cursor-pointer w-6 h-6 inline-block bg-[url('./assets/icon/section-arw-down-white@3x.png')] bg-no-repeat bg-center bg-contain"></span> */}
              </div>
            </div>

            <div className="w-[calc(100%-4.375rem)] h-[calc(100%-4.375rem)] left-[4.375rem] absolute p-6 top-[4.375rem] bg-[url('./assets/icon/green-house@2x.png')] bg-no-repeat bg-contain bg-center">
              {section === "1" && <ControlContent />}
              {section === "2" && <div>22222</div>}
              {section === "3" && <div>33333</div>}
            </div>
          </div>
        </div>
      </div>

      {isOpen && modalType === "control" && <ControlModal />}
      {isOpen && modalType === "device" && <DeviceModal />}
    </>
  );
};

export default WeatherControl;

const LIST = [
  { id: 1, num: "1" },
  { id: 2, num: "2" },
  { id: 3, num: "3" },
  { id: 4, num: "4" },
  { id: 5, num: "5" },
  { id: 6, num: "6" },
  { id: 7, num: "7" },
  { id: 8, num: "8" },
];
