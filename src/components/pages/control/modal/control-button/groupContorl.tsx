import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import Radio from "@/components/common/radio";
import { FormProvider, useForm } from "react-hook-form";

const GroupContol = ({ controlBtn }: { controlBtn: string }) => {
  const { onCloseModal } = useContext(ModalContext);

  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <Modal
          title={`${controlBtn === "그룹 제어" ? "" : `${controlBtn} 하시겠습니까?`}`}
          className="w-[23.75rem] h-auto z-100 bg-white"
          type
          pbNone={controlBtn === "그룹 제어" ? true : false}
        >
          {controlBtn === "그룹 제어" && (
            <>
              <div className="flex justify-between">
                <Radio
                  registerName="allSelect"
                  labelTitle="전체 동 선택"
                  className="!gap-2"
                  name="select"
                  value={0}
                />
                <Radio
                  registerName="allSelect"
                  labelTitle="전체 개폐기 선택"
                  className="!gap-2"
                  name="select"
                  value={1}
                />
              </div>
              <div className="py-4">
                <p className="text-[1.125rem] font-bold">목표위치</p>
                <div></div>
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
