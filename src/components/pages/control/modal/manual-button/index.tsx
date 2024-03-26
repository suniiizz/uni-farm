import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";

const ManualControl = ({
  manualBtn,
  setModalType,
}: {
  manualBtn: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { onCloseModal } = useContext(ModalContext);

  return (
    <>
      <Modal
        title={`(${manualBtn})수동 동작 하시겠습니까?`}
        className="w-[23.75rem] h-auto z-100 bg-white"
        type
      >
        <Button
          onClick={onCloseModal}
          customType="SUB"
          className="absolute !rounded right-[.625rem] top-[.625rem] bg-[url('src/assets/icon/close-30-white@2x.svg')] bg-no-repeat bg-center bg-contain"
        ></Button>
        <div className="flex justify-center gap-2">
          <Button customType="SUB" className="w-[7.5rem]">
            ON
          </Button>
          <Button customType="SUB" className="w-[7.5rem]">
            OFF
          </Button>
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => setModalType("manual-control")}
          >
            제어설정
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ManualControl;
