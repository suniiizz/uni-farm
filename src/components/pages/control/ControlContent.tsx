import { useContext, useEffect, useRef, useState } from "react";

import { loadPlayer } from "rtsp-relay/browser";

// import useGlobalQuery from "@/hooks/global/useGlobalQuery";
// import { useGetSensor } from "@/hooks/service/control/useGetSensor";
import useSensor from "@/hooks/service/control/useSensor";
import useManual from "@/hooks/service/control/useManual";
import { updateControlData, updateManualData } from "@/http/control";
import {
  ControlData,
  ManualItem,
  ManualData,
  SensorData,
  SensorDtoList,
} from "control";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import { ColBar, RowBar, RowReverseBar } from "@/components/common/slider";
import SliderControl from "@/components/pages/control/modal/slider-control";
import GroupControl from "@/components/pages/control/modal/control-button/groupControl";
import ManualControl from "@/components/pages/control/modal/manual-button";
import ManualControlModal from "@/components/pages/control/modal/manual-button/ManualControl";
import Button from "@/components/common/button";

const ControlContent = ({
  controlData,
  modalType,
  setModalType,
  section,
}: {
  controlData: ControlData[];
  modalType: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  section: string;
}) => {
  const { isOpen, onOpenModal } = useContext(ModalContext);

  const [toggle, setToggle] = useState<boolean>(false);
  const [cctv, setCctv] = useState<boolean>(false);
  const [controlBtn, setControlBtn] = useState<string>("");
  const [manualBtn, setManualBtn] = useState<number>(0);
  const [sliderValue, setSliderValue] = useState<Array<number>>([]);
  const [controlDataUpdate, setControlDataUpdate] = useState<ControlData[]>([]);
  const [sliderChecked, setSliderChecked] = useState<Array<number>>([]);
  const [manualChecked, setManualChecked] = useState<Array<number>>([]);
  const [manualId, setManualId] = useState<number>(0);

  const { sensorData } = useSensor(section);
  const { manualData } = useManual(section);

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

  // [외부 환경] 데이터
  const environmentalData = (id: number) => {
    const sensorDataList: SensorData | undefined = sensorData.find(
      (item: SensorData) => item.id === 115,
    );

    return sensorDataList?.sensorDtoList.find(
      (item: SensorDtoList) => item.id === id,
    ).value;
  };

  // [긴급 제어] 슬라이더 데이터 패칭
  const updateEmergencyControlData = () => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, value: 210, controlMode: 4 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateControlData(section, JSON.stringify(selectLocation));
  };

  // [긴급 제어] 하단 제어 버튼 데이터 패칭
  const updateEmergencyManualData = () => {
    const selectManual = manualData.map((item: ManualItem) => {
      const { no } = item;
      if (manualChecked.includes(no)) {
        return { ...item, value: 210, controlMode: 4 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateManualData(section, JSON.stringify(selectManual));
  };

  // [그룹 제어] 데이터 패칭
  const updateGroupControlData = (inputValue: number) => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, value: inputValue, controlMode: 2 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateControlData(section, JSON.stringify(selectLocation));
  };

  // [자동 제어 복귀] 슬라이더 데이터 패칭
  const updateAutoControlData = () => {
    const selectLocation = controlData.map((item: ControlData) => {
      const { location } = item;
      if (sliderChecked.includes(location)) {
        return { ...item, controlMode: 7 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateControlData(section, JSON.stringify(selectLocation));
  };

  // [자동 제어 복귀] 하단 제어 버튼 데이터 패칭
  const updateAutoManualData = () => {
    const selectManual = manualData.map((item: ManualData) => {
      const { no } = item;
      if (manualChecked.includes(no)) {
        return { ...item, controlMode: 7 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateManualData(section, JSON.stringify(selectManual));
  };

  // 평균 데이터 박스
  const sensorDataFunc = (id: number) => {
    const sensorDataList = sensorData.find(
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
    const controlDataList = controlData.find(
      (item: ControlData) => item.location === location,
    );

    return controlDataList?.value ?? 0;
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

  // [하단 제어 버튼] - 모달
  const handleManualBtn = (no: number) => {
    if (modalType === "group") return;

    setManualBtn(no);
    setModalType("manual");
    onOpenModal();
  };

  // [하단 제어 버튼] - 제어설정
  const handleControlSetting = (manualBtn: number) => {
    const value = manualData.find((item) => item.no === manualBtn);

    if (value) {
      setManualId(value.id);
    }
  };

  const type = (no: number) => {
    switch (no) {
      case 1:
        return "냉방";
      case 2:
        return "난방";
      case 3:
        return "제습";
      case 4:
        return "가습";
      case 5:
        return "환풍";
      case 6:
        return "공급";
      case 7:
        return "급수";
      case 8:
        return "관수";
      default:
        return "";
    }
  };

  //[CCTV]
  const canvasRef = useRef(null);

  const handleCctvConnect = () => {
    setCctv((prev) => !prev);

    setTimeout(() => {
      loadPlayer({
        url: `ws://222.111.61.156:2000/api/hikvision/admin:choij65@@121.164.215.196:554/102`,
        canvas: canvasRef.current as unknown as HTMLCanvasElement,
        // 선택적으로 연결이 끊겼을 때의 콜백을 정의할 수 있습니다.
        onDisconnect: () => console.log("Connection lost!"),
      });
      // canvasRef.current.style.display = "block";
      // 언마운트 시 리소스를 정리합니다.
    }, 1000);
  };

  return (
    <>
      {/* 시간 */}
      <div className="w-full h-[5.3125rem] bg-[#fff] rounded-md shadow-lg flex justify-between items-center px-[1.25rem]">
        <div className="flex flex-col items-center mt-[1.25rem] gap-1">
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('../src/assets/icon/section_arw_left@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
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
          <span className="cursor-pointer w-8 h-7 inline-block bg-[url('../src/assets/icon/section_arw_right@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
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
            const value = (name: string) => {
              switch (name) {
                case "기온":
                  return <>{environmentalData(116)}</>;
                case "습기":
                  return <>{environmentalData(117)}</>;
                case "강우":
                  return <>{environmentalData(118)}</>;
                case "일사":
                  return <>{environmentalData(119)}</>;
                case "풍향":
                  return <>{environmentalData(120)}</>;
                case "풍속":
                  return <>{environmentalData(121)}</>;
                case "CO₂":
                  return <>{environmentalData(122)}</>;
                default:
                  return;
              }
            };
            return (
              <div
                key={list.id}
                className="bg-[#fff] rounded-md p-4 flex justify-center items-center gap-5 h-[4.375rem] shadow-lg"
              >
                <img
                  src={`http://175.123.253.182/icon/${list.img}`}
                  alt="icon"
                  className="w-[2.5rem] h-[2.5rem]"
                />
                <span>
                  {list.name1}: {value(list.name1)}
                  {list.unit1} <br />
                  {list.name2}: {value(list.name2)}
                  {list.unit2}
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
              {controlData.map((object: ControlData) => {
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
              <span className="w-[6.875rem] h-[6.875rem] inline-block bg-[url('../src/assets/icon/fan@2x.svg')] bg-contain bg-no-repeat"></span>
              <Button
                onClick={() => {
                  handleCctvConnect();
                }}
                className="w-[5.625rem] h-[5.625rem] bg-[url('../src/assets/icon/cctv-icon-black@2x.svg')] bg-contain bg-no-repeat"
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
          <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
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
                      src={`http://175.123.253.182/icon/${list.img}`}
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
          {manualData.map((list) => {
            return (
              <Button
                key={list.id}
                customType="DEFAULT"
                className={`${manualChecked.includes(list.id) ? "bg-yellow text-white" : ""} ${list.no === 1 ? "bg-green text-white" : list.no === 3 ? "bg-blue text-white" : list.no === 5 ? "bg-yellow text-white" : null} flex justify-center items-center w-[7.5rem] h-[2.25rem] !text-[1.25rem]`}
                onClick={() => {
                  handleManualBtn(list.no);
                  handleManualChecked(list.id);
                }}
              >
                {type(list.no)}
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
                manualData={manualData}
                manualBtn={manualBtn}
                type={type}
                setModalType={setModalType}
                handleControlSetting={handleControlSetting}
              />
            )}
            {modalType === "manual-control" && (
              <ManualControlModal
                manualBtn={manualBtn}
                type={type}
                manualId={manualId}
              />
            )}
            {modalType === "slider" && (
              <SliderControl data={controlDataUpdate} />
            )}
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

const INFO_LIST1 = [
  {
    id: 1,
    name1: "기온",
    name2: "습기",
    unit1: "℃",
    unit2: "%",
    img: "temper-icon3@2x.svg",
  },
  {
    id: 2,
    name1: "강우",
    name2: "일사",
    unit1: "mm",
    unit2: "W/㎡",
    img: "sun-icon@2x.svg",
  },
  {
    id: 3,
    name1: "풍향",
    name2: "풍속",
    unit1: "˚",
    unit2: "m/s",
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
