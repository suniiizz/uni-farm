import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import Radio from "@/components/common/radio";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/common/input";

const GroupControl = ({
  controlBtn,
  updateEmergencyControlData,
  updateEmergencyManualData,
  updateAutoControlData,
  updateAutoManualData,
  updateGroupControlData,
  setSliderChecked,
  setManualChecked,
  setModalType,
}: {
  controlBtn: string;
  updateEmergencyControlData: () => void;
  updateEmergencyManualData: () => void;
  updateAutoControlData: () => void;
  updateAutoManualData: () => void;
  updateGroupControlData: (inputValue: number) => void;
  setSliderChecked: React.Dispatch<React.SetStateAction<number[]>>;
  setManualChecked: React.Dispatch<React.SetStateAction<number[]>>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { onCloseModal } = useContext(ModalContext);

  const methods = useForm();

  const handleSelectPosition = (num: number) => {
    methods.setValue("selectLocation", num);
  };

  const handleAutoControl = () => {
    if (controlBtn === "자동 제어 복귀") {
      updateAutoControlData();
      updateAutoManualData();
    } else if (controlBtn === "긴급 제어") {
      updateEmergencyControlData();
      updateEmergencyManualData();
    }

    onCloseModal();
    setModalType("");
    setSliderChecked([]);
    setManualChecked([]);
  };

  const handleGroupControl = () => {
    const inputValue = methods.getValues("selectLocation");
    updateGroupControlData(parseInt(inputValue));

    onCloseModal();
    setModalType("");
    setSliderChecked([]);
  };

  const handleCancelClick = () => {
    onCloseModal();
    window.location.reload();
  };

  return (
    <>
      <FormProvider {...methods}>
        <Modal
          title={`${controlBtn === "그룹 제어" ? "" : `${controlBtn} 하시겠습니까?`}`}
          className={`${controlBtn === "그룹 제어" && "!bottom-0 z-50"} w-[23.75rem] h-auto z-100 bg-white py-[1.875rem]`}
          type
          pbNone={controlBtn === "그룹 제어" ? true : false}
        >
          {controlBtn === "그룹 제어" && (
            <>
              <div className="flex justify-between">
                <Radio
                  id="전체 동 선택"
                  registerName="allSelect"
                  labelTitle="전체 동 선택"
                  className="!gap-2"
                  name="select"
                  value={0}
                />
                <Radio
                  id="전체 개폐기 선택"
                  registerName="allSelect"
                  labelTitle="전체 개폐기 선택"
                  className="!gap-2"
                  name="select"
                  value={1}
                  onChangeCallback={() => {
                    setSliderChecked([
                      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                    ]);
                  }}
                />
              </div>
              <div className="pt-6 py-8">
                <div className="pb-4 flex justify-between items-center">
                  <p className="text-[1.125rem] font-bold ">목표위치</p>
                  <div className="flex gap-2">
                    {BTN_LIST.map((list) => {
                      return (
                        <Button
                          key={list.id}
                          customType="INPUT"
                          className="font-normal"
                          onClick={() =>
                            handleSelectPosition(parseInt(list.num))
                          }
                        >
                          {list.num}%
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <Input
                  registerName="selectLocation"
                  inputWrap="w-full bg-sub2"
                  className="text-4 font-normal w-full text-right text-white"
                  unit="%"
                  labelBlack
                />
              </div>
            </>
          )}
          <div className="flex justify-center gap-2">
            {controlBtn === "그룹 제어" ? (
              <>
                <Button
                  customType="SUB"
                  className="w-[7.5rem]"
                  onClick={handleCancelClick}
                >
                  동작 취소
                </Button>
                <Button
                  customType="SUB"
                  className="w-[7.5rem]"
                  onClick={handleGroupControl}
                >
                  작동 시작
                </Button>
              </>
            ) : (
              <>
                <Button
                  customType="SUB"
                  className="w-[7.5rem]"
                  onClick={handleAutoControl}
                >
                  예
                </Button>
                <Button
                  customType="SUB"
                  className="w-[7.5rem]"
                  onClick={handleCancelClick}
                >
                  아니오
                </Button>
              </>
            )}
          </div>
        </Modal>
      </FormProvider>
    </>
  );
};

export default GroupControl;

const BTN_LIST = [
  { id: 1, num: "25" },
  { id: 1, num: "50" },
  { id: 1, num: "75" },
  { id: 1, num: "100" },
];
