import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";
import { useState } from "react";

const ControlModal = () => {
  const [select, setSelect] = useState("");
  const [checkedList, setCheckedList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  console.log("checkedList", checkedList);

  const checkedItemHandler = (value: string, isChecked: boolean) => {
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

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItemHandler(value, e.target.checked);
  };

  const handleControlSelect = (e: string) => {
    setSelect(e);
  };

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

        <div className="w-full flex flex-col justify-center items-center max-w-[36.8125rem] gap-[.375rem]">
          {COUNT_LIST.map((list) => {
            return (
              <>
                <div className="flex items-center gap-[.625rem]" key={list.id}>
                  <Button
                    customType="MODAL"
                    className="py-[.625rem] w-[8.4375rem] h-[2.8125rem] !text-[1.375rem]"
                  >
                    {list.name}
                  </Button>
                  <TimeInput maxLength={2} className="text-right" />
                  <CheckBox
                    checked={checkedList.includes(list.name)}
                    onChange={(e) => checkHandler(e, list.name)}
                  />
                  <Select
                    options={SELECT_OPTION}
                    onChange={(e) => {
                      handleControlSelect(e.target.value);
                    }}
                  />
                </div>
              </>
            );
          })}
        </div>

        <div className={`${select === "센서" ? "my-4" : "my-[3.75rem]"}`}>
          {select === "" || select === "예약" ? (
            <Input
              inputWrap="w-[20.625rem]"
              className="text-[1.375rem] font-bold w-full text-right text-white"
              unit="%"
              label="목표 위치"
            />
          ) : (
            <div className="mt-4 flex gap-4 items-center justify-center">
              <div className="flex flex-col gap-2">
                {SENSOR_CONT_LIST.map((list) => {
                  return (
                    <div className="flex gap-4">
                      <CheckBox
                        labelTitle={`${list.id} 번째 사용`}
                        key={list.id}
                        className="!gap-2"
                      />
                      <Select
                        options={SENSOR_CONT_OPTION1}
                        selectWrap="w-[7.5rem]"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                {SENSOR_CONT_OPTION2.map((list) => {
                  return (
                    <div className="flex justify-between">
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
                            inputWrap="w-[7.5rem]"
                            className="text-[1.375rem] font-bold text-right text-white w-full"
                            unit={list.unit}
                          />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-2">
                {SENSOR_CONT_OPTION3.map((list) => {
                  return (
                    <div className="flex justify-between">
                      <CheckBox
                        labelTitle={`${list.name}`}
                        key={list.id}
                        className="!gap-2 !text-[1.125rem] mr-3"
                      />
                      {list.unit && (
                        <Input
                          inputWrap="w-[7.5rem]"
                          className="text-[1.375rem] font-bold text-right text-white w-full"
                          unit={list.unit}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ControlModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.png" },
  { id: 2, name: "설정저장", img: "save@2x.png" },
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
