import Button from "@/components/common/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="z-10 w-full h-[3.75rem] fixed top-0 left-0 flex items-center justify-between px-5 bg-main border-b border-sub">
      <Link to="/">
        <Button customType="MAIN" className="w-[3.75rem] h-[2.5rem]">
          홈
        </Button>
      </Link>
      <Button
        customType="MAIN"
        className="w-100 min-w-[12.625rem] h-[2.5rem] relative text-center pl-[3.125rem] pr-[1.875rem]"
      >
        <span className="w-6 h-6 bg-[url('../src/assets/icon/home@2x.svg')] bg-no-repeat bg-center bg-contain inline-block absolute top-[50%] translate-y-[-50%] left-2"></span>
        테스트 농장
      </Button>
      <Button
        customType="MAIN"
        className="w-100 min-w-[11.0625rem] h-[2.5rem] relative text-center pl-[3.125rem] pr-[1.875rem]"
      >
        <span className="w-6 h-6 inline-block bg-[url('../src/assets/icon/user@2x.svg')] bg-no-repeat bg-center bg-contain absolute top-[50%] translate-y-[-50%] left-2"></span>
        슈퍼어드민님
      </Button>
    </div>
  );
};

export default Header;
