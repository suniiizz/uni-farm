import { useContext } from "react";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { ModalContext } from "@/components/common/modal/context/modalContext";

const SliderControl = () => {
  const { onCloseModal } = useContext(ModalContext);

  return (
    <>
      <Modal
        title="동작 하시겠습니까?"
        className="w-[23.75rem] z-100 bg-white text-black"
        type
      >
        <div className="flex justify-center gap-4">
          <Button customType="SUB" className="w-[7.5rem]">
            동작
          </Button>
          <Button
            onClick={onCloseModal}
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
