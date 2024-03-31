import { useContext } from "react";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";

const SliderControl = () => {
  const { onCloseModal } = useContext(ModalContext);

  const handleCancleClick = () => {
    onCloseModal();
    window.location.reload();
  };

  return (
    <>
      <Modal
        title="동작 하시겠습니까?"
        className="w-[23.75rem] z-100 bg-white text-black"
        type
      >
        <div className="flex justify-center gap-2">
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={onCloseModal}
          >
            동작
          </Button>
          <Button
            onClick={handleCancleClick}
            customType="SUB"
            className="w-[7.5rem]"
          >
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SliderControl;
