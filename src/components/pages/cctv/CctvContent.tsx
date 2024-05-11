import { useEffect, useRef, useState } from "react";

import { loadPlayer } from "rtsp-relay/browser";

import { ControlData } from "control";
import { CctvDataList } from "control";
import { updateControlData } from "@/http/control";

import { RowBar } from "@/components/common/slider";
import Select from "@/components/common/select";
import Button from "@/components/common/button";

export const CctvContent = ({
  controlData,
  setModalType,
  section,
  cctvData,
}: {
  controlData: ControlData[];
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  section: string;
  cctvData: CctvDataList[];
}) => {
  const [optionValue, setOptionValue] = useState<number>(0); //선택한 위치 옵션 location값
  const [sliderValue, setSliderValue] = useState<Array<number>>([]); //수동 조절 시 슬라이더 값
  const [controlDataUpdate, setControlDataUpdate] = useState<ControlData[]>([]); //슬라이더 값 저장 데이터
  const [sliderData, setSliderData] = useState<number>(0); //선택한 위치 옵션 슬라이더 값

  // 위치 옵션 리스트
  const createOptionList = () => {
    const sample = {
      id: 0,
      name: "선택",
      value: 0,
      sliderValue: 0,
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

    optionList.unshift(sample);

    return optionList;
  };

  const optionList = createOptionList();

  // 선택한 위치 옵션 슬라이더 값 데이터
  const handelLocationSelect = (value: string) => {
    setOptionValue(parseInt(value));

    const controlDataList = controlData.find(
      (item: ControlData) => item.location.toString() === value.toString(),
    );

    if (controlDataList) return setSliderData(controlDataList?.value);
  };

  // 수동 조절 시 슬라이더 위치, 값 저장
  const handleSliderChange = (location: number, value: number) => {
    setSliderValue((prevValues) => ({
      ...prevValues,
      [location]: value,
    }));
  };

  // 수동 조절 시 슬라이더 값 업데이트
  const handleUpdateControlValue = () => {
    const updatedData = controlData.map((item: ControlData) => {
      const { location } = item;
      if (location in sliderValue) {
        return { ...item, value: sliderValue[location], controlMode: 2 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    setControlDataUpdate(updatedData);
  };

  useEffect(() => {
    handleUpdateControlValue();
  }, [controlData, sliderValue]);

  // 슬라이더 작동 / 중지 버튼
  const handleActionBtn = (name: string) => {
    if (name === "작동") {
      // 작동 요청
      updateControlData(section, JSON.stringify(controlDataUpdate));

      alert("작동하였습니다.");
    } else {
      alert("준비중 입니다.");
    }
  };

  // [CCTV] 가상 데이터
  // const urlData = [
  //   "ws://222.111.61.156:2000/api/hikvision/admin:choij65@@121.164.215.196:554/102",
  //   "ws://222.111.61.156:2000/api/hikvision/admin:choij65@@121.164.215.196:554/102",
  // ];

  // [CCTV]
  // url 리스트
  const urlData = cctvData.map((item) => item.ip);

  const canvasRefs = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    canvasRefs.current = [];
  }, []);

  const connectToCCTV = (url: string, canvasIndex: number) => {
    setTimeout(() => {
      loadPlayer({
        url: url,
        canvas: canvasRefs.current[canvasIndex],
        onDisconnect: () => console.log("Connection lost!"),
      });

      console.log("성공!!!");
      canvasRefs.current[canvasIndex].style.display = "block";
    }, 1000);
  };

  const handleCctvConnect = (urlList: string[]) => {
    urlList.forEach((url, index) => {
      connectToCCTV(url, index);
    });
  };

  useEffect(() => {
    handleCctvConnect(urlData);
  }, [controlData]);

  return (
    <div className="h-full flex flex-col gap-10">
      {/* cctv 화면 */}
      <ul className="flex flex-wrap bg-[#3C3C3C] h-[90%]">
        {CCTV_LIST.map((list, index) => {
          return (
            <li key={list.id} className="w-1/2 h-1/2 text-white">
              <canvas
                ref={(ref) => {
                  canvasRefs.current[index] = ref as HTMLCanvasElement;
                }}
                style={{ width: "100%", height: "100%" }}
              />
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
            currentValue={sliderData}
            sliderData={sliderData}
            setSliderData={setSliderData}
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
