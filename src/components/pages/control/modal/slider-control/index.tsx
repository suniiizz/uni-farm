import { useContext } from "react";

import { updataControlData } from "@/http/control";

import { ModalContext } from "@/components/common/modal/context/modalContext";
import Button from "@/components/common/button";
import Modal from "@/components/common/modal";
import { testFunc } from "@/components/common/slider";

const SliderControl = () => {
  const { onCloseModal } = useContext(ModalContext); // 모달 타입 변경 함수 추가

  const test = async () => {
    const dataList = [
      {
        id: 172,
        no: 1,
        enable: 1,
        shape: 3,
        shapeName: "3좌측측창",
        location: 1,
        outputNo: 0,
        value: 10,
        controlMode: 0,
        houseNo: "01",
        farmCode: "0002",
      },
      {
        id: 203,
        no: 2,
        enable: 1,
        shape: 6,
        shapeName: "3우측측창",
        location: 2,
        outputNo: 0,
        value: 10,
        controlMode: 0,
        houseNo: "01",
        farmCode: "0002",
      },
      {
        id: 234,
        no: 3,
        enable: 1,
        shape: 2,
        shapeName: "2좌측측창",
        location: 3,
        outputNo: 0,
        value: 10,
        controlMode: 0,
        houseNo: "01",
        farmCode: "0002",
      },
    ];

    updataControlData(JSON.stringify(dataList))
      .then((response) => {
        console.log("200", response.data);

        if (response.status === 200) {
          console.log("성공");
        }
      })
      .catch((error) => console.log(error.response));
  };

  const test = () => {
    onCloseModal();
    testFunc();
  };

  return (
    <>
      <Modal
        title="동작 하시겠습니까?"
        className="w-[23.75rem] z-100 bg-white text-black"
        type
      >
        <div className="flex justify-center gap-2">
          <Button customType="SUB" className="w-[7.5rem]" onClick={test}>
            동작
          </Button>
          <Button onClick={test} customType="SUB" className="w-[7.5rem]">
            취소
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default SliderControl;
