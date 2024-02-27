import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";
import { useState } from "react";

const BtnControlModal = ({ controlBtn }: { controlBtn: string }) => {
  const [select, setSelect] = useState<string>("");
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // 게뱔선택
  const checkedItem = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]); //체크한 목록
    } else if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const handleCheckedList = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setIsChecked(!isChecked);
    checkedItem(value, e.target.checked); //체크된 목록 boolean값
  };

  // 전체선택
  const handleAllCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedList(COUNT_LIST.map((item) => item.name));
    } else {
      setCheckedList([]);
    }
  };

  // select 옵션 선택
  const handleControlSelection = (e: string) => {
    setSelect(e);
  };

  return (
    <Modal
      title={`${controlBtn} 제어 설정`}
      buttonList={BTN_LIST}
      className="w-[46.25rem] h-auto z-100"
    >
      <div className="w-full flex flex-col justify-center items-center py-3 gap-5">
        <ul className="w-auto flex flex-col justify-center items-center gap-[.375rem]">
          <li className="w-full flex justify-end pr-[.5625rem] mb-2">
            <CheckBox
              labelTitle="전체선택"
              className="!gap-4"
              onChange={handleAllCheckedList}
              checked={checkedList.length === COUNT_LIST.length}
            />
          </li>
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

        <div className={`${select === "센서" ? "my-4" : "my-[1.875rem]"}`}>
          {select === "" || select === "예약" ? (
            <>
              <Input
                inputWrap="w-[20.625rem] bg-sub2 mb-4"
                className="text-[1.375rem] font-bold w-full text-right text-white"
                unit="(초)"
                label="Cycle"
              />
              <Input
                inputWrap="w-[20.625rem] bg-sub2"
                className="text-[1.375rem] font-bold w-full text-right text-white"
                unit="(%)"
                label="반복 주기 출력"
              />
            </>
          ) : (
            <div className="mt-4 flex gap-4 items-center justify-center w-full">
              <ul className="gap-2 grid grid-cols-2 gap-x-[1.875rem]">
                {SENSOR_CONT_OPTION.map((list) => {
                  return (
                    <li className="flex justify-between items-center gap-4">
                      {list.unit && (
                        <Input
                          inputWrap="w-[12.5rem] bg-sub2"
                          className="text-[1.375rem] font-bold text-right text-white"
                          unit={list.unit}
                          label={list.label}
                          labelMarginNone
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

export default BtnControlModal;

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
  { id: 1, value: "예약", name: "예약" },
  { id: 2, value: "센서", name: "센서" },
];

const SENSOR_CONT_OPTION = [
  { id: 1, unit: "(℃)", label: "On" },
  { id: 2, unit: "(초)", label: "Cycle" },
  { id: 3, unit: "(℃)", label: "Off" },
  { id: 4, unit: "(%)", label: "Twin Timer" },
];
