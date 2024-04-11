import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ControlData, OpclData } from "control";
import { updateControlSetData } from "@/http/control";
import useControlSetting from "@/hooks/service/control/useControlSet";

import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";
import Radio from "@/components/common/radio";

const ControlModal = ({ controlData }: { controlData: ControlData[] }) => {
  const methods = useForm();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [sensorOption, setSensorOption] = useState<number>(0);
  const [timeOption, setTimeOption] = useState<number>(0);
  const [locationCheckedList, setLocationCheckedList] = useState<Array<number>>(
    [],
  );
  const [timeCheckedList, setTimeCheckedList] = useState<Array<number>>([]);
  const [isLocationChecked, setIsLocationChecked] = useState<boolean>(false);
  const [isTimeChecked, setIsTimeChecked] = useState<boolean>(false);
  const [timerControl, setTimerControl] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState<number | null>(null);

  isLocationChecked;
  isTimeChecked;

  const locationId = locationCheckedList[locationCheckedList.length - 1];

  const { controlSetData } = useControlSetting(locationId);

  // 초기화
  // const handleReset = () => {
  //   setLocationCheckedList([]);
  //   setTimeCheckedList([]);
  //   methods.reset();
  // };

  // 설정저장
  const handleSaveSetting = () => {
    if (!confirm("저장하시겠습니까?")) return;

    handleUpdateSetting();
  };

  // 설정 저장 데이터
  const handleUpdateSetting = () => {
    const updateData = controlSetData.map((value, index) => {
      const { no } = value;

      // 예약/설정 선택
      const timeOption = methods.getValues(`mode.${index}`);
      const mode = timeCheckedList.includes(no) ? parseInt(timeOption) : 0;

      // 예약 데이터
      const updatedOpclLocationControlDto = {
        ...value.opclLocationControlDto,
        useTimer: methods.watch("useTimer") ? 1 : 0,
        targetLocation:
          methods.watch("targetLocation") !== undefined
            ? parseInt(methods.getValues("targetLocation"))
            : 0,
        cycle:
          methods.watch("cycle") !== undefined
            ? parseInt(methods.getValues("cycle"))
            : 0,
        onLocation:
          methods.watch("onLocation") !== undefined
            ? parseInt(methods.getValues("onLocation"))
            : 0,
        operationTime:
          methods.watch("operationTime") !== undefined
            ? parseInt(methods.getValues("operationTime"))
            : 0,
        offLocation:
          methods.watch("offLocation") !== undefined
            ? parseInt(methods.getValues("offLocation"))
            : 0,
      };

      // 센서 데이터
      const selectPriority = methods.watch("priority");
      const updateOpclSensorControlDtoList = value.opclSensorControlDtoList.map(
        (list, index) => {
          const { priority } = list;

          if (selectPriority?.includes(priority)) {
            return {
              ...list,
              sensorNo:
                methods.watch(`sensorNo.${index}`) !== undefined
                  ? parseInt(methods.getValues(`sensorNo.${index}`))
                  : 0,
              useUpperLimit: methods.watch("useUpperLimit") ? 1 : 0, //초과 사용 유무
              upperLimit: methods.watch("upperLimit")
                ? parseInt(methods.getValues("upperLimit"))
                : 0, //초과 값
              upperLimitLocation:
                methods.watch("upperLimitLocation") !== undefined
                  ? parseInt(methods.getValues("upperLimitLocation"))
                  : 0, //초과 - 목표위치
              useIncludeimit: methods.watch("useIncludeimit") ? 1 : 0, //포함 사용 유무
              includeLimitLocation:
                methods.watch("includeLimitLocation") !== undefined
                  ? parseInt(methods.getValues("includeLimitLocation"))
                  : 0, //포함 - 목표위치
              useLowerLimit: methods.watch("useLowerLimit") ? 1 : 0, //미만 사용 유무
              lowerLimit:
                methods.watch("lowerLimit") !== undefined
                  ? parseInt(methods.getValues("lowerLimit"))
                  : 0, //미만 값
              lowerLimitLocation:
                methods.watch("lowerLimitLocation") !== undefined
                  ? parseInt(methods.getValues("lowerLimitLocation"))
                  : 0, //미만 - 목표위치
              useRatioControl: methods.watch("useRatioControl") ? 1 : 0, //비례제어 사용 유무
              useInnerSensor: methods.watch("useInnerSensor") ? 1 : 0, //내부비교 사용 유무
              useTimerControl: methods.watch("useTimerControl") ? 1 : 0, //타이머 제어 사용 유무
              windDirection:
                methods.watch("windDirection") !== undefined
                  ? parseInt(methods.getValues("windDirection"))
                  : 0, //풍향 값
              sensorUnit:
                methods.watch("sensorUnit") !== undefined
                  ? parseInt(methods.getValues("sensorUnit"))
                  : 0, //적용단위
              timerCycle:
                methods.watch("timerCycle") !== undefined
                  ? parseInt(methods.getValues("timerCycle"))
                  : 0, //사이클
              cycleTimeOn:
                methods.watch("cycleTimeOn") !== undefined
                  ? parseInt(methods.getValues("cycleTimeOn"))
                  : 0, //작동시간
            };
          }
          return list;
        },
      );

      const fromTimeValue = `${methods.watch("fromTime")[index]}:${methods.watch("fromMinute")[index]}`;
      const fromTime = fromTimeValue.replace(/\b\d\b/g, "0$&");

      const toTimeValue = `${methods.watch("toTime")[index]}:${methods.watch("toMinute")[index]}`;
      const toTime = toTimeValue.replace(/\b\d\b/g, "0$&");

      return {
        ...value,
        mode: mode,
        fromTime: fromTime,
        toTime: toTime,
        opclLocationControlDto: updatedOpclLocationControlDto,
        opclSensorControlDtoList: updateOpclSensorControlDtoList,
      };
    });

    // 예약/센서 동시 설정 확인
    const checkModeDuplicates = (value: OpclData) => {
      const mode = value.map((list) => list.mode);
      return mode.includes(2) && mode.includes(3);
    };

    if (checkModeDuplicates(updateData)) {
      alert("예약과 센서를 동시에 설정할 수 없습니다.");
    } else {
      updateControlSetData(
        JSON.stringify(updateData),
        locationCheckedList.toString(),
      );
    }
  };

  // 옵션 선택
  const handleTimeOptionSelect = (value: number) => {
    setTimeOption(value);
  };
  const handleUseOptionSelect = (value: string) => {
    const option = parseInt(value);
    setSensorOption(option);
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
        onClickCallBack={handleSaveSetting}
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
                      registerName={`mode.${index}`}
                      options={SELECT_OPTION}
                      onChange={(e) => {
                        handleTimeOptionSelect(parseInt(e.target.value));
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
            {timeOption !== 3 ? (
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
                              defaultValue={0}
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
                      defaultValue={0}
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
                        <Radio
                          id={list.label}
                          registerName="priority"
                          labelTitle={list.label}
                          className="!gap-2 text-white font-bold text-[1.125rem]"
                          name="select"
                          value={list.id}
                        />
                        <Select
                          registerName={`sensorNo.${index}`}
                          options={SENSOR_CONT_OPTION1}
                          selectWrap="w-[7.5rem]"
                          onChange={(e) => {
                            handleUseOptionSelect(e.target.value);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
                <ul className="flex flex-col gap-2">
                  {SENSOR_CONT_OPTION2.map((list) => {
                    if (
                      sensorOption === 7 ||
                      sensorOption === 8 ||
                      sensorOption === 9 ||
                      sensorOption === 10
                    ) {
                      return (
                        <li className="flex justify-between h-[2.8125rem]">
                          <>
                            <CheckBox
                              registerName={list.check}
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
                                  registerName={list.check}
                                  inputWrap="w-[7.5rem] bg-sub2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  unit={list.unit}
                                  defaultValue={0}
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
                              registerName={list.check}
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
                                  registerName={list.input}
                                  inputWrap="w-[7.5rem] bg-sub2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  unit={list.unit}
                                  defaultValue={0}
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
                  {SENSOR_CONT_OPTION3.map((list) => {
                    return (
                      <li className="flex justify-between items-center gap-3">
                        {list.unit && (
                          <Input
                            registerName={list.input}
                            inputWrap="w-[7.5rem] bg-sub2"
                            label={`${list.name}`}
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit}
                            defaultValue={0}
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
  { id: 1, value: 2, name: "예약" },
  { id: 2, value: 3, name: "센서" },
];

const SENSOR_CONT_LIST = [
  { id: 1, label: "1번째 사용" },
  { id: 2, label: "2번째 사용" },
  { id: 3, label: "3번째 사용" },
];

const SENSOR_CONT_OPTION1 = [
  { id: 1, value: 0, name: "외부 풍속" },
  { id: 2, value: 1, name: "풍속(풍향)" },
  { id: 3, value: 2, name: "강우" },
  { id: 4, value: 3, name: "일사" },
  { id: 5, value: 4, name: "기온" },
  { id: 6, value: 5, name: "습기" },
  { id: 7, value: 6, name: "Co2" },
  { id: 8, value: 7, name: "온도" },
  { id: 9, value: 8, name: "습도" },
  { id: 10, value: 9, name: "CO2" },
  { id: 11, value: 10, name: "일사(실내)" },
  { id: 12, value: 11, name: "Pt100" },
];

const SENSOR_CONT_OPTION2 = [
  {
    id: 1,
    name: "초과",
    unit: "M/S",
    input: "upperLimit",
    check: "useUpperLimit",
  },
  { id: 2, name: "포함", unit: "", input: "", check: "useIncludeimit" },
  {
    id: 3,
    name: "미만",
    unit: "M/S",
    input: "lowerLimit",
    check: "useLowerLimit",
  },
  {
    id: 4,
    name: "비례 제어",
    unit: "M/S",
    label: "적용단위",
    input: "sensorUnit",
    check: "useRatioControl",
  },
  {
    id: 5,
    name: "타이머 제어",
    unit: "초",
    label: "사이클",
    input: "timerCycle",
    check: "useTimerControl",
  },
  { id: 6, name: "내부 비교 사용", input: "", check: "useInnerSensor" },
];

const SENSOR_CONT_OPTION3 = [
  {
    id: 1,
    name: "목표위치",
    unit: "%",
    input: "upperLimitLocation",
  },
  {
    id: 2,
    name: "목표위치",
    unit: "%",
    input: "includeLimitLocation",
  },
  {
    id: 3,
    name: "목표위치",
    unit: "%",
    input: "lowerLimitLocation",
  },
  { id: 4, name: "풍향", unit: "˚", input: "windDirection" },
  {
    id: 5,
    name: "작동시간",
    unit: "%",
    input: "cycleTimeOn",
  },
];

const TIMER_OPTION = [
  { id: 1, unit: "초", label: "사이클", registerName: "cycle" },
  { id: 2, unit: "%", label: "ON위치", registerName: "onLocation" },
  { id: 3, unit: "%", label: "작동시간", registerName: "operationTime" },
  { id: 4, unit: "%", label: "OFF위치", registerName: "offLocation" },
];
