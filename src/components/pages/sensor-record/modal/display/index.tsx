import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Modal from "@/components/common/modal";
import VerticalTab from "@/components/common/tab";
import CheckBox from "@/components/common/checkbox";
import Button from "@/components/common/button";

const SensorRecordDisplayModal = () => {
  const methods = useForm();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState("");
  const [value, setValue] = useState(1);

  // 사이드탭
  useEffect(() => {
    const parsedSection = searchParams.get("section");
    setSection(parsedSection ? parsedSection : "1");
  }, [location]);

  const handleSideTabChange = (newValue: number) => {
    setValue(newValue);
  };

  return (
    <FormProvider {...methods}>
      <Modal
        title="센서 표시 항목 (한번에 최대 4개)"
        className="w-fit h-auto z-100 px-[.9375rem] pr-[1.25rem] pt-[1.25rem] pb-[.625rem]"
      >
        <div className="w-full h-full flex justify-center items-start gap-4">
          {/* 사이드 탭 */}
          <div className="flex items-center flex-col justify-between gap-[1.125rem] sticky left-0 top-[5rem] w-[4.375rem] h-[calc(100%-5rem)] bg-main rounded-bl-[.625rem]">
            <div className="flex flex-col gap-[.625rem] h-[80vh] pt-3">
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

          <div className="h-[76vh] flex flex-col w-full justify-between mt-[1.875rem]">
            <div className="h-[70vh] overflow-hidden flex flex-col justify-between overflow-y-auto">
              <div className="overflow-auto h-full">
                <table className="table-fixed border-spacing-0 border-collapse w-full border border-white text-[.8125rem]">
                  <thead className="bg-bg2">
                    <tr>
                      {TABLE_HEAD.map((value, id) => {
                        return (
                          <th
                            key={id}
                            className={`w-[${value.width}%] font-normal border p-3 whitespace-nowrap sticky top-0 bg-bg2`}
                          >
                            <div className="flex justify-center items-center">
                              {value.name}
                            </div>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>

                  <tbody className="bg-red2">
                    {TABLE_BODY.map((value, id) => {
                      return (
                        <tr key={id} className="text-center">
                          <td className="border p-[.625rem] h-[2.5rem]">
                            {value.no}
                          </td>
                          <td className="border p-[.625rem] h-[2.5rem]">
                            <div className="flex justify-center items-center h-full">
                              {value.chekbox}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-between">
              <CheckBox
                registerName="test"
                labelTitle="센서별 y축 표시"
                className="!gap-2"
              />
              <Button customType="MAIN" className="">
                선택
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default SensorRecordDisplayModal;

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

const TABLE_HEAD = [
  { name: "센서", width: "80" },
  { name: "선택", width: "20" },
];

const TABLE_BODY = [
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "37",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "37",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "37",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "37",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
  {
    chekbox: <input type="checkbox" className="w-4 h-4" />,
    no: "",
  },
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
