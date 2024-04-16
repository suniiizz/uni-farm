import { useContext, useState } from "react";

import AlertModal from "@/components/pages/alert/modal/setting";
import Button from "@/components/common/button";
import { ModalContext } from "@/components/common/modal/context/modalContext";

const AlertList = () => {
  const { isOpen, onOpenModal } = useContext(ModalContext);

  const [modalType, setModalType] = useState("");

  const handleOpenModal = (type: string) => {
    setModalType(type);
    onOpenModal();
  };

  return (
    <>
      <div className="w-full">
        <div className="m-6 bg-main rounded-[.625rem] h-[calc(100vh-6.75rem)]">
          {/* 상단 타이틀 */}
          <div className="h-full relative">
            <div className="h-[4.375rem] p-6 bg-main rounded-t-[.625rem] border-b border-mainLine flex justify-between items-center relative">
              <div className="flex gap-6 items-center">
                <h2 className="text-[1.5rem] text-[#fff] font-bold">
                  경보 현황
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  customType="MAIN"
                  className="w-[7.5rem] gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                  onClick={() => handleOpenModal("alert")}
                >
                  <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/setting@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                  경보설정
                </Button>
                <Button
                  customType="MAIN"
                  className="w-[7.5rem] gap-2 text-center relative pl-[2.5rem] pr-[1.25rem]"
                  // onClick={() => handleOpenModal("control")}
                >
                  <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/data_log@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
                  경보내역
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isOpen && modalType === "alert" && <AlertModal />}
    </>
  );
};

export default AlertList;
