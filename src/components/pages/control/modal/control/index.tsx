import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";
import { useState } from "react";

const ControlModal = () => {
  const [select, setSelect] = useState<string>("");
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [timerControl, setTimerControl] = useState<boolean>(false);

  const checkedItem = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);

      return;
    }

    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));

      return;
    }

    return;
  };

  const handleCheckedList = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItem(value, e.target.checked);
  };

  const handleControlSelection = (value: string) => {
    setSelect(value);
  };

  const handleTimerCheck = () => {
    setTimerControl(!timerControl);
  };

  console.log("==>", timerControl);

  return (
    <Modal
      title="개폐기 시간 및 작동방법 설정"
      buttonList={BTN_LIST}
      className="w-[54.625rem] h-auto z-100"
    >
      <div className="w-full flex flex-col justify-center items-center py-3 gap-5">
        <div className="grid-cols-4 grid gap-[.625rem] gap-x-[3.125rem] justify-center">
          {CHECK_LIST.map((list) => {
            return <CheckBox labelTitle={list.name} key={list.id} />;
          })}
        </div>

        <ul className="w-full flex flex-col justify-center items-center max-w-[36.8125rem] gap-[.375rem]">
          {COUNT_LIST.map((list) => {
            return (
              <>
                <li className="flex items-center gap-[.625rem]" key={list.id}>
                  <Button
                    customType="MODAL"
                    className={`py-[.625rem] w-[8.4375rem] h-[2.8125rem] !text-[1.375rem] ${checkedList.includes(list.name) && "bg-yellow"}`}
                  >
                    {list.name}
                  </Button>
                  <TimeInput
                    maxLength={2}
                    className="text-right"
                    inputWrap={`${checkedList.includes(list.name) && "bg-yellow"}`}
                  />
                  <CheckBox
                    checked={checkedList.includes(list.name)}
                    onChange={(e) => handleCheckedList(e, list.name)}
                  />
                  <Select
                    options={SELECT_OPTION}
                    onChange={(e) => {
                      handleControlSelection(e.target.value);
                    }}
                    selectWrap={`${checkedList.includes(list.name) && "bg-yellow"}`}
                  />
                </li>
              </>
            );
          })}
        </ul>

        <div
          className={`${select === "센서" ? "my-4" : "my-[1.875rem]"} w-full flex justify-center`}
        >
          {select === "" || select === "예약" ? (
            <div className="flex justify-between w-[75%]">
              <CheckBox
                labelTitle="타이머 제어"
                onChange={() => handleTimerCheck()}
              />
              {timerControl ? (
                <ul className="gap-2 grid grid-cols-2 gap-x-[1.875rem]">
                  {TIMER_OPTION.map((list) => {
                    return (
                      <li className="flex justify-between items-center gap-4">
                        {list.unit && (
                          <Input
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
            <div className="mt-4 flex gap-4 items-center justify-center">
              <ul className="flex flex-col gap-2">
                {SENSOR_CONT_LIST.map((list) => {
                  return (
                    <li className="flex gap-4" key={list.id}>
                      <CheckBox
                        labelTitle={`${list.id} 번째 사용`}
                        className="!gap-2"
                      />
                      <Select
                        options={SENSOR_CONT_OPTION1}
                        selectWrap="w-[7.5rem]"
                      />
                    </li>
                  );
                })}
              </ul>
              <ul className="flex flex-col gap-2">
                {SENSOR_CONT_OPTION2.map((list) => {
                  return (
                    <li className="flex justify-between h-[2.8125rem]">
                      <CheckBox
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
                  );
                })}
              </ul>
              <ul className="flex flex-col gap-2">
                {SENSOR_CONT_OPTION3.map((list) => {
                  return (
                    <li className="flex justify-between">
                      <CheckBox
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
  );
};

export default ControlModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.svg" },
  { id: 2, name: "설정저장", img: "save@2x.svg" },
];

const CHECK_LIST = [
  { id: 1, name: "좌 측창 1" },
  { id: 2, name: "좌 측창 2" },
  { id: 3, name: "좌 측창 3" },
  { id: 4, name: "우 측창 1" },
  { id: 5, name: "우 측창 2" },
  { id: 6, name: "우 측창 3" },
  { id: 7, name: "좌 천창 1" },
  { id: 8, name: "좌 천창 2" },
  { id: 9, name: "좌 천창 3" },
  { id: 10, name: "우 천창 1" },
  { id: 11, name: "우 천창 2" },
  { id: 12, name: "우 천창 3" },
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
  { id: 1, value: "예약", name: "예약" },
  { id: 2, value: "센서", name: "센서" },
];

const SENSOR_CONT_LIST = [{ id: 1 }, { id: 2 }, { id: 3 }];

const SENSOR_CONT_OPTION1 = [{ id: 1, value: "외부 풍속", name: "외부 풍속" }];

const SENSOR_CONT_OPTION2 = [
  { id: 1, name: "초과", unit: "M/S" },
  { id: 2, name: "포함", unit: "" },
  { id: 3, name: "미만", unit: "M/S" },
  { id: 4, name: "비례 제어", unit: "M/S", label: "적용단위" },
  { id: 5, name: "타이머 제어", unit: "초", label: "사이클" },
];

const SENSOR_CONT_OPTION3 = [
  { id: 1, name: "목표위치", unit: "%" },
  { id: 2, name: "목표위치", unit: "%" },
  { id: 3, name: "목표위치", unit: "%" },
  { id: 4, name: "풍향", unit: "˚" },
  { id: 5, name: "작동시간", unit: "%" },
];

const TIMER_OPTION = [
  { id: 1, unit: "초", label: "사이클" },
  { id: 2, unit: "%", label: "ON위치" },
  { id: 3, unit: "%", label: "작동시간" },
  { id: 4, unit: "%", label: "OFF위치" },
];
