import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

// import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import VerticalTab from "@/components/common/tab";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Calendar from "@/components/common/calendar";

const ControlRecord = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState("");
  const [value, setValue] = useState(1);
  // const [modalType, setModalType] = useState("");
  // const { isOpen, onOpenModal } = useContext(ModalContext);
  const methods = useForm();

  useEffect(() => {
    const parsedSection = searchParams.get("section");
    setSection(parsedSection ? parsedSection : "1");
  }, [location]);

  const handleSideTabChange = (newValue: number) => {
    setValue(newValue);
  };

  // const handleOpenModal = (type: string) => {
  //   setModalType(type);
  //   onOpenModal();
  // };

  return (
    <>
      <FormProvider {...methods}>
        <div className="w-full">
          <div className="m-6 bg-main rounded-[.625rem] h-[calc(100vh-6.75rem)]">
            {/* 상단 타이틀 */}
            <div className="h-full relative">
              <div className="h-[4.375rem] p-6 bg-main rounded-t-[.625rem] border-b border-mainLine flex justify-between items-center relative">
                <div className="flex gap-6 items-center">
                  <h2 className="text-[1.5rem] text-[#fff] font-bold">
                    제어기록
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar />
                  <Calendar />
                  <Button
                    customType="MAIN"
                    className="w-[7.5rem] gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                    // onClick={() => handleOpenModal("register")}
                  >
                    <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/check-icon@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                    표시항목
                  </Button>
                  <Button
                    customType="MAIN"
                    className="w-auto gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                    // onClick={() => handleOpenModal("control")}
                  >
                    <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/data_log@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                    데이터 보기
                  </Button>
                </div>
              </div>
              {/* 사이드 탭 */}
              <div className="py-[.625rem] flex items-center flex-col justify-between gap-[1.125rem] left-0 top-[4.375rem] w-[4.375rem] h-[calc(100%-4.375rem)] bg-main rounded-bl-[.625rem]">
                <div className="flex flex-col gap-[.625rem] h-full">
                  <CustomTabs
                    orientation="vertical"
                    variant="scrollable"
                    role="navigation"
                    value={value}
                    scrollButtons
                    allowScrollButtonsMobile
                    onChange={() => handleSideTabChange(value)}
                    className="justify-between h-full"
                  >
                    <div className="flex flex-col gap-[.625rem] h-full">
                      {LIST.map((list) => {
                        return (
                          <Link
                            key={list.id}
                            to={`?section=${list.num}`}
                            className={`bg-mainButton/30 !p-0 leading-[2rem] rounded-lg border border-white ${list.num === section && "bg-yellow/100 border-none"} w-[3.125rem] h-[7.5rem] flex items-center justify-center hover:no-underline hover:text-white focus:no-underline focus:text-white text-white`}
                          >
                            <Tab
                              value={list.num}
                              label={
                                <span className="text-[1.5rem]">
                                  {list.num}
                                  <br />동
                                </span>
                              }
                              {...VerticalTab(list.id)}
                              className="!text-[1.875rem] !p-0 !min-w-[3.125rem]"
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </CustomTabs>
                </div>
              </div>

              {/* 컨텐츠 */}
              <div className="w-[calc(100%-4.375rem)] h-[calc(100%-4.375rem)] left-[4.375rem] absolute pl-2 pr-6 py-6 top-[4.375rem]">
                {section === "1" && <div>11111</div>}
                {section === "2" && <div>22222</div>}
                {section === "3" && <div>33333</div>}
              </div>
            </div>
          </div>
        </div>

        {/* {isOpen && modalType === "control" && <RegisterModal />} */}
      </FormProvider>
    </>
  );
};

export default ControlRecord;

const LIST = [
  { id: 1, num: "1" },
  { id: 2, num: "2" },
  { id: 3, num: "3" },
  { id: 4, num: "4" },
  { id: 5, num: "5" },
  { id: 6, num: "6" },
  { id: 7, num: "7" },
  { id: 8, num: "8" },
  { id: 9, num: "9" },
];

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-scrollButtons.Mui-disabled": {
    opacity: "100",
  },
  "& .MuiTabs-scrollButtons": {
    background: `url('../src/assets/icon/section-arw-up-white@3x.svg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    width: "3.125rem",
    height: "2.5rem",
    "&:last-child": {
      transform: "rotate(180deg)",
    },
  },
  "& .MuiSvgIcon-fontSizeSmall": {
    display: "none",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});
