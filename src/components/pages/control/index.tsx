import { useContext, useEffect, useState } from "react";

// import useGlobalQuery from "@/hooks/global/useGlobalQuery";
// import { useGetSensor } from "@/hooks/service/control/useGetSensor";
import useSensor from "@/hooks/service/control/useSensor";
import useControl from "@/hooks/service/control/useControl";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import { ColBar, RowBar, RowReverseBar } from "@/components/common/slider";
import BtnControl from "@/components/pages/control/modal/button-control";
import BtnControlModal from "@/components/pages/control/modal/button-control/buttonControl";
import SliderControl from "@/components/pages/control/modal/slider-control";
import { ControlData, SensorData, SensorDtoList } from "control";

export type initialData = {
  id: number;
  no: number;
  enable: number;
  shape: number;
  shapeName: string;
  location: number;
  outputNo: number;
  value: number;
  controlMode: number;
  houseNo: string;
  farmCode: string;
};

const ControlContent = ({
  modalType,
  setModalType,
}: {
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isOpen, onOpenModal } = useContext(ModalContext);

  const [toggle, setToggle] = useState<boolean>(false);
  const [cctv, setCctv] = useState<boolean>(false);
  const [controlBtn, setControlBtn] = useState<string>("");
  const [sliderValue, setSliderValue] = useState({});
  const [data, setData] = useState([]);

  const { sensorData } = useSensor();
  const { controlData } = useControl();

  // const { data: sensorList } = useGlobalQuery(useGetSensor);

  const slierLeftTop = controlData.find((item) => item.location === 7);
  const slierRightTop = controlData.find((item) => item.location === 8);

  const handelModifyBtn = (name: string) => {
    setControlBtn(name);
    setModalType("btn");
    onOpenModal();
  };

  const sensorDataFunc = (id: number) => {
    const sensorDataList: SensorData | undefined = sensorData.find(
      (item: SensorData) => item.id === 74,
    );

    return sensorDataList?.sensorDtoList.find(
      (item: SensorDtoList) => item.id === id,
    ).value;
  };

  const controlDataFunc = (location: number) => {
    const controlDataList = controlData?.find(
      (item) => item.location === location,
    );

    return controlDataList?.value;
  };

  // 변경한 슬라이더 위치, 값 저장
  const handleSliderChange = (location: number, value: number) => {
    setSliderValue((prevValues) => ({
      ...prevValues,
      [location]: value,
    }));
  };

  // 변경한 슬라이더 값 업데이트
  const updateControlData = async () => {
    const updatedData = controlData.map((item) => {
      const { location } = item;
      if (sliderValue.hasOwnProperty(location)) {
        return { ...item, value: sliderValue[location] };
      }
      return item;
    });

    setData(updatedData);
  };

  useEffect(() => {
    updateControlData();
  }, [controlData, sliderValue]);

  return (
    <>
      {/* 시간 */}
      <div className="w-full h-[5.3125rem] bg-[#fff] rounded-md shadow-lg flex justify-between items-center px-[1.25rem]">
        <div className="flex flex-col items-center mt-[1.25rem] gap-1">
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('src/assets/icon/section_arw_left@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
          <span>00시</span>
        </div>
        <ul className="flex justify-center items-center h-full gap-1 mb-0">
          {TIME_LIST.map((e) => {
            return (
              <li
                key={e.time}
                className="cursor-pointer text-[1.375rem] font-bold text-black/30 p-1 lg:min-w-[2.5rem] max-w-[3.4375rem] h-[2.625rem] bg-sub/50 flex justify-center items-center"
              >
                {e.time}
              </li>
            );
          })}
        </ul>
        <div className="flex flex-col items-center mt-[1.25rem] gap-1">
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('src/assets/icon/section_arw_right@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
          <span>24시</span>
        </div>
      </div>

      {/* 상단 버튼 및 정보 영역 */}
      <div className="w-full mt-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          {CONTROL_LIST.map((list) => {
            return (
              <Button
                key={list.id}
                customType={`${list.name === "운전 시작" ? "GREEN" : list.name === "긴급 제어" ? "RED" : "SUB"}`}
                className="w-[7.5rem]"
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
                <img
                  src={`src/assets/icon/${list.img}`}
                  alt="icon"
                  className="w-[2.5rem] h-[2.5rem]"
                />
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
      <div className="w-full mt-2 border relative">
        <div className="w-full px-[4.25rem]">
          <div className="flex justify-between">
            <div
              className={`flex justify-end flex-col-reverse gap-2 ${modalType === "slider" && "z-30"}`}
            >
              {controlData?.map((object: ControlData) => {
                return (
                  <>
                    {object.location === 13 && (
                      <RowBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(13)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                      />
                    )}
                    {object.location === 11 && (
                      <>
                        <RowBar
                          setModalType={setModalType}
                          currentValue={controlDataFunc(11)}
                          location={object.location}
                          sliderValue={handleSliderChange}
                        />
                      </>
                    )}
                    {object.location === 9 && (
                      <RowBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(9)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                      />
                    )}
                  </>
                );
              })}
            </div>

            <div className="flex flex-col items-center z-10">
              <span className="w-[6.875rem] h-[6.875rem] inline-block bg-[url('src/assets/icon/fan@2x.svg')] bg-contain bg-no-repeat"></span>
              <Button
                onClick={() => {
                  setCctv((prev) => !prev);
                }}
                className="w-[5.625rem] h-[5.625rem] bg-[url('src/assets/icon/cctv-icon-black@2x.svg')] bg-contain bg-no-repeat"
              ></Button>
            </div>
            <div
              className={`flex justify-end flex-col-reverse gap-2 ${modalType === "slider" && "z-30"}`}
            >
              {controlData?.map((object: ControlData) => {
                return (
                  <>
                    {object.location === 14 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(14)}
                      />
                    )}
                    {object.location === 12 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(12)}
                      />
                    )}
                    {object.location === 10 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(10)}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex justify-between absolute top-0 left-0 w-full">
          <div
            className={`flex flex-col gap-2 ${modalType === "slider" && "z-20"}`}
          >
            {slierLeftTop && (
              <ColBar
                setModalType={setModalType}
                currentValue={controlDataFunc(7)}
              />
            )}
            <div className="grid grid-cols-3 gap-2 flex-col-reverse max-w-[29.875rem] ">
              {controlData?.map((value: ControlData) => {
                return (
                  <>
                    {value.location === 5 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(5)}
                      />
                    )}
                    {value.location === 3 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(3)}
                      />
                    )}
                    {value.location === 1 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(1)}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 items-end ${modalType === "slider" && "z-20"}`}
          >
            {slierRightTop && (
              <ColBar
                setModalType={setModalType}
                currentValue={controlDataFunc(8)}
              />
            )}
            <div className="flex gap-2">
              {controlData?.map((value: ControlData) => {
                return (
                  <>
                    {value.location === 2 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(2)}
                      />
                    )}
                    {value.location === 4 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(4)}
                      />
                    )}
                    {value.location === 6 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(6)}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* cctv 영역 */}
      {cctv && (
        <div className="z-10 w-[50%] h-[37%] bg-sub absolute bottom-[4.375rem] left-[50%] translate-x-[-50%]">
          <video id="test_video" controls autoPlay className="w-full h-full">
            <source src="" />
          </video>
        </div>
      )}

      {/* 하단 버튼 영역 */}
      <div className="absolute bottom-6 left-0 px-6 w-full flex flex-col gap-[3.125rem] justify-center items-center">
        <div className="z-7 w-[17.5rem] h-[11.25rem] p-4 bg-white shadow-lg rounded-md absolute bottom-[4.0625rem]">
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
              const value = (name: string) => {
                switch (name) {
                  case "온도":
                    return <>{sensorDataFunc(75)}</>;
                  case "습도":
                    return <>{sensorDataFunc(76)}</>;
                  case "CO₂":
                    return <>{sensorDataFunc(77)}</>;
                  case "일사":
                    return <>{sensorDataFunc(78)}</>;
                  case "Pt100":
                    return <>{sensorDataFunc(79)}</>;
                  case "pH":
                    return <>{sensorDataFunc(80)}</>;
                  case "EC":
                    return <>{sensorDataFunc(81)}</>;
                  default:
                    return;
                }
              };
              return (
                <li
                  key={list.id}
                  className={`flex items-center ${!list.img && "justify-center"} text-[1.5rem] font-bold gap-[1.5rem] px-[.625rem] w-full`}
                >
                  {list.img && (
                    <img
                      src={`src/assets/icon/${list.img}`}
                      alt="icon"
                      className="w-[2.5rem] h-[2.5rem] p-1"
                    />
                  )}
                  <div>
                    {list.name} : {value(list.name)}
                    {list.name === "EC" ? (
                      <span className="text-[1.375rem]">{list.unit}</span>
                    ) : (
                      `${list.unit}`
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-4 justify-center items-center">
          {BTN_LIST.map((list) => {
            return (
              <Button
                key={list.id}
                customType="DEFAULT"
                className={`flex justify-center items-center w-[7.5rem] h-[2.25rem] !text-[1.25rem] ${list.name === "냉방" ? "bg-green text-white" : list.name === "제습" ? "bg-blue text-white" : list.name === "환풍" ? "bg-yellow text-white" : null}`}
                onClick={() => {
                  handelModifyBtn(list.name);
                }}
              >
                {list.name}
              </Button>
            );
          })}
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-60">
          {modalType === "btn" && (
            <BtnControl controlBtn={controlBtn} setModalType={setModalType} />
          )}
          {modalType === "btn-control" && (
            <BtnControlModal controlBtn={controlBtn} />
          )}
          {modalType === "slider" && <SliderControl data={data} />}
        </div>
      )}
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
    img: "temper-icon3@2x.svg",
  },
  {
    id: 2,
    name1: "강우",
    name2: "일사",
    value1: "1 mm",
    value2: "18W/㎡",
    img: "sun-icon@2x.svg",
  },
  {
    id: 3,
    name1: "풍향",
    name2: "풍속",
    value1: "246 ˚",
    value2: "0 m/s",
    img: "wind-icon@2x.svg",
  },
];

const INFO_LIST2 = [
  {
    id: 1,
    name: "온도",
    unit: "℃",
    img: "temper-icon3@2x.svg",
  },
  {
    id: 2,
    name: "습도",
    unit: "%",
    img: "sensor_humidity_2@2x.svg",
  },
  {
    id: 3,
    name: "CO₂",
    unit: "ppm",
    img: "sensor-co2@2x.svg",
  },
  {
    id: 4,
    name: "일사",
    unit: "W/㎡",
    img: "sun-icon@2x.svg",
  },
];

const INFO_LIST3 = [
  {
    id: 1,
    name: "Pt100",
    unit: "℃",
    img: "temper-icon@2x.svg",
  },
  {
    id: 2,
    name: "pH",
    unit: "pH",
    img: "ph.svg",
  },
  {
    id: 3,
    name: "EC",
    unit: "mD/cm",
    img: "ec.svg",
  },
];
