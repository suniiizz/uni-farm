import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";

const ManualControl = ({
  manualBtn,
  setModalType,
  handleManualMove,
}: {
  manualBtn: string;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  handleManualMove: (control: string, id?: number) => void;
}) => {
  const { onCloseModal } = useContext(ModalContext);

  const type = (name: string) => {
    switch (name) {
      case "냉방":
        return 1;
      case "난방":
        return 2;
      case "제습":
        return 3;
      case "가습":
        return 4;
      case "환풍":
        return 5;
      case "공급":
        return 6;
      case "급수":
        return 7;
      case "관수":
        return 8;
      default:
        return;
    }
  };

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
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => handleManualMove("on", type(manualBtn))}
          >
            ON
          </Button>
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => handleManualMove("off", type(manualBtn))}
          >
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
