import Modal from "@/components/common/modal";

const RegisterModal = () => {
  return (
    <Modal
      title="센서 설정"
      buttonList={BTN_LIST}
      className="w-[46.25rem] h-auto z-100"
    >
      <div className="w-full h-[28.125rem] flex flex-col justify-center items-center py-3 gap-5"></div>
    </Modal>
  );
};

export default RegisterModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.svg" },
  { id: 2, name: "설정저장", img: "save@2x.svg" },
];
