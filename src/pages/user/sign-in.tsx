import { FormProvider, useForm } from "react-hook-form";

import Logo from "@/assets/icon/logo@2x.svg";
import { Input } from "@/components/common/input";
import CheckBox from "@/components/common/checkbox";
import Button from "@/components/common/button";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const methods = useForm();

  return (
    <>
      <FormProvider {...methods}>
        <div className="h-[100vh] w-full">
          <div className="bg-[url(../src/assets/icon/login_bg@1x.jpg)] bg-cover w-[100vw] h-[100vh] flex justify-center items-center">
            <div className="bg-main w-[37.5rem] h-auto rounded-lg px-[1.875rem] py-[3.75rem]">
              <div className="flex justify-center mb-[2.25rem]">
                <img src={Logo} alt="logo" className="w-[15.625rem]" />
              </div>
              <div className="mb-6">
                <Input
                  registerName=""
                  className="text-left w-full placeholder:text-black placeholder:opacity-40"
                  inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub4 h-[3.75rem] mb-[1.875rem]"
                  placeholder="아이디를 입력해 주세요."
                  label="계정ID"
                />
                <Input
                  registerName=""
                  className="text-left !text-[1rem] w-full placeholder:text-black placeholder:opacity-40"
                  inputWrap="w-full !px-[1.25rem] !py-[.9375rem] bg-sub4 h-[3.75rem]"
                  placeholder="비밀번호 4~12자 입력해주세요."
                  label="비밀번호"
                />
              </div>
              <div className="mb-6 flex justify-between items-center">
                <CheckBox
                  registerName="test"
                  labelTitle="아이디 저장"
                  className="!gap-2"
                />
                <Button
                  customType="SUB"
                  className="pr-[1.5rem] bg-[url(../src/assets/icon/link_arw@2x.svg)] bg-auto bg-no-repeat bg-right"
                >
                  ID · 비밀번호 찿기
                </Button>
              </div>
              <div className="flex flex-col gap-5 mb-6">
                <Button
                  customType="MAIN"
                  className="bg-yellow border-none h-[3.75rem] text-bold !text-[1.125rem]"
                >
                  로그인
                </Button>
                <Link to="/auth/register">
                  <Button
                    customType="MAIN"
                    className="bg-[#616361] border-none h-[60px] text-bold !text-[1.125rem] w-full"
                  >
                    회원가입
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};

export default LoginPage;
