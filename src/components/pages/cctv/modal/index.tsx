import { useFieldArray, useForm } from "react-hook-form";

import Modal from "@/components/common/modal";
import { Input } from "@/components/common/input";
import Radio from "@/components/common/radio";
import Button from "@/components/common/button";

export const CctvSettingModal = () => {
  const { control, register } = useForm({
    defaultValues: {
      urlList: [{ name: "", ip: "", enabled: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "urlList",
    control: control,
  });

  const addList = (e) => {
    e.preventDefault();
    append({ name: "", ip: "", enabled: 0 });
  };

  const removeList = (index: number) => (e) => {
    e.preventDefault();
    remove(index);
  };

  const handleSubmit = () => {};

  // 저장
  const handleSaveSetting = () => {
    if (!confirm("저장하시겠습니까?")) return;
  };

  return (
    <Modal
      title="설정"
      buttonList={BTN_LIST}
      className="w-[50rem] h-auto !max-h-[95%] z-100"
      onClickCallBack={handleSaveSetting}
    >
      <form onSubmit={handleSubmit}>
        <div className="w-full h-auto flex flex-col justify-center items-center py-6 gap-5 border-b border-white/30">
          <div className="w-full flex justify-end">
            <Button
              customType="MAIN"
              className="w-[5.625rem] h-[2.8125rem]"
              onClick={addList}
            >
              추가
            </Button>
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <ul className="flex flex-col gap-6 w-full">
              {fields.map((field, index) => {
                return (
                  <>
                    <li className="flex w-full items-center border rounded-md p-4 border-white/30">
                      <div className="flex flex-col justify-center w-full gap-2">
                        <div className="flex justify-between items-center">
                          <Input
                            key={field.id}
                            {...register(`urlList.${index}.name`)}
                            inputWrap="w-10/12 bg-sub2"
                            label="이름"
                            className="text-4 font-bold text-right text-white w-full"
                            labelMarginNone
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <Input
                            key={field.id}
                            {...register(`urlList.${index}.ip`)}
                            inputWrap="w-10/12 bg-sub2"
                            label="ip"
                            className="text-4 font-bold text-right text-white w-full"
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
                              return (
                                <Radio
                                  registerName={`${`urlList.${index}.enabled`}`}
                                  {...register(`urlList.${index}.enabled`)}
                                  labelTitle={list.label}
                                  className="!gap-2 text-white font-bold text-[1.125rem]"
                                  name="enabled"
                                  value={list.id}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="w-[6.25rem] ml-4">
                        {index >= 1 && (
                          <Button
                            customType="MAIN"
                            className="w-[5.625rem] h-[2.8125rem]"
                            onClick={removeList(index)}
                          >
                            삭제
                          </Button>
                        )}
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

const BTN_LIST = [{ id: 2, name: "저장", img: "save@2x.svg" }];

const ENABLED_LIST = [
  { id: 0, label: "미사용" },
  { id: 1, label: "사용" },
];
