import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";

import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Modal from "@/components/common/modal";
import { Input } from "@/components/common/input";
import VerticalTab from "@/components/common/tab";
import CheckBox from "@/components/common/checkbox";
import Select from "@/components/common/select";
import Button from "@/components/common/button";

const AlertModal = () => {
  const methods = useForm();

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [section, setSection] = useState("");
  const [value, setValue] = useState(1);
  const [option, setOption] = useState(1);

  // 사이드탭
  useEffect(() => {
    const parsedSection = searchParams.get("section");
    setSection(parsedSection ? parsedSection : "1");
  }, [location]);

  const handleSideTabChange = (newValue: number) => {
    setValue(newValue);
  };

  //상단 옵션 선택
  const handleOptionSelect = (value: string) => {
    setOption(parseInt(value));
  };

  return (
    <FormProvider {...methods}>
      <Modal
        title="경보 설정"
        buttonList={BTN_LIST}
        className="w-dvw h-auto z-100 !p-0"
        titleWrap
      >
        <div className="w-full h-full flex justify-center items-start gap-[2.5rem] px-[.9375rem] pb-[.625rem]">
          {/* 사이드 탭 */}
          <div className="flex items-center flex-col justify-between gap-[1.125rem] sticky left-0 top-[5rem] w-[4.375rem] h-[calc(100%-5rem)] bg-main rounded-bl-[.625rem]">
            <div className="flex flex-col gap-[.625rem] h-[80vh] pt-3">
              <CustomTabs
                orientation="vertical"
                variant="scrollable"
                role="navigation"
                value={value}
                scrollButtons
                allowScrollButtonsMobile
                onChange={() => handleSideTabChange(value)}
                className="justify-between h-full"
              >
                <div className="flex flex-col gap-[.625rem] h-full">
                  {LIST.map((list) => {
                    return (
                      <Link
                        key={list.id}
                        to={`?section=${list.num}`}
                        className={`bg-mainButton/30 !p-0 leading-[2rem] rounded-lg border border-white ${list.num === section && "bg-yellow/100 border-none"} w-[3.125rem] h-[7.5rem] flex items-center justify-center hover:no-underline hover:text-white focus:no-underline focus:text-white text-white`}
                      >
                        <Tab
                          value={list.num}
                          label={
                            <span className="text-[1.5rem]">
                              {list.num}
                              <br />동
                            </span>
                          }
                          {...VerticalTab(list.id)}
                          className="!text-[1.875rem] !p-0 !min-w-[3.125rem]"
                        />
                      </Link>
                    );
                  })}
                </div>
              </CustomTabs>
            </div>
          </div>

          <div className="flex flex-col w-full h-full overflow-y-auto">
            <div className="border-b border-white/30 py-[.625rem] mb-[1.25rem]">
              <div className="relative flex flex-col gap-4 justify-center items-center">
                <Button
                  customType="MAIN"
                  className="absolute left-0 top-[.3125rem] h-9 text-center flex items-center gap-2"
                >
                  복수동 선택
                </Button>
                <Select
                  options={OPTION_LIST}
                  selectWrap="!w-[18.75rem]"
                  onChange={(e) => handleOptionSelect(e.target.value)}
                />
              </div>
              <div className="flex mt-[3.125rem]">
                <CheckBox labelTitle="전체선택" className="!gap-4 grow" />
                <CheckBox />
                <CheckBox />
              </div>
            </div>
            <ul className="flex flex-col gap-[.625rem]">
              {option === 1 && (
                <>
                  {TEST_LIST.map((list) => {
                    return (
                      <li key={list.id} className="flex justify-between">
                        <div>
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              <br />
                            </span>
                          )}
                          <div className="flex h-[2.8125rem]">
                            <CheckBox
                              registerName="test"
                              labelTitle={list.name}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex justify-between items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              경보 발송 유형
                            </span>
                          )}
                          <div className="flex gap-5 h-[2.8125rem]">
                            <CheckBox
                              registerName="test1"
                              labelTitle={list.push}
                              className="!gap-2"
                            />
                            <CheckBox
                              registerName="test2"
                              labelTitle={list.message}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              감지 허용 범위
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[4.375rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              defaultValue={0}
                            />
                            <span className="text-white text-4 inline-block">
                              ~
                            </span>
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Max :
                              </span>
                              <Input
                                inputWrap="w-[4.375rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                registerName=""
                                defaultValue={0}
                              />
                              <span className="text-white text-4 inline-block ml-1">
                                (A)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-center min-w-[8.625rem] ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              이상 감지 유시 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              재전송 주기
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit2}
                          />
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {option === 2 && (
                <>
                  {TEST_LIST.map((list) => {
                    return (
                      <li key={list.id} className="flex justify-between">
                        <div>
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              <br />
                            </span>
                          )}
                          <div className="flex h-[2.8125rem]">
                            <CheckBox
                              registerName="test"
                              labelTitle={list.name}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex justify-between items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              경보 발송 유형
                            </span>
                          )}
                          <div className="flex gap-5 h-[2.8125rem]">
                            <CheckBox
                              registerName="test1"
                              labelTitle={list.push}
                              className="!gap-2"
                            />
                            <CheckBox
                              registerName="test2"
                              labelTitle={list.message}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-center min-w-[8.625rem] ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              이상 감지 유시 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              재전송 주기
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit2}
                          />
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {option === 3 && (
                <>
                  {TEST_LIST.map((list) => {
                    return (
                      <li key={list.id} className="flex justify-between">
                        <div>
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              <br />
                            </span>
                          )}
                          <div className="flex h-[2.8125rem]">
                            <CheckBox
                              registerName="test"
                              labelTitle={list.name}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex justify-between items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              경보 발송 유형
                            </span>
                          )}
                          <div className="flex gap-5 h-[2.8125rem]">
                            <CheckBox
                              registerName="test1"
                              labelTitle={list.push}
                              className="!gap-2"
                            />
                            <CheckBox
                              registerName="test2"
                              labelTitle={list.message}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              감지 허용 범위
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[4.375rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              defaultValue={0}
                            />
                            <span className="text-white text-4 inline-block">
                              ~
                            </span>
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Max :
                              </span>
                              <Input
                                inputWrap="w-[4.375rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                registerName=""
                                defaultValue={0}
                              />
                              <span className="text-white text-4 inline-block ml-1">
                                (A)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-center min-w-[8.625rem] ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              이상 감지 유시 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              재전송 주기
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit2}
                          />
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {option === 4 && (
                <>
                  {TEST_LIST.map((list) => {
                    return (
                      <li
                        key={list.id}
                        className="flex justify-between items-center"
                      >
                        <div className="flex flex-col">
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              <br />
                            </span>
                          )}
                          <div className="flex items-center gap-[.625rem]">
                            <div
                              className={`flex ${list.id === 1 && "h-[2.8125rem] items-center"}`}
                            >
                              <span className="font-bold text-white text-[1.125rem] inline-block text-center">
                                {list.name}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <CheckBox
                                registerName="test0"
                                labelTitle={"1번"}
                                className="!gap-2"
                              />
                              <CheckBox
                                registerName="test0"
                                labelTitle={"2번"}
                                className="!gap-2"
                              />
                              <CheckBox
                                registerName="test0"
                                labelTitle={"3번"}
                                className="!gap-2"
                              />
                              <CheckBox
                                registerName="test0"
                                labelTitle={"4번"}
                                className="!gap-2"
                              />
                              <CheckBox
                                registerName="test0"
                                labelTitle={"5번"}
                                className="!gap-2"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex justify-between items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              경보 발송 유형
                            </span>
                          )}
                          <div className="flex gap-5 h-[2.8125rem]">
                            <CheckBox
                              registerName="test1"
                              labelTitle={list.push}
                              className="!gap-2"
                            />
                            <CheckBox
                              registerName="test2"
                              labelTitle={list.message}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              감지 허용 범위
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[4.375rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              defaultValue={0}
                            />
                            <span className="text-white text-4 inline-block">
                              ~
                            </span>
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Max :
                              </span>
                              <Input
                                inputWrap="w-[4.375rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                registerName=""
                                defaultValue={0}
                              />
                              <span className="text-white text-4 inline-block ml-1">
                                (A)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-center min-w-[8.625rem] ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              이상 감지 유시 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              재전송 주기
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit2}
                          />
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
              {option === 5 && (
                <>
                  {TEST_LIST.map((list) => {
                    return (
                      <li key={list.id} className="flex justify-between">
                        <div>
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              <br />
                            </span>
                          )}
                          <div className="flex h-[2.8125rem]">
                            <CheckBox
                              registerName="test"
                              labelTitle={list.name}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex justify-between items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              경보 발송 유형
                            </span>
                          )}
                          <div className="flex gap-5 h-[2.8125rem]">
                            <CheckBox
                              registerName="test1"
                              labelTitle={list.push}
                              className="!gap-2"
                            />
                            <CheckBox
                              registerName="test2"
                              labelTitle={list.message}
                              className="!gap-2"
                            />
                          </div>
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              감지 허용 범위
                            </span>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-white text-4 inline-block">
                              Min :
                            </span>
                            <Input
                              inputWrap="w-[4.375rem] bg-sub2 ml-2"
                              className="text-4 font-bold text-right text-white w-full"
                              registerName=""
                              defaultValue={0}
                            />
                            <span className="text-white text-4 inline-block">
                              ~
                            </span>
                            <div className="flex items-center">
                              <span className="text-white text-4 inline-block">
                                Max :
                              </span>
                              <Input
                                inputWrap="w-[4.375rem] bg-sub2 ml-2"
                                className="text-4 font-bold text-right text-white w-full"
                                registerName=""
                                defaultValue={0}
                              />
                              <span className="text-white text-4 inline-block ml-1">
                                (A)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center justify-center min-w-[8.625rem] ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              이상 감지 유시 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                        <div
                          className={`flex items-center ${list.id === 1 && "flex-col"}`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              재전송 주기
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit2}
                          />
                        </div>
                        <div
                          className={`flex items-center justify-center ${list.id === 1 && "flex-col"} w-[8.625rem]`}
                        >
                          {list.id === 1 && (
                            <span className="mb-5 font-bold text-white text-[1.125rem] inline-block text-center">
                              센서 감지 인정 시간
                            </span>
                          )}
                          <Input
                            inputWrap="w-[5.625rem] bg-sub2"
                            className="text-4 font-bold text-right text-white w-full"
                            unit={list.unit1}
                          />
                        </div>
                      </li>
                    );
                  })}
                </>
              )}
            </ul>
          </div>
        </div>
      </Modal>
    </FormProvider>
  );
};

export default AlertModal;

const BTN_LIST = [{ id: 2, name: "설정저장", img: "save@2x.svg" }];

const OPTION_LIST = [
  { id: 1, name: "계폐기 과부하", value: 1 },
  { id: 2, name: "제어기 작동 이상", value: 2 },
  { id: 3, name: "시스템 이상", value: 3 },
  { id: 4, name: "내부센서 이상", value: 4 },
  { id: 5, name: "외부센서 이상", value: 5 },
];

const TEST_LIST = [
  {
    id: 1,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 2,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 3,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 4,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 5,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
  {
    id: 6,
    name: "1동 좌 측창1",
    push: "Push",
    message: "문자",
    unit1: "(초)",
    unit2: "(분)",
  },
];

const LIST = [
  { id: 1, num: "1" },
  { id: 2, num: "2" },
  { id: 3, num: "3" },
  { id: 4, num: "4" },
  { id: 5, num: "5" },
  { id: 6, num: "6" },
  { id: 7, num: "7" },
  { id: 8, num: "8" },
  { id: 9, num: "9" },
];

const CustomTabs = styled(Tabs)({
  "& .MuiTabs-scrollButtons.Mui-disabled": {
    opacity: "100",
  },
  "& .MuiTabs-scrollButtons": {
    background: `url('../src/assets/icon/section-arw-up-white@3x.svg')`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "60%",
    width: "3.125rem",
    height: "2.5rem",
    "&:last-child": {
      transform: "rotate(180deg)",
    },
  },
  "& .MuiSvgIcon-fontSizeSmall": {
    display: "none",
  },
  "& .MuiTabs-indicator": {
    display: "none",
  },
});
