import { useContext } from "react";
import { createPortal } from "react-dom";
import Button from "@/components/common/button";
import { ModalContext } from "@/components/common/modal/context/modalContext";

type buttonListArray = {
  id: number;
  name: string;
  img: string;
}[];

type Props = {
  className?: string;
  title: string;
  children: React.ReactNode;
  buttonList?: buttonListArray;
  type?: boolean;
  titleBlack?: boolean;
  custom?: boolean;
  pbNone?: boolean;
  onClickCallBack?: () => void;
  titleWrap?: boolean;
};

const Modal = ({
  className,
  title,
  children,
  buttonList,
  type,
  custom,
  pbNone,
  onClickCallBack,
  titleWrap,
}: Props) => {
  const { onCloseModal } = useContext(ModalContext);

  return (
    <>
      {createPortal(
        <>
          {!type && (
            <div
              className={`fixed top-0 left-0 right-0 bottom-0 bg-black z-20 bg-opacity-60 `}
            ></div>
          )}
          <div
            className={`fixed ${titleWrap && "overflow-auto"} ${type ? (custom ? "top-[50%] left-[50%]" : "bottom-[15%] left-[58%]") : "top-[50%] left-[50%]"} -translate-x-[50%] -translate-y-[50%] bg-main max-w-[90%] max-h-[90%] z-20 h-auto rounded-lg px-[1.875rem] py-[1.25rem] ${
              className ? className : ""
            }`}
          >
            <div
              className={`flex justify-between items-center border-b border-white/30 pb-6 ${pbNone && "!pb-0"} ${titleWrap && "mx-[1.25rem] pt-[1.25rem] sticky top-0 left-0 bg-main z-10 rounded-t-lg"}`}
            >
              <span
                className={`text-[22px] font-bold ${type ? "text-black text-center w-full" : "text-white"}`}
              >
                {title}
              </span>
              <div className={`flex gap-2`}>
                {buttonList && (
                  <>
                    {buttonList.map((list) => {
                      return (
                        <Button
                          key={list.id}
                          customType="MAIN"
                          className="relative h-9 text-center flex items-center gap-2"
                          onClick={onClickCallBack}
                        >
                          <img
                            src={`http://175.123.253.182/icon/${list.img}`}
                            alt="icon"
                            className="w-6 h-6"
                          />
                          {list.name}
                        </Button>
                      );
                    })}
                  </>
                )}
                {!type && (
                  <Button
                    customType="MAIN"
                    onClick={onCloseModal}
                    className="h-9 min-w-[4.375rem] flex justify-center items-center"
                  >
                    닫기
                  </Button>
                )}
              </div>
            </div>
            {children}
          </div>
        </>,
        document.body,
      )}
    </>
  );
};

export default Modal;
