import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { Input } from "@/components/common/input";
import Modal from "@/components/common/modal";
import Select from "@/components/common/select";

const SensorSettingModal = () => {
  const methods = useForm();
  const [availableInfo, setAvailableInfo] = useState(0);

  const handleSensorChange = (value: string) => {
    setAvailableInfo(parseInt(value));
  };

  return (
    <FormProvider {...methods}>
      <Modal
        title="센서 설정"
        buttonList={BTN_LIST}
        className="w-[46.25rem] h-auto z-100"
      >
        <div className="w-full h-auto flex flex-col justify-center items-center py-3 gap-5">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <span className="text-[1.125rem] font-bold text-white">센서</span>
              <Select
                options={SENSOR_OPTION}
                selectWrap="w-[9.375rem]"
                onChange={(e) => handleSensorChange(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Input
                inputWrap="w-[9.375rem] bg-sub2"
                className="text-4 font-bold text-white w-full"
                label="비고"
                registerName=""
              />
            </div>
            <div className="flex flex-col">
              <Input
                inputWrap="w-full bg-sub2"
                className="text-4 font-bold text-white w-full"
                label="사용 가능 정보"
                registerName=""
                value={
                  availableInfo === 1
                    ? "온도, 습도, CO2, 일사"
                    : availableInfo === 2
                      ? "Pt100, pH, EC"
                      : availableInfo === 3
                        ? "기온,습기,일사,CO"
                        : availableInfo === 4
                          ? "풍향,풍속,강우,기온,습기,일사"
                          : ""
                }
                readOnly
              />
            </div>
          </div>

          <div>
            <ul>
              {(availableInfo === 0 || availableInfo === 1) && (
                <>
                  {CONT_OPTION_1.map((list) => {
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
                              registerName=""
                              defaultValue={0}
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              disabled={list.id !== 1 ? true : false}
                              defaultValue={0}
                            />
                          </div>
                          <span className="text-white text-4 inline-block">
                            ~
                          </span>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Max :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              unit={list.unit}
                              registerName=""
                              disabled={list.id === 2 ? true : false}
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {availableInfo === 2 && (
                <>
                  {CONT_OPTION_2.map((list) => {
                    return (
                      <li key={list.id} className="flex gap-2">
                        <div className="flex flex-col items-center">
                          <div>
                            <span className="font-bold text-white text-4 inline-block mr-[3.75rem]">
                              {list.name1}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <span className="text-white text-4 inline-block">
                                  보정값 :
                                </span>
                                <Input
                                  inputWrap="w-[7.5rem] bg-sub2 ml-2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  registerName=""
                                  defaultValue={0}
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <span className="font-bold text-white text-4 inline-block mr-[3.75rem]">
                              {list.name2}
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                <span className="text-white text-4 inline-block">
                                  보정값 :
                                </span>
                                <Input
                                  inputWrap="w-[7.5rem] bg-sub2 ml-2"
                                  className="text-4 font-bold text-right text-white w-full"
                                  registerName=""
                                  defaultValue={0}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        {list.unit && (
                          <div className="flex items-center gap-2 mt-5">
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Min :
                              </span>
                              <Input
                                inputWrap="w-[7.5rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                registerName=""
                                disabled={list.id === 2 ? true : false}
                                defaultValue={0}
                              />
                            </div>
                            <span className="text-white text-4 inline-block">
                              ~
                            </span>
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Max :
                              </span>
                              <Input
                                inputWrap="w-[7.5rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                unit={list.unit}
                                registerName=""
                                defaultValue={0}
                              />
                            </div>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </>
              )}
              {availableInfo === 3 && (
                <>
                  {CONT_OPTION_3.map((list) => {
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
                              registerName=""
                              defaultValue={0}
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              disabled={list.id === 1 ? false : true}
                              defaultValue={0}
                            />
                          </div>
                          <span className="text-white text-4 inline-block">
                            ~
                          </span>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Max :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              unit={list.unit}
                              registerName=""
                              disabled={
                                list.id === 2 || list.id === 5 ? true : false
                              }
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {availableInfo === 4 && (
                <>
                  {CONT_OPTION_4.map((list) => {
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
                              registerName=""
                              defaultValue={0}
                            />
                          </div>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              disabled={list.id === 4 ? false : true}
                              defaultValue={0}
                            />
                          </div>
                          <span className="text-white text-4 inline-block">
                            ~
                          </span>
                          <div className="flex items-center">
                            <span className="text-white text-4 inline-block">
                              Max :
                            </span>
                            <Input
                              inputWrap="w-[7.5rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              unit={list.unit}
                              registerName=""
                              disabled={
                                list.id === 2 || list.id === 5 ? true : false
                              }
                              defaultValue={0}
                            />
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
            <span className="text-white text-left inline-block mt-4">
              ※ 셋팅 입력 값 범위 : Min ~ Max
            </span>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default SensorSettingModal;

const BTN_LIST = [
  { id: 1, name: "설명서", img: "info@2x.svg" },
  { id: 2, name: "설정저장", img: "save@2x.svg" },
];

const SENSOR_OPTION = [
  { id: 0, name: "선택", value: "" },
  { id: 1, name: "실내 1", value: 1 },
  { id: 2, name: "실내 2", value: 1 },
  { id: 3, name: "실내 3", value: 1 },
  { id: 4, name: "실내 4", value: 1 },
  { id: 5, name: "실내 5", value: 2 },
  { id: 6, name: "외부환경 VT260", value: 3 },
  { id: 7, name: "외부환경 기상대", value: 4 },
];

const CONT_OPTION_1 = [
  { id: 1, name: "온도", unit: "(℃)" },
  { id: 2, name: "습도", unit: "(%)" },
  { id: 3, name: "CO2", unit: "(ppm)" },
  { id: 4, name: "일사", unit: "(W/㎡)" },
];

const CONT_OPTION_2 = [
  { id: 1, name1: "Pt100-1", name2: "Pt100-2", unit: "(℃)" },
  // { id: 2, name: "Pt100-2" },
  { id: 2, name1: "pH-1", name2: "pH-2", unit: "(pH)" },
  // { id: 4, name: "pH-2" },
  { id: 3, name1: "EC-1", name2: "EC-2", unit: "(mD/cm)" },
  // { id: 6, name: "EC-2" },
];

const CONT_OPTION_3 = [
  { id: 1, name: "기온", unit: "(℃)" },
  { id: 2, name: "습기", unit: "(%)" },
  { id: 3, name: "CO2", unit: "(ppm)" },
  { id: 4, name: "일사", unit: "(W/㎡)" },
];

const CONT_OPTION_4 = [
  { id: 1, name: "풍속", unit: "(m/s)" },
  { id: 2, name: "풍향", unit: "(˚)" },
  { id: 3, name: "강우", unit: "(mm)" },
  { id: 4, name: "기온", unit: "(℃)" },
  { id: 5, name: "습기", unit: "(%)" },
  { id: 6, name: "일사", unit: "(W/㎡)" },
];
