import { useState } from "react";

import { ControlData } from "control";

import { RowBar } from "@/components/common/slider";
import Select from "@/components/common/select";
import Button from "@/components/common/button";

export const CctvContent = ({
  controlData,
  setModalType,
  section,
}: {
  controlData: ControlData[];
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  section: string;
}) => {
  const [optionValue, setOptionValue] = useState(0);
  const [sliderValue, setSliderValue] = useState<Array<number>>([]);

  console.log("optionValue", optionValue);
  console.log("sliderValue", sliderValue);

  const handelLocationSelect = (value: string) => {
    setOptionValue(parseInt(value));
  };

  const optionList = controlData.map((option) => {
    const { shapeName, location, value } = option;

    return {
      id: location,
      name: `[${section}]동 ` + (shapeName ?? "-"),
      value: location,
      sliderValue: value,
    };
  });

  // 선택 옵션 슬라이더 값 데이터
  const controlDataFunc = (location: number) => {
    const controlDataList = controlData.find(
      (item: ControlData) => item.location === location,
    );

    return controlDataList?.value ?? 77;
  };

  // 수동 조절 슬라이더 위치, 값 저장
  const handleSliderChange = (location: number, value: number) => {
    setSliderValue((prevValues) => ({
      ...prevValues,
      [location]: value,
    }));
  };

  // 수동 조절 슬라이더 값 업데이트
  // const handleUpdateControlValue = () => {
  //   const updatedData = controlData.map((item: ControlData) => {
  //     const { location } = item;
  //     if (location in sliderValue) {
  //       return { ...item, value: sliderValue[location], controlMode: 2 };
  //     } else {
  //       return { ...item, controlMode: 0 };
  //     }
  //   });

  //   setControlDataUpdate(updatedData);
  // };

  // 슬라이더 동작 버튼
  const handleActionBtn = (name: string) => {
    if (name === "작동") {
      console.log("hello");
    }
  };

  return (
    <div className="h-full flex flex-col gap-10">
      {/* cctv 화면 */}
      <ul className="flex flex-wrap border bg-[#3C3C3C] h-[90%]">
        {CCTV_LIST.map((list) => {
          return (
            <li key={list.id} className="w-1/2 h-1/2 border text-white">
              {list.num}
            </li>
          );
        })}
      </ul>
      {/* 설정 */}
      <div className="h-[10%] w-full flex items-center">
        <div className="w-full flex gap-2 items-center">
          <Select
            registerName="option"
            options={optionList}
            selectWrap="!w-[12.5rem]"
            onChange={(e) => handelLocationSelect(e.target.value)}
          />
          <RowBar
            setModalType={setModalType}
            currentValue={controlDataFunc(optionValue)}
            location={optionValue}
            sliderValue={handleSliderChange}
          />
          <div className="flex gap-2">
            {BTN_LIST.map((list) => {
              return (
                <Button
                  key={list.id}
                  customType="MAIN"
                  className="w-[6.25rem] h-[2.8125rem]"
                  onClick={() => handleActionBtn(list.name)}
                >
                  {list.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const CCTV_LIST = [
  { id: 1, num: "1" },
  { id: 2, num: "2" },
  { id: 3, num: "3" },
  { id: 4, num: "4" },
];

const BTN_LIST = [
  { id: 1, name: "작동" },
  { id: 2, name: "중지" },
];
