import { UseFormReturn, useFieldArray, useForm } from "react-hook-form";

import { CctvDataList } from "control";

import Modal from "@/components/common/modal";
import { Input } from "@/components/common/input";
import Radio from "@/components/common/radio";
import Button from "@/components/common/button";
import { useEffect } from "react";
import useUpdateCctv from "@/hooks/service/cctv/useUpdateCctv";

export const CctvSettingModal = ({
  cctvData,
  methods,
  section,
}: {
  cctvData: CctvDataList[];
  methods: UseFormReturn;
  section: string;
}) => {
  const { updateCctvData } = useUpdateCctv();

  const { control, register } = useForm({
    defaultValues: {
      urlList: cctvData.map((data) => ({
        name: data.name || "",
        ip: data.ip || "",
        enable: data.enable || 0,
      })),
    },
  });

  const { fields, append } = useFieldArray({
    name: "urlList",
    control: control,
  });

  // 추가
  const addList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    append({ name: "", ip: "", enable: 0 });
  };

  // 저장
  const handleSaveSetting = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
  ) => {
    e.preventDefault();
    if (!confirm("저장하시겠습니까?")) return;

    const updateData = {
      ...cctvData[index],
      name: methods.getValues(`name.${index}`),
      ip: methods.getValues(`ip.${index}`),
      enable: methods.getValues(`enable.${index}`) === "1" ? 1 : 0,
      farmCode: "0002", // 추후 유저 데이터로 변경!!!
      houseNo: `0${section}`,
      id: index + 1,
    };

    updateCctvData(JSON.stringify(updateData));
  };

  // 현재 데이터
  useEffect(() => {
    if (!cctvData?.length) return;

    methods.reset({
      name: cctvData.map((value) => value.name),
      ip: cctvData.map((value) => value.ip),
      enable: cctvData.map((value) => value.enable),
    });
  }, [cctvData]);

  return (
    <Modal title="설정" className="w-[50rem] h-auto !max-h-[95%] z-100">
      <form>
        <div className="w-full h-auto flex flex-col justify-center items-center py-6 gap-5">
          <div className="w-full flex justify-end">
            <Button
              customType="MAIN"
              className="w-[5.625rem] h-[2.8125rem]"
              onClick={addList}
            >
              추가
            </Button>
          </div>
          <div className="flex w-full justify-center items-center gap-4 overflow-y-scroll h-[37.5625rem]">
            <ul className="flex flex-col gap-6 w-full h-full">
              {fields.map((field, index) => {
                return (
                  <>
                    <li
                      key={index}
                      className="flex w-full items-center border rounded-md p-4 border-white/30"
                    >
                      <div className="flex flex-col justify-center w-full gap-2">
                        <div className="flex justify-between items-center">
                          <Input
                            registerName={`name.${index}`}
                            key={field.id}
                            {...register(`urlList.${index}.name`)}
                            inputWrap="w-10/12 bg-sub2"
                            label="이름"
                            className="text-4 font-bold text-white w-full"
                            labelMarginNone
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Input
                            registerName={`ip.${index}`}
                            key={field.id}
                            {...register(`urlList.${index}.ip`)}
                            inputWrap="w-10/12 bg-sub2"
                            label="ip"
                            className="text-4 font-bold text-white w-full"
                            labelMarginNone
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <span
                            className={`font-bold text-[1.125rem] inline-block text-white`}
                          >
                            사용유무
                          </span>
                          <div className="flex justify-center w-10/12 h-[2.8125rem] gap-[3.75rem]">
                            {ENABLED_LIST.map((list) => {
                              const id = `enable-${list.id}-${index}`;
                              return (
                                <>
                                  <Radio
                                    key={id}
                                    registerName={`enable.${index}`}
                                    {...register(`urlList.${index}.enable`)}
                                    labelTitle={list.label}
                                    className="!gap-2 text-white font-bold text-[1.125rem]"
                                    name="enable"
                                    value={list.id}
                                    id={id}
                                    defaultChecked={true}
                                  />
                                </>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          customType="MAIN"
                          className="w-[5.625rem] h-[2.8125rem] ml-4"
                          onClick={(e) => handleSaveSetting(e, index)}
                        >
                          저장
                        </Button>
                      </div>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </form>
    </Modal>
  );
};

const ENABLED_LIST = [
  { id: 0, label: "미사용" },
  { id: 1, label: "사용" },
];
