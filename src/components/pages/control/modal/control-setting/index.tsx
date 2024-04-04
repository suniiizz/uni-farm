import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ControlData, OpclData } from "control";
import useControlSetting from "@/hooks/service/control/useControlSetting";

import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";

const ControlModal = ({ controlData }: { controlData: ControlData[] }) => {
  const methods = useForm();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [sensorOption, setSensorOption] = useState<string>("");
  const [timeOption, setTimeOption] = useState<number>(0);
  const [locationCheckedList, setLocationCheckedList] = useState<Array<number>>(
    [],
  );
  const [timeCheckedList, setTimeCheckedList] = useState<Array<number>>([]);
  const [isLocationChecked, setIsLocationChecked] = useState<boolean>(false);
  const [isTimeChecked, setIsTimeChecked] = useState<boolean>(false);
  const [timerControl, setTimerControl] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<number | null>(null);
  const [data, setData] = useState<OpclData>([]);

  console.log("data", data);

  locationCheckedList;
  isLocationChecked;
  isTimeChecked;

  const locationId = locationCheckedList[locationCheckedList.length - 1];

  const { controlSetData } = useControlSetting(locationId);

  useEffect(() => {
    handleTimeUpdate();
  }, [timeCheckedList]);

  const handleTimeUpdate = () => {
    const test = controlSetData.map((value, index) => {
      const { no } = value;

      const updatedOpclLocationControlDto = {
        ...value.opclLocationControlDto,
        cycle: parseInt(methods.watch("cycle")),
        onLocation: parseInt(methods.watch("onLocation")),
        operationTime: parseInt(methods.watch("operationTime")),
        offLocation: parseInt(methods.watch("offLocation")),
      };

      const timeOption = methods.getValues(`timeOption.${index}`);
      const mode = timeCheckedList.includes(no) ? parseInt(timeOption) : 0;
      return {
        ...value,
        mode: mode,
        opclLocationControlDto: updatedOpclLocationControlDto,
      };
    });

    setData(test);
  };

  // 옵션 선택
  const handleOptionSelect = (value: any, type: string) => {
    if (type === "time") {
      setTimeOption(value);
    } else if (type === "use") {
      setSensorOption(value);
    }
  };

  useEffect(() => {
    if (!controlSetData?.length) return;

    methods.reset({
      fromTime: controlSetData.map((value) => value.fromTime.slice(0, 2)),
      fromMinute: controlSetData.map((value) => value.fromTime.slice(3, 5)),
      toTime: controlSetData.map((value) => value.toTime.slice(0, 2)),
      toMinute: controlSetData.map((value) => value.toTime.slice(3, 5)),
    });
  }, [controlSetData]);

  // 타이머 제어 체크박스 클릭 시
  const handleTimerCheck = () => {
    setTimerControl((prev) => !prev);
  };

  // 체크박스 체크 시 state 저장
  const handleCheckedList = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number,
    type: string,
  ) => {
    const isChecked = e.target.checked;

    if (type === "time") {
      setIsTimeChecked(isChecked);

      if (isChecked) {
        setTimeCheckedList((prev) => {
          return [...prev, value];
        });
      } else {
        setTimeCheckedList((prev) => prev.filter((item) => item !== value));
      }
    } else if (type === "location") {
      setIsLocationChecked(isChecked);

      if (isChecked) {
        setLocationCheckedList((prev) => {
          return [...prev, value];
        });
      } else {
        setLocationCheckedList((prev) => prev.filter((item) => item !== value));
      }
    }
  };

  // 시간 인풋 포커즈
  useEffect(() => {
    const handleFocusOutInput = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setInputFocus(null);
      }
    };

    document.addEventListener("mousedown", handleFocusOutInput);
  }, []);

  const handleFocusInput = (index: number) => {
    setInputFocus(index);
  };

  return (
    <FormProvider {...methods}>
      <Modal
        title="개폐기 시간 및 작동방법 설정"
        buttonList={BTN_LIST}
        className="w-[54.625rem] h-auto !max-h-[95%] z-100"
      >
        <div className="w-full flex flex-col justify-center items-center py-3 gap-5">
          <div className="grid-cols-4 grid gap-[.625rem] gap-x-[2.8125rem] justify-center">
            {controlData.map((list: ControlData, index) => {
              return (
                <CheckBox
                  registerName={`location.${index}`}
                  labelTitle={list.shapeName}
                  key={list.id}
                  onChangeCallBack={(e) =>
                    handleCheckedList(e, list.id, "location")
                  }
                />
              );
            })}
          </div>

          <ul className="w-full flex flex-col justify-center items-center max-w-[36.8125rem] gap-[.375rem]">
            {COUNT_LIST.map((list, index) => {
              return (
                <>
                  <li className="flex items-center gap-[.625rem]" key={list.id}>
                    <Button
                      customType="MODAL"
                      className={`py-[.625rem] w-[8.4375rem] h-[2.8125rem] !text-[1.375rem]`}
                    >
                      {list.name}
                    </Button>
                    <TimeInput
                      wrapperRef={wrapperRef}
                      maxLength={2}
                      className="text-right w-[1.875rem] focus:bg-yellow"
                      inputWrap={`${inputFocus === index && "bg-yellow"}`}
                      fromTime={`fromTime.${index}`}
                      fromMinute={`fromMinute.${index}`}
                      toTime={`toTime.${index}`}
                      toMinute={`toMinute.${index}`}
                      onFocus={() => handleFocusInput(index)}
                      onBlur={() => setInputFocus(null)}
                    />
                    <CheckBox
                      registerName={`timeCheck.${index}`}
                      checked={timeCheckedList.includes(list.id)}
                      onChangeCallBack={(e) =>
                        handleCheckedList(e, list.id, "time")
                      }
                    />
                    <Select
                      registerName={`timeOption.${index}`}
                      options={SELECT_OPTION}
                      onChange={(e) => {
                        handleOptionSelect(e.target.value, "time");
                      }}
                    />
                  </li>
                </>
              );
            })}
          </ul>

          <div
            className={`${timeOption === 2 ? "my-4" : "my-[1.875rem]"} my-[1.875rem] w-full flex justify-center`}
          >
            {timeOption !== 2 ? (
              <div className="flex justify-between w-[75%]">
                <CheckBox
                  registerName="useTimer"
                  labelTitle="타이머 제어"
                  onChangeCallBack={handleTimerCheck}
                />
                {timerControl ? (
                  <ul className="gap-2 grid grid-cols-2 gap-x-[1.875rem]">
                    {TIMER_OPTION.map((list) => {
                      return (
                        <li className="flex justify-between items-center gap-4">
                          {list.unit && (
                            <Input
                              registerName={list.registerName}
                              inputWrap="w-[7.5rem] bg-sub2"
                              className="text-4 font-bold text-right text-white"
                              unit={list.unit}
                              label={list.label}
                              labelMarginNone
                            />
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="flex items-center gap-4">
                    <Input
                      registerName="targetLocation"
                      inputWrap="w-[12.5rem] bg-sub2"
                      className="text-4 font-bold w-full text-right text-white"
                      unit="%"
                      label="목표 위치"
                      labelMarginNone
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-center justify-center">
                <ul className="flex flex-col gap-2">
                  {SENSOR_CONT_LIST.map((list, index) => {
                    return (
                      <li className="flex gap-4" key={list.id}>
                        <CheckBox
                          registerName={`getUse.${index}`}
                          labelTitle={`${list.id} 번째 사용`}
                          className="!gap-2"
                        />
                        <Select
                          options={SENSOR_CONT_OPTION1}
                          selectWrap="w-[7.5rem]"
                          onChange={(e) => {
                            handleOptionSelect(e.target.value, "use");
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
                <ul className="flex flex-col gap-2">
                  {SENSOR_CONT_OPTION2.map((list, index) => {
                    if (
                      `${sensorOption}` === "온도" ||
                      `${sensorOption}` === "습도" ||
                      `${sensorOption}` === "CO2" ||
                      `${sensorOption}` === "일사(실내)"
                    ) {
                      return (
                        <li className="flex justify-between h-[2.8125rem]">
                          <>
                            <CheckBox
                              registerName={`secondOption.${index}`}
                              labelTitle={`${list.name}`}
                              key={list.id}
                              className="!gap-2 !text-[1.125rem] mr-3"
                            />
                            <div className="flex items-center gap-3">
                              {list.label && (
                                <span className="font-bold text-white text-[1.125rem]">
                                  {list.label}
                                </span>
                              )}
                              {list.unit && (
                                <Input
                                  inputWrap="w-[7.5rem] bg-sub2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  unit={list.unit}
                                />
                              )}
                            </div>
                          </>
                        </li>
                      );
                    } else if (list.name !== "내부 비교 사용") {
                      return (
                        <>
                          <li className="flex justify-between h-[2.8125rem]">
                            <CheckBox
                              registerName={`secondOption.${index}`}
                              labelTitle={`${list.name}`}
                              key={list.id}
                              className="!gap-2 !text-[1.125rem] mr-3"
                            />
                            <div className="flex items-center gap-3">
                              {list.label && (
                                <span className="font-bold text-white text-[1.125rem]">
                                  {list.label}
                                </span>
                              )}
                              {list.unit && (
                                <Input
                                  inputWrap="w-[7.5rem] bg-sub2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  unit={list.unit}
                                />
                              )}
                            </div>
                          </li>
                        </>
                      );
                    }
                  })}
                </ul>
                <ul className="flex flex-col gap-2">
                  {SENSOR_CONT_OPTION3.map((list, index) => {
                    return (
                      <li className="flex justify-between">
                        <CheckBox
                          registerName={`thirdOption.${index}`}
                          labelTitle={`${list.name}`}
                          key={list.id}
                          className="!gap-2 !text-[1.125rem] mr-3"
                        />
                        {list.unit && (
                          <Input
                            inputWrap="w-[7.5rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit}
                          />
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default ControlModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.svg" },
  { id: 2, name: "설정저장", img: "save@2x.svg" },
];

const COUNT_LIST = [
  { id: 1, name: "시간 1" },
  { id: 2, name: "시간 2" },
  { id: 3, name: "시간 3" },
  { id: 4, name: "시간 4" },
  { id: 5, name: "시간 5" },
  { id: 6, name: "시간 6" },
];

const SELECT_OPTION = [
  { id: 1, value: 1, name: "예약" },
  { id: 2, value: 2, name: "센서" },
];

const SENSOR_CONT_LIST = [{ id: 1 }, { id: 2 }, { id: 3 }];

const SENSOR_CONT_OPTION1 = [
  { id: 1, value: "외부 풍속", name: "외부 풍속" },
  { id: 2, value: "풍속(풍향)", name: "풍속(풍향)" },
  { id: 3, value: "강우", name: "강우" },
  { id: 4, value: "일사", name: "일사" },
  { id: 5, value: "기온", name: "기온" },
  { id: 6, value: "습기", name: "습기" },
  { id: 7, value: "Co2", name: "Co2" },
  { id: 8, value: "온도", name: "온도" },
  { id: 9, value: "습도", name: "습도" },
  { id: 10, value: "CO2", name: "CO2" },
  { id: 11, value: "일사(실내)", name: "일사(실내)" },
  { id: 12, value: "Pt100", name: "Pt100" },
];

const SENSOR_CONT_OPTION2 = [
  { id: 1, name: "초과", unit: "M/S" },
  { id: 2, name: "포함", unit: "" },
  { id: 3, name: "미만", unit: "M/S" },
  { id: 4, name: "비례 제어", unit: "M/S", label: "적용단위" },
  { id: 5, name: "타이머 제어", unit: "초", label: "사이클" },
  { id: 6, name: "내부 비교 사용" },
];

const SENSOR_CONT_OPTION3 = [
  { id: 1, name: "목표위치", unit: "%" },
  { id: 2, name: "목표위치", unit: "%" },
  { id: 3, name: "목표위치", unit: "%" },
  { id: 4, name: "풍향", unit: "˚" },
  { id: 5, name: "작동시간", unit: "%" },
];

const TIMER_OPTION = [
  { id: 1, unit: "초", label: "사이클", registerName: "cycle" },
  { id: 2, unit: "%", label: "ON위치", registerName: "onLocation" },
  { id: 3, unit: "%", label: "작동시간", registerName: "operationTime" },
  { id: 4, unit: "%", label: "OFF위치", registerName: "offLocation" },
];
