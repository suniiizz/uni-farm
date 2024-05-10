import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import useRegister from "@/hooks/service/user/useRegister";
import { RegisterUserForm } from "user";

import { Input } from "@/components/common/input";
import CheckBox from "@/components/common/checkbox";
import Button from "@/components/common/button";
import Select from "@/components/common/select";
import { useState } from "react";

const JoinInPage = () => {
  const methods = useForm<RegisterUserForm>({
    defaultValues: {
      address: "",
      detailAddress: "",
      email: "",
      code: "",
      name: "",
      password: "",
      passwordConfirm: "",
      registrationPath: "",
      phone: "",
      terms: false,
    },
  });

  const [option, setOption] = useState<string>("");

  const { fetchUserData } = useRegister();

  const handleSubmit: SubmitHandler<RegisterUserForm> = (
    data: RegisterUserForm,
  ) => {
    const dataFields = {
      email: data.email,
      code: data.code,
      name: data.name,
      password: data.password,
      phone: data.phone,
      address: data.address + " " + data.detailAddress,
      registrationPath:
        data.registrationPath + (" " + data.registrationPath_etc ?? ""),

      // terms: data.terms ? 1 : 0,
    };

    console.log("dataFields", dataFields);

    if (data.password !== data.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
    }
    if (data.terms === 0) {
      alert("개인정보처리방침에 동의해주십시오.");
    }
    fetchUserData(dataFields);

    return { ...data };
  };

  // 가입경로 선택
  const handleOptionSelect = (value: string) => {
    setOption(value);
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="h-[100vh] w-full">
          <div className="bg-[url(../src/assets/icon/login_bg@1x.jpg)] bg-cover w-[100vw] h-[100vh] flex justify-center items-center">
            <form onSubmit={methods.handleSubmit(handleSubmit)}>
              <div className="bg-main w-[37.5rem] h-auto rounded-lg p-[1.875rem]">
                <div className="flex justify-center mb-[2.25rem] relative w-full">
                  <Button
                    customType="SUB"
                    className="absolute left-0 top-[50%] translate-y-[-50%] bg-[url(../src/assets/icon/link_arw@2x.svg)] bg-auto bg-no-repeat bg-right rotate-180"
                    onClick={(e) => e.preventDefault()}
                  ></Button>
                  <span className="text-[1.5rem] font-bold text-white text-center">
                    회원가입
                  </span>
                </div>
                <div className="mb-6 flex flex-col gap-[.625rem]">
                  <div>
                    <Input
                      registerName="code"
                      className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                      inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                      placeholder="생성 아이디를 입력해 주세요"
                      label="계정ID"
                    />
                  </div>
                  <div className="flex gap-[.625rem] w-full">
                    <div className="w-1/2">
                      <Input
                        type="password"
                        registerName="password"
                        className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                        inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                        placeholder="비밀번호 4~12자 입력해 주세요."
                        label="비밀번호"
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        type="password"
                        registerName="passwordConfirm"
                        className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                        inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                        placeholder="비밀번호 4~12자 입력해 주세요."
                        label="비밀번호 확인"
                      />
                    </div>
                  </div>
                  {/* <div>
                    <Input
                      registerName="farmName"
                      className="text-left w-full placeholder:text-white text-white placeholder:opacity-40"
                      inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                      placeholder="농가명을 입력해 주세요."
                      label="농가명"
                    />
                  </div> */}
                  <div className="flex gap-[.625rem] w-full">
                    <div className="w-1/2">
                      <Input
                        registerName="name"
                        className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                        inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                        placeholder="성명을 입력해 주세요."
                        label="성명"
                      />
                    </div>
                    <div className="w-1/2">
                      <Input
                        registerName="phone"
                        className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                        inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                        placeholder="연락처 입력 (-제외 숫자만)"
                        label="연락처"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      registerName="email"
                      className="text-left w-full placeholder:text-white text-white placeholder:opacity-40"
                      inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                      placeholder="이메일 주소를 입력해 주세요"
                      label="이메일 주소"
                    />
                  </div>
                  <div className="flex flex-col gap-[.625rem] w-full">
                    <div className="w-full flex items-end">
                      <div className="w-full">
                        <Input
                          registerName="address"
                          className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                          inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                          placeholder="주소를 입력해 주세요"
                          label="농장주소"
                        />
                      </div>
                      <Button
                        customType="MAIN"
                        className="h-[3.75rem] w-[4.375rem] !text-[1rem] font-bold text-nowrap ml-[.625rem]"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        검색
                      </Button>
                    </div>
                    <div className="w-full">
                      <Input
                        registerName="detailAddress"
                        className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                        inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                        placeholder="상세 주소를 입력해 주세요"
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <span className="text-white font-bold !text-[1.125rem]">
                        가입경로
                      </span>
                      <Select
                        registerName="registrationPath"
                        options={REGISTER_PATH_OPTION}
                        selectWrap="w-full h-[3.75rem] !px-[1.25rem] bg-[right_20px_center]"
                        onChange={(e) => handleOptionSelect(e.target.value)}
                      />
                      {option === "기타" && (
                        <Input
                          registerName="registrationPath_etc"
                          className="text-left !text-[1rem] w-full placeholder:text-white text-white placeholder:opacity-40"
                          inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub2 h-[3.75rem]"
                          placeholder="기타"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="mb-6 flex justify-between items-center">
                  <Button
                    customType="SUB"
                    className="pr-[1.5rem] bg-[url(../src/assets/icon/link_arw@2x.svg)] bg-auto bg-no-repeat bg-right"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    개인정보처리방침 전문확인
                  </Button>
                  <CheckBox
                    registerName="terms"
                    labelTitle="개인정보보호 동의"
                    className="!gap-2"
                  />
                </div>
                <Button
                  customType="MAIN"
                  className="w-full bg-yellow border-none h-[3.75rem] text-bold !text-[1.125rem]"
                >
                  회원가입
                </Button>
              </div>
            </form>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default JoinInPage;

const REGISTER_PATH_OPTION = [
  { id: 0, name: "선택", value: "" },
  { id: 1, name: "인터넷 검색", value: "인터넷 검색" },
  { id: 2, name: "지인 소개", value: "지인 소개" },
  { id: 3, name: "대리점 소개", value: "대리점 소개" },
  { id: 4, name: "카달로그", value: "카달로그" },
  { id: 5, name: "광고", value: "광고" },
  { id: 6, name: "기타", value: "기타" },
];
