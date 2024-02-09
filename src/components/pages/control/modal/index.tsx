import Modal from "@/components/common/modal";

const DeviceModal = () => {
  return (
    <Modal
      title="장치설정"
      buttonList={BTN_LIST}
      className="w-[54.625rem] h-auto z-100"
    >
      <div className="w-full flex justify-center items-center py-3">
        <div className="grid-cols-4 grid gap-[.625rem] gap-x-[3.125rem] max-w-[36.8125rem] justify-center"></div>
      </div>
    </Modal>
  );
};

export default DeviceModal;

const BTN_LIST = [{ id: 2, name: "설정저장", img: "save@2x.png" }];
