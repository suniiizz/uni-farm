import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import Radio from "@/components/common/radio";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/common/input";

const GroupContol = ({ controlBtn }: { controlBtn: string }) => {
  const { onCloseModal } = useContext(ModalContext);

  const methods = useForm();

  const handleTargetPosition = (num: number) => {
    methods.setValue("targetLocaion", num);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Modal
          title={`${controlBtn === "그룹 제어" ? "" : `${controlBtn} 하시겠습니까?`}`}
          className="w-[23.75rem] h-auto z-100 bg-white py-[1.875rem]"
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
                            handleTargetPosition(parseInt(list.num))
                          }
                        >
                          {list.num}%
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <Input
                  registerName="targetLocaion"
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
                  onClick={onCloseModal}
                >
                  동작 취소
                </Button>
                <Button customType="SUB" className="w-[7.5rem]">
                  작동 시작
                </Button>
              </>
            ) : (
              <>
                <Button customType="SUB" className="w-[7.5rem]">
                  예
                </Button>
                <Button
                  customType="SUB"
                  className="w-[7.5rem]"
                  onClick={onCloseModal}
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

export default GroupContol;

const BTN_LIST = [
  { id: 1, num: "25" },
  { id: 1, num: "50" },
  { id: 1, num: "75" },
  { id: 1, num: "100" },
];
