import { useContext } from "react";

import { ManualData, ManualItem } from "control";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { updateManualData } from "@/http/control";

const ManualControl = ({
  manualData,
  manualBtn,
  type,
  setModalType,
  handleControlSetting,
}: {
  manualData: ManualItem[];
  manualBtn: number;
  type: (no: number) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  handleControlSetting: (manualBtn: number) => void;
}) => {
  const { onCloseModal } = useContext(ModalContext);

  // on/off
  const handleManualMove = (control: string, id?: number) => {
    const updatedManualData = manualData.map((item: ManualData) => {
      if (control === "on" && item.no === id) {
        return { ...item, value: 100, controlMode: 1 };
      } else if (control === "off" && item.no === id) {
        return { ...item, value: 0, controlMode: 1 };
      } else {
        return { ...item, controlMode: 0 };
      }
    });

    updateManualData(JSON.stringify(updatedManualData));

    onCloseModal();
  };

  return (
    <>
      <Modal
        title={`(${type(manualBtn)})수동 동작 하시겠습니까?`}
        className="w-[23.75rem] h-auto z-100 bg-white"
        type
      >
        <Button
          onClick={onCloseModal}
          customType="SUB"
          className="absolute !rounded right-[.625rem] top-[.625rem] bg-[url('../src/assets/icon/close-30-white@2x.svg')] bg-no-repeat bg-center bg-contain"
        ></Button>
        <div className="flex justify-center gap-2">
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => handleManualMove("on", manualBtn)}
          >
            ON
          </Button>
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => handleManualMove("off", manualBtn)}
          >
            OFF
          </Button>
          <Button
            customType="SUB"
            className="w-[7.5rem]"
            onClick={() => {
              setModalType("manual-control");
              handleControlSetting(manualBtn);
            }}
          >
            제어설정
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ManualControl;
