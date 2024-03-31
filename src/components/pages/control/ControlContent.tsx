import { useContext, useEffect, useState } from "react";

// import useGlobalQuery from "@/hooks/global/useGlobalQuery";
// import { useGetSensor } from "@/hooks/service/control/useGetSensor";
import useSensor from "@/hooks/service/control/useSensor";
import useControl from "@/hooks/service/control/useControl";
import useManual from "@/hooks/service/control/useManual";
import { updateControlData, updateManualData } from "@/http/control";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import { ColBar, RowBar, RowReverseBar } from "@/components/common/slider";
import SliderControl from "@/components/pages/control/modal/slider-control";
import { ControlData, ManualData, SensorData, SensorDtoList } from "control";
import GroupControl from "./modal/control-button/groupControl";
import ManualControl from "@/components/pages/control/modal/manual-button";
import ManualControlModal from "@/components/pages/control/modal/manual-button/manualControl";

const ControlContent = ({
  modalType,
  setModalType,
}: {
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { isOpen, onOpenModal, onCloseModal } = useContext(ModalContext);

  const [toggle, setToggle] = useState<boolean>(false);
  const [controlBtn, setControlBtn] = useState<string>("");
  const [manualBtn, setManualBtn] = useState<string>("");
  const [sliderValue, setSliderValue] = useState({});
  const [cctv, setCctv] = useState<boolean>(false);
  const [sliderChecked, setSliderChecked] = useState<Array<number>>([]);
  const [manualChecked, setManualChecked] = useState<Array<number>>([]);

  const { sensorData } = useSensor();
  const { controlData } = useControl();
  const { manualData } = useManual();

  // const { data: sensorList } = useGlobalQuery(useGetSensor);

  // 상단 그룹 제어 버튼 모달
  const handleControlBtn = (name: string) => {
    setControlBtn(name);
    setModalType("group");
    onOpenModal();
  };

  // 슬라이더 체크리스트
  const handleSliderChecked = (location: number) => {
    if (modalType !== "group") return;

    const isClicked = sliderChecked.includes(location);

    if (isClicked) {
      setSliderChecked((prev) => prev.filter((id) => id !== location));
    } else {
      setSliderChecked((prev) => [...prev, location]);
    }
  };

  // 하단 제어 버튼 체크리스트
  const handleManualChecked = (no: number) => {
    if (modalType !== "group") return;

    const isClicked = manualChecked.includes(no);

    if (isClicked) {
      setManualChecked((prev) => prev.filter((id) => id !== no));
    } else {
      setManualChecked((prev) => [...prev, no]);
    }
  };

  // [긴급 제어] 슬라이더 데이터 패칭
  const updateEmergencyControlData = () => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, value: 210, controlMode: 4 };
      }
      return item;
    });

    updateControlData(JSON.stringify(selectLocation));
  };

  // [긴급 제어] 하단 제어 버튼 데이터 패칭
  const updateEmergencyManualData = () => {
    const selectManual = manualData.map((item: ControlData) => {
      const { no } = item;
      if (manualChecked.includes(no)) {
        return { ...item, value: 210, controlMode: 4 };
      }
      return item;
    });

    updateManualData(JSON.stringify(selectManual));
  };

  // [그룹 제어] 데이터 패칭
  const updateGroupControlData = (inputValue: number) => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, value: inputValue, controlMode: 7 };
      }
      return item;
    });

    updateControlData(JSON.stringify(selectLocation));
  };

  // [자동 제어 복귀] 슬라이더 데이터 패칭
  const updateAutoControlData = () => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, controlMode: 7 };
      }
      return item;
    });

    updateControlData(JSON.stringify(selectLocation));
  };

  // [자동 제어 복귀] 하단 제어 버튼 데이터 패칭
  const updateAutoManualData = () => {
    const selectManual = manualData.map((item: ManualData) => {
      const { no } = item;
      if (manualChecked.includes(no)) {
        return { ...item, controlMode: 7 };
      }
      return item;
    });

    updateManualData(JSON.stringify(selectManual));
  };

  // 평균 데이터 박스
  const sensorDataFunc = (id: number) => {
    const sensorDataList: SensorData | undefined = sensorData.find(
      (item: SensorData) => item.id === 74,
    );

    return sensorDataList?.sensorDtoList.find(
      (item: SensorDtoList) => item.id === id,
    ).value;
  };

  // 7,8 슬라이더 위치
  const slierLeftTop = controlData.find(
    (item: ControlData) => item.location === 7,
  );
  const slierRightTop = controlData.find(
    (item: ControlData) => item.location === 8,
  );

  // 현재 슬라이더 값 데이터
  const controlDataFunc = (location: number) => {
    const controlDataList: ControlData | undefined = controlData.find(
      (item: ControlData) => item.location === location,
    );

    return controlDataList?.value;
  };

  // 수동 조절 슬라이더 위치, 값 저장
  const handleSliderChange = (location: number, value: number) => {
    setSliderValue((prevValues) => ({
      ...prevValues,
      [location]: value,
    }));
  };

  // 수동 조절 슬라이더 값 업데이트
  const handleUpdateControlValue = () => {
    const updatedData = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderValue.hasOwnProperty(location)) {
        return { ...item, value: sliderValue[location], controlMode: 2 };
      }
      return item;
    });

    updateControlData(JSON.stringify(updatedData));
  };

  useEffect(() => {
    handleUpdateControlValue();
  }, [controlData, sliderValue]);

  // 하단 제어 버튼 모달
  const handleManualBtn = (name: string) => {
    if (modalType === "group") return;

    setManualBtn(name);
    setModalType("manual");
    onOpenModal();
  };

  // 하단 제어 버튼 on/off
  const handleManualMove = (control: string, id?: number) => {
    const updatedManualData = manualData.map((item: ManualData) => {
      if (control === "on" && item.no === id) {
        return { ...item, value: 100, controlMode: 1 };
      }
      if (control === "off" && item.no === id) {
        return { ...item, value: 0, controlMode: 1 };
      }
      return item;
    });

    updateManualData(JSON.stringify(updatedManualData));

    onCloseModal();
  };

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
                onClick={() => {
                  handleControlBtn(list.name);
                }}
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
              className={`${(modalType === "slider" || modalType === "group") && "z-40"} flex justify-end flex-col-reverse gap-2`}
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
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 11 && (
                      <>
                        <RowBar
                          setModalType={setModalType}
                          currentValue={controlDataFunc(11)}
                          location={object.location}
                          sliderValue={handleSliderChange}
                          disabled={modalType === "group" ? true : false}
                          handleSliderChecked={handleSliderChecked}
                          sliderChecked={sliderChecked}
                        />
                      </>
                    )}
                    {object.location === 9 && (
                      <RowBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(9)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        zIndex
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
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
              className={`${(modalType === "slider" || modalType === "group") && "z-40"} flex justify-end flex-col-reverse gap-2`}
            >
              {controlData?.map((object: ControlData) => {
                return (
                  <>
                    {object.location === 14 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(14)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 12 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(12)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 10 && (
                      <RowReverseBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(10)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        zIndex
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
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
            className={`${(modalType === "slider" || modalType === "group") && "z-30"} flex flex-col gap-2`}
          >
            {slierLeftTop && (
              <ColBar
                setModalType={setModalType}
                currentValue={controlDataFunc(7)}
                location={7}
                sliderValue={handleSliderChange}
                disabled={modalType === "group" ? true : false}
                handleSliderChecked={handleSliderChecked}
                sliderChecked={sliderChecked}
              />
            )}
            <div className="grid grid-cols-3 gap-2 flex-col-reverse max-w-[29.875rem] ">
              {controlData?.map((object: ControlData) => {
                return (
                  <>
                    {object.location === 5 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(5)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 3 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(3)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 1 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(1)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
          <div
            className={`${(modalType === "slider" || modalType === "group") && "z-30"} flex flex-col gap-2 items-end`}
          >
            {slierRightTop && (
              <ColBar
                setModalType={setModalType}
                currentValue={controlDataFunc(8)}
                location={8}
                sliderValue={handleSliderChange}
                disabled={modalType === "group" ? true : false}
                handleSliderChecked={handleSliderChecked}
                sliderChecked={sliderChecked}
              />
            )}
            <div className="flex gap-2">
              {controlData?.map((object: ControlData) => {
                return (
                  <>
                    {object.location === 2 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(2)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 4 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(4)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
                      />
                    )}
                    {object.location === 6 && (
                      <ColBar
                        setModalType={setModalType}
                        currentValue={controlDataFunc(6)}
                        location={object.location}
                        sliderValue={handleSliderChange}
                        disabled={modalType === "group" ? true : false}
                        handleSliderChecked={handleSliderChecked}
                        sliderChecked={sliderChecked}
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
        <div
          className={`${modalType === "group" && (controlBtn === "자동 제어 복귀" || controlBtn === "긴급 제어") && "z-30"} flex gap-4 justify-center items-center`}
        >
          {BTN_LIST.map((list) => {
            return (
              <Button
                key={list.id}
                customType="DEFAULT"
                className={`${manualChecked.includes(list.id) ? "bg-yellow text-white" : ""} ${list.name === "냉방" ? "bg-green text-white" : list.name === "제습" ? "bg-blue text-white" : list.name === "환풍" ? "bg-yellow text-white" : null} flex justify-center items-center w-[7.5rem] h-[2.25rem] !text-[1.25rem]`}
                onClick={() => {
                  handleManualBtn(list.name);
                  handleManualChecked(list.id);
                }}
              >
                {list.name}
              </Button>
            );
          })}
        </div>
      </div>
      {isOpen &&
        (modalType === "group" ||
          modalType === "manual" ||
          modalType === "manual-control" ||
          modalType === "slider") && (
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black z-20 bg-opacity-60">
            {modalType === "group" && (
              <GroupControl
                controlBtn={controlBtn}
                updateEmergencyControlData={updateEmergencyControlData}
                updateEmergencyManualData={updateEmergencyManualData}
                updateGroupControlData={updateGroupControlData}
                updateAutoControlData={updateAutoControlData}
                updateAutoManualData={updateAutoManualData}
                setSliderChecked={setSliderChecked}
                setManualChecked={setManualChecked}
                setModalType={setModalType}
              />
            )}
            {modalType === "manual" && (
              <ManualControl
                manualBtn={manualBtn}
                setModalType={setModalType}
                handleManualMove={handleManualMove}
              />
            )}
            {modalType === "manual-control" && (
              <ManualControlModal manualBtn={manualBtn} />
            )}
            {modalType === "slider" && <SliderControl />}
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