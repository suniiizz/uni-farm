import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import useManualSet from "@/hooks/service/control/useManualSet";
import { updateManualSetData } from "@/http/control";
import { RelayItem } from "control";

import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { Input, TimeInput } from "@/components/common/input";

const ManualControlModal = ({
  manualBtn,
  type,
  manualId,
}: {
  manualBtn: number;
  type: (no: number) => void;
  manualId: number;
}) => {
  const methods = useForm();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [inputFocus, setInputFocus] = useState<number | null>(null);
  const [select, setSelect] = useState<number>(0);
  const [checkedList, setCheckedList] = useState<Array<number>>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  isChecked;

  const { manualSetData } = useManualSet(manualId);

  useEffect(() => {
    if (!manualSetData?.length) return;

    methods.reset({
      fromTime: manualSetData.map((value) => value.fromTime.slice(0, 2)),
      fromMinute: manualSetData.map((value) => value.fromTime.slice(3, 5)),
      toTime: manualSetData.map((value) => value.toTime.slice(0, 2)),
      toMinute: manualSetData.map((value) => value.toTime.slice(3, 5)),
    });
  }, [manualSetData]);

  // 설정저장
  const handleSaveSetting = () => {
    if (!confirm("저장하시겠습니까?")) return;

    handleUpdateSetting();
  };

  const handleUpdateSetting = () => {
    const updateData = manualSetData.map((value, index) => {
      const { id } = value;

      const timeOption = methods.getValues(`modeOption.${index}`);
      const mode = checkedList.includes(id) ? parseInt(timeOption) : 0;

      const updateRelaySensorControlDto = {
        ...value.relaySensorControlDto,
        onValue:
          methods.watch("onValue") !== undefined
            ? parseInt(methods.getValues("onValue"))
            : 0,
        offValue:
          methods.watch("offValue") !== undefined
            ? parseInt(methods.getValues("offValue"))
            : 0,
        cycle:
          methods.watch("cycle") !== undefined
            ? parseInt(methods.getValues("cycle"))
            : 0,
        twinTimer:
          methods.watch("twinTimer") !== undefined
            ? parseInt(methods.getValues("twinTimer"))
            : 0,
      };

      const updateRelayCycleControlDto = {
        ...value.relayCycleControlDto,
        cycle:
          methods.watch("cycle") !== undefined
            ? parseInt(methods.getValues("cycle"))
            : 0,
        period:
          methods.watch("period") !== undefined
            ? parseInt(methods.getValues("period"))
            : 0,
      };

      const fromTimeValue = `${methods.watch("fromTime")[index]}:${methods.watch("fromMinute")[index]}`;
      const fromTime = fromTimeValue.replace(/\b\d\b/g, "0$&");

      const toTimeValue = `${methods.watch("toTime")[index]}:${methods.watch("toMinute")[index]}`;
      const toTime = toTimeValue.replace(/\b\d\b/g, "0$&");

      return {
        ...value,
        mode: mode,
        fromTime: fromTime,
        toTime: toTime,
        relaySensorControlDto: updateRelaySensorControlDto,
        relayCycleControlDto: updateRelayCycleControlDto,
      };
    });

    // 예약/센서 동시 설정 확인
    const checkModeDuplicates = (value: RelayItem) => {
      const mode = value.map((list) => list.mode);
      return mode.includes(2) && mode.includes(3);
    };

    if (checkModeDuplicates(updateData)) {
      alert("예약과 센서를 동시에 설정할 수 없습니다.");
    } else {
      updateManualSetData(JSON.stringify(updateData), manualId.toString());
    }
  };

  // 개별선택
  const handleCheckedList = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: number,
  ) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);

    setCheckedList((prev) => {
      // 새로운 배열을 만들기 위해 spread 연산자를 사용합니다.
      if (isChecked) {
        return [...prev, value];
      } else {
        // isChecked가 false이면 value를 제외한 배열을 반환합니다.
        return prev.filter((item) => item !== value);
      }
    });
  };

  // 전체선택
  const handleAllCheckedList = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedList(manualSetData.map((item) => item.id));
    } else {
      setCheckedList([]);
    }
  };

  // 옵션 선택
  const handleControlSelection = (e: number) => {
    setSelect(e);
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
        title={`${type(manualBtn)} 제어 설정`}
        buttonList={BTN_LIST}
        className="w-[46.25rem] h-auto z-100"
        onClickCallBack={handleSaveSetting}
      >
        <div className="w-full flex flex-col justify-center items-center py-3 gap-5">
          <ul className="w-auto flex flex-col justify-center items-center gap-[.375rem]">
            <li className="w-full flex justify-end pr-[.5625rem] mb-2">
              <CheckBox
                labelTitle="전체선택"
                className="!gap-4"
                onChange={handleAllCheckedList}
                checked={checkedList.length === COUNT_LIST.length}
                registerName="test"
              />
            </li>
            {manualSetData.map((list, index) => {
              const type = (no: number) => {
                switch (no) {
                  case 1:
                    return "시간 1";
                  case 2:
                    return "시간 2";
                  case 3:
                    return "시간 3";
                  case 4:
                    return "시간 4";
                  case 5:
                    return "시간 5";
                  case 6:
                    return "시간 6";
                  default:
                    return "";
                }
              };
              return (
                <>
                  <li className="flex items-center gap-[.625rem]" key={list.id}>
                    <Button
                      customType="MODAL"
                      className={`py-[.625rem] w-[8.4375rem] h-[2.8125rem] !text-[1.375rem]`}
                    >
                      {type(list.no)}
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
                      checked={checkedList.includes(list.id)}
                      onChange={(e) => handleCheckedList(e, list.id)}
                    />
                    <Select
                      registerName={`modeOption.${index}`}
                      options={SELECT_OPTION}
                      onChange={(e) => {
                        handleControlSelection(parseInt(e.target.value));
                      }}
                    />
                  </li>
                </>
              );
            })}
          </ul>

          <div className={`${select === 3 ? "my-4" : "my-[1.875rem]"}`}>
            {select === 0 || select === 2 ? (
              <>
                <Input
                  registerName="cycle"
                  inputWrap="w-[20.625rem] bg-sub2 mb-4"
                  className="text-[1.375rem] font-bold w-full text-right text-white"
                  unit="(초)"
                  label="Cycle"
                  defaultValue={0}
                />
                <Input
                  registerName="period"
                  inputWrap="w-[20.625rem] bg-sub2"
                  className="text-[1.375rem] font-bold w-full text-right text-white"
                  unit="(%)"
                  label="반복 주기 출력"
                  defaultValue={0}
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
                            registerName={list.registerName}
                            inputWrap="w-[12.5rem] bg-sub2"
                            className="w-full text-[1.375rem] font-bold text-right text-white"
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
              </div>
            )}
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default ManualControlModal;

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

const SENSOR_CONT_OPTION = [
  { id: 1, unit: "(℃)", label: "On", registerName: "onValue" },
  { id: 2, unit: "(초)", label: "Cycle", registerName: "cycle" },
  { id: 3, unit: "(℃)", label: "Off", registerName: "offValue" },
  { id: 4, unit: "(%)", label: "Twin Timer", registerName: "twinTimer" },
];
