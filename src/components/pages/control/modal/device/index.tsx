import Modal from "@/components/common/modal";
import { Input } from "@/components/common/input";

const DeviceModal = () => {
  return (
    <Modal
      title="장치설정"
      buttonList={BTN_LIST}
      className="w-[54.625rem] h-auto z-100"
    >
      <div className="w-full flex justify-center items-start py-3 gap-[2.5rem]">
        <div className="flex flex-col">
          <div className="flex justify-end gap-[3.75rem] items-center mb-5">
            <span className="font-bold text-white text-[1.125rem] inline-block w-[7.5rem] text-center">
              오차범위
            </span>
            <span className="font-bold text-white text-[1.125rem]  inline-block w-[7.5rem] text-center">
              작동지연
            </span>
          </div>
          <ul className="flex flex-col gap-[.6875rem]">
            {LEFT_CONT_LIST.map((list) => {
              return (
                <li key={list.id} className="flex justify-between items-center">
                  <span className="font-bold text-white text-[1.125rem] inline-block mr-[3.75rem]">
                    {list.name}
                  </span>
                  <span className="font-bold text-white text-[1.125rem]">
                    ±
                  </span>
                  <Input
                    inputWrap="w-[7.5rem] bg-sub2 mr-[3.75rem] ml-2"
                    className="text-4 font-bold text-right text-white w-full"
                    unit={list.unit1 && list.unit1}
                  />
                  <Input
                    inputWrap="w-[7.5rem] bg-sub2"
                    className="text-4 font-bold text-right text-white w-full"
                    unit={list.unit2 && list.unit2}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <div className="flex justify-end items-center mb-5">
            <span className="font-bold text-white text-[1.125rem] inline-block w-[7.5rem] text-center">
              작동지연
            </span>
          </div>
          <ul className="flex flex-col justify-between gap-[2.6875rem]">
            {RIGHT_CONT_LIST.map((list) => {
              return (
                <li key={list.id} className="flex justify-between items-center">
                  <span className="font-bold text-white text-[1.125rem] inline-block mr-[3.75rem]">
                    {list.name}
                  </span>
                  <Input
                    inputWrap="w-[7.5rem] bg-sub2 ml-2"
                    className="text-4 font-bold text-right text-white w-full"
                    unit={list.unit1 && list.unit1}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Modal>
  );
};

export default DeviceModal;

const BTN_LIST = [{ id: 2, name: "설정저장", img: "save@2x.svg" }];

const LEFT_CONT_LIST = [
  { id: 1, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 2, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 3, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 4, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 5, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 6, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 7, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 8, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 9, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 10, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 11, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
  { id: 12, name: "1동 좌 측창1", unit1: "(%)", unit2: "초" },
];

const RIGHT_CONT_LIST = [
  { id: 1, name: "1동 냉방", unit1: "(초)" },
  { id: 2, name: "1동 난방", unit1: "(초)" },
  { id: 3, name: "1동 제습", unit1: "(초)" },
  { id: 4, name: "1동 가습", unit1: "(초)" },
  { id: 5, name: "1동 환풍", unit1: "(초)" },
  { id: 6, name: "1동 공급", unit1: "(초)" },
  { id: 7, name: "1동 순환", unit1: "(초)" },
  { id: 8, name: "1동 관수", unit1: "(초)" },
];
