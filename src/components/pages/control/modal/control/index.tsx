import Button from "@/components/common/button";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Modal from "@/components/common/modal";
import { TimeInput } from "@/components/common/input";

const ControlModal = () => {
  return (
    <Modal
      title="개폐기 시간 및 작동방법 설정"
      buttonList={BTN_LIST}
      className="w-[54.625rem] h-auto z-100"
    >
      <div className="w-full flex flex-col justify-center items-center py-3 gap-[.625rem]">
        <div className="grid-cols-4 grid gap-[.625rem] gap-x-[3.125rem] justify-center">
          {CHECK_LIST.map((list) => {
            return <CheckBox labelTitle={list.name} key={list.id} />;
          })}
        </div>
        <div className="w-full flex flex-col justify-center items-center max-w-[36.8125rem] gap-[.375rem]">
          {CONT_LIST.map((list) => {
            return (
              <>
                <div className="flex items-center gap-[.625rem]">
                  <Button
                    customType="MODAL"
                    className="py-[.625rem] w-[8.4375rem] h-[2.8125rem] !text-[1.375rem]"
                  >
                    {list.name}
                  </Button>
                  <TimeInput />
                  <CheckBox />
                  <Select options={SETTING} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default ControlModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.png" },
  { id: 2, name: "설정저장", img: "save@2x.png" },
];

const CHECK_LIST = [
  { id: 1, name: "좌 측창 1" },
  { id: 2, name: "좌 측창 2" },
  { id: 3, name: "좌 측창 3" },
  { id: 4, name: "우 측창 1" },
  { id: 5, name: "우 측창 2" },
  { id: 6, name: "우 측창 3" },
  { id: 7, name: "좌 천창 1" },
  { id: 8, name: "좌 천창 2" },
  { id: 9, name: "좌 천창 3" },
  { id: 10, name: "우 천창 1" },
  { id: 11, name: "우 천창 2" },
  { id: 12, name: "우 천창 3" },
];

const CONT_LIST = [
  { id: 1, name: "시간 1" },
  { id: 2, name: "시간 2" },
  { id: 3, name: "시간 3" },
  { id: 4, name: "시간 4" },
  { id: 5, name: "시간 5" },
  { id: 6, name: "시간 6" },
];

const SETTING = [
  { id: 1, value: "", name: "선택" },
  { id: 2, value: "예약", name: "예약" },
  { id: 3, value: "센서", name: "센서" },
];
