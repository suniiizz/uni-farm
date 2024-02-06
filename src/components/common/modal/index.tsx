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
};

const Modal = ({ className, title, children, buttonList }: Props) => {
  const { onCloseModal } = useContext(ModalContext);

  return (
    <>
      {createPortal(
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-10 bg-opacity-60">
          <div
            className={`fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-main max-w-[90%] max-h-[90%] z-20 min-h-[500px] rounded-lg px-[1.875rem] py-[1.25rem] ${
              className ? className : ""
            }`}
          >
            <div className="flex justify-between items-center border-b border-white/30 pb-6">
              <span className="text-[22px] font-bold text-white">{title}</span>
              <div className="flex gap-2">
                {buttonList && (
                  <>
                    {buttonList.map((list) => {
                      return (
                        <Button
                          key={list.id}
                          customType="MAIN"
                          className="relative h-9 text-center flex items-center gap-2"
                        >
                          <span
                            className={`bg-[url('./assets/icon/${list.img}')] bg-no-repeat bg-center bg-contain w-6 h-6 inline-block`}
                          ></span>
                          {list.name}
                        </Button>
                      );
                    })}
                  </>
                )}
                <Button
                  customType="MAIN"
                  onClick={onCloseModal}
                  className="h-9 min-w-[4.375rem]"
                >
                  닫기
                </Button>
              </div>
            </div>
            {/* <div className="px-[1.875rem] pt-[1.875rem] pb-10 break-words overflow-y-auto h-[calc(100%-4.0625rem)]"> */}
            {children}
            {/* </div> */}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
};

export default Modal;
