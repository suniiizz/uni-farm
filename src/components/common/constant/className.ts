const buttonStyle = "rounded-lg border font-bold px-2 text-sm text-center";

type ButtonStyleType = {
  [key: string]: string;
};

export const buttonClassName: ButtonStyleType = {
  MAIN: `text-white bg-mainButton/30 border-[#fff] ${buttonStyle}`,
  GREEN: `text-white bg-green ${buttonStyle}`,
  RED: `text-white bg-red ${buttonStyle}`,
  SUB: `text-white bg-main ${buttonStyle}`,
  DISABLED: `${buttonStyle}`,
  INPUT: `bg-sub3 border-black ${buttonStyle}`,
  DEFAULT: `cursor-pointer text-black border-black text-[1.5rem] px-4 py-2 ${buttonStyle}`,
  MODAL: `text-white bg-sub2 ${buttonStyle}`,
};
