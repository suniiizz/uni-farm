import Button from "@/components/common/button";
import { ColBar, RowBar } from "@/components/common/slider";
import { useState } from "react";

const ControlContent = () => {
  const [toggle, setToggle] = useState(false);
  const [cctv, setCctv] = useState(false);

  return (
    <>
      {/* 시간 */}
      <div className="w-full h-[5.3125rem] bg-[#fff] rounded-md shadow-lg flex justify-between items-center px-[1.25rem]">
        <div className="flex flex-col items-center mt-[1.25rem] gap-1">
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('./assets/icon/section_arw_left@2x.png')] bg-no-repeat bg-center bg-contain"></span>
          <span>00시</span>
        </div>
        <ul className="flex justify-center items-center h-full gap-1 mb-0">
          {TIME_LIST.map((e) => {
            return (
              <li
                key={e.time}
                className="cursor-pointer text-[1.75rem] font-bold text-black/30 p-1 min-w-[2.5rem] max-w-[3.4375rem] h-[2.625rem] bg-sub/50 flex justify-center items-center"
              >
                {e.time}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col items-center mt-[1.25rem] gap-1">
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('./assets/icon/section_arw_right@2x.png')] bg-no-repeat bg-center bg-contain"></span>
          <span>24시</span>
        </div>
      </div>

      {/* 상단 버튼 및 정보 영역 */}
      <div className="w-full mt-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {CONTROL_LIST.map((list) => {
            return (
              <Button
                key={list.id}
                customType={`${list.name === "운전 시작" ? "GREEN" : list.name === "긴급 제어" ? "RED" : "SUB"}`}
                className="min-w-[8.625rem]"
              >
                {list.name}
              </Button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          {INFO_LIST1.map((list) => {
            return (
              <div
                key={list.id}
                className="bg-[#fff] rounded-md p-4 flex justify-center items-center gap-5 h-[4.375rem] shadow-lg"
              >
                <span
                  className={`w-[2.5rem] h-[2.5rem] inline-block bg-[url('./assets/icon/${list.img}')] bg-no-repeat bg-center bg-contain`}
                ></span>
                <span>
                  {list.name1}: {list.value1} <br />
                  {list.name2}: {list.value2}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 제어 영역 */}
      <div className="w-full mt-4 border relative">
        <div className="w-full px-[4.25rem]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <RowBar />
              <RowBar />
              <RowBar />
            </div>
            <div className="flex flex-col items-center z-10">
              <span className="w-[6.875rem] h-[6.875rem] inline-block bg-[url('./assets/icon/fan@2x.png')] bg-contain bg-no-repeat"></span>
              <Button
                onClick={() => {
                  setCctv((prev) => !prev);
                }}
                className="w-[5.625rem] h-[5.625rem] bg-[url('./assets/icon/cctv-icon-black@2x.png')] bg-contain bg-no-repeat"
              ></Button>
            </div>
            <div className="flex flex-col gap-2">
              <RowBar />
              <RowBar />
              <RowBar />
            </div>
          </div>
        </div>
        <div className="flex justify-between absolute top-0 left-0 w-full">
          <div className="flex flex-col gap-2">
            <ColBar />
            <div className="flex gap-2">
              <ColBar />
              <ColBar />
              <ColBar />
            </div>
          </div>
          <div className="flex flex-col gap-2 items-end">
            <ColBar />
            <div className="flex gap-2">
              <ColBar />
              <ColBar />
              <ColBar />
            </div>
          </div>
        </div>
      </div>

      {/* cctv 영역 */}
      {cctv && (
        <div className="z-10 w-[50rem] h-[25rem] bg-sub absolute bottom-[6rem] left-[50%] translate-x-[-50%]">
          <video>
            <source src="" />
          </video>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="absolute bottom-6 left-0 px-6 w-full flex flex-col gap-[3.125rem] justify-center items-center">
        <div className="z-7 w-[20.9375rem] h-[13.9375rem] p-4 bg-white shadow-lg rounded-md absolute bottom-[4.5rem]">
          <div className="absolute right-[.25rem] top-[.25rem]">
            <Button
              className="bg-green2 border-[#707070] rounded-md w-[1.125rem] h-[1.125rem] !p-0"
              onClick={() => {
                setToggle((prev) => !prev);
              }}
            ></Button>
          </div>
          <ul className="mb-0 w-full flex flex-col justify-center items-center h-full">
            {(!toggle ? INFO_LIST2 : INFO_LIST3).map((list) => {
              return (
                <li
                  key={list.id}
                  className="flex items-center text-[2rem] font-bold gap-[2.5rem] px-[.625rem] w-full "
                >
                  <span
                    className={`w-[2.5rem] h-[2.5rem] inline-block bg-[url('./assets/icon/${list.img}')] bg-no-repeat bg-center bg-contain`}
                  ></span>
                  <div>
                    {list.name} :{" "}
                    {list.name === "EC" ? (
                      <span className="text-[1.375rem]">{list.value}</span>
                    ) : (
                      `${list.value}`
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-6 justify-center items-center">
          {BTN_LIST.map((list) => {
            return (
              <Button
                key={list.id}
                customType="DEFAULT"
                className={`max-w-[8.125rem] h-12 !text-[1.5rem] ${list.name === "냉방" ? "bg-green text-white" : list.name === "제습" ? "bg-blue text-white" : list.name === "환풍" ? "bg-yellow text-white" : null}`}
              >
                {list.name}
              </Button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ControlContent;

const TIME_LIST = [
  { time: "1" },
  { time: "2" },
  { time: "3" },
  { time: "4" },
  { time: "5" },
  { time: "6" },
  { time: "7" },
  { time: "8" },
  { time: "9" },
  { time: "10" },
  { time: "11" },
  { time: "12" },
  { time: "13" },
  { time: "14" },
  { time: "15" },
  { time: "16" },
  { time: "17" },
  { time: "18" },
  { time: "19" },
  { time: "20" },
  { time: "21" },
  { time: "22" },
  { time: "23" },
  { time: "24" },
];

const CONTROL_LIST = [
  { id: 1, name: "운전 시작" },
  { id: 2, name: "긴급 제어" },
  { id: 3, name: "그룹 제어" },
  { id: 4, name: "자동 제어 복귀" },
];

const BTN_LIST = [
  { id: 1, name: "냉방" },
  { id: 2, name: "난방" },
  { id: 3, name: "제습" },
  { id: 4, name: "가습" },
  { id: 5, name: "환풍" },
  { id: 6, name: "공급" },
  { id: 7, name: "급수" },
  { id: 8, name: "관수" },
];

const INFO_LIST1 = [
  {
    id: 1,
    name1: "기온",
    name2: "습기",
    value1: "15.8 ℃",
    value2: "31.4 %",
    img: "temper-icon3@2x",
  },
  {
    id: 2,
    name1: "강우",
    name2: "일사",
    value1: "1 mm",
    value2: "18W/㎡",
    img: "sun-icon@2x",
  },
  {
    id: 3,
    name1: "풍향",
    name2: "풍속",
    value1: "246 ˚",
    value2: "0 m/s",
    img: "wind-icon@2x",
  },
];

const INFO_LIST2 = [
  { id: 1, name: "온도", value: "℃", img: "temper-icon3@2x.png" },
  { id: 2, name: "습도", value: "%", img: "sensor_humidity_2@2x.png" },
  { id: 3, name: "CO₂", value: "ppm", img: "sensor-co2@2x.png" },
  { id: 4, name: "일사", value: "W/㎡", img: "sun-icon@2x.png" },
];

const INFO_LIST3 = [
  { id: 1, name: "Pt100", value: "℃", img: "" },
  { id: 2, name: "pH", value: "pH", img: "" },
  { id: 3, name: "EC", value: "mD/cm", img: "" },
];
