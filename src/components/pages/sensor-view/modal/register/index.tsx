import { Input } from "@/components/common/input";
import Modal from "@/components/common/modal";
import Select from "@/components/common/select";

const RegisterModal = () => {
  return (
    <Modal
      title="센서 설정"
      buttonList={BTN_LIST}
      className="w-[46.25rem] h-auto z-100"
    >
      <div className="w-full h-auto flex flex-col justify-center items-center py-3 gap-5">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <span className="text-[1.125rem] font-bold text-white">센서</span>
            <Select options={SENSOR_OPTION} selectWrap="w-[9.375rem]" />
          </div>
          <div className="flex flex-col">
            <Input
              inputWrap="w-[9.375rem] bg-sub2"
              className="text-4 font-bold text-white w-full"
              label="비고"
            />
          </div>
          <div className="flex flex-col">
            <Input
              inputWrap="w-full bg-sub2"
              className="text-4 font-bold text-white w-full"
              label="사용 가능 정보"
            />
          </div>
        </div>

        <div>
          <ul>
            {CONT_OPTION.map((list) => {
              return (
                <li key={list.id}>
                  <span className="font-bold text-white text-4 inline-block mr-[3.75rem]">
                    {list.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <span className="text-white text-4 inline-block">
                        보정값 :
                      </span>
                      <Input
                        inputWrap="w-[7.5rem] bg-sub2 ml-2"
                        className="text-4 font-bold text-right text-white w-full"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-white text-4 inline-block">
                        Min :
                      </span>
                      <Input
                        inputWrap="w-[7.5rem] bg-sub2 ml-2"
                        className="text-4 font-bold text-right text-white w-full"
                      />
                    </div>
                    <span className="text-white text-4 inline-block">~</span>
                    <div className="flex items-center">
                      <span className="text-white text-4 inline-block">
                        Max :
                      </span>
                      <Input
                        inputWrap="w-[7.5rem] bg-sub2 ml-2"
                        className="text-4 font-bold text-right text-white w-full"
                        unit={list.unit}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <span className="text-white text-left inline-block mt-4">
            ※ 셋팅 입력 값 범위 : Min ~ Max
          </span>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.svg" },
  { id: 2, name: "설정저장", img: "save@2x.svg" },
];

const SENSOR_OPTION = [{ id: 1, name: "외부환경 기상대" }];

const CONT_OPTION = [
  { id: 1, name: "풍속", unit: "(m/s)" },
  { id: 2, name: "풍향", unit: "(˚)" },
  { id: 3, name: "강우", unit: "(mm)" },
  { id: 4, name: "기온", unit: "(℃)" },
  { id: 5, name: "습기", unit: "(%)" },
  { id: 6, name: "일사", unit: "(W/㎡)" },
];
