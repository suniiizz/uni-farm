import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { ModalContext } from "@/components/common/modal/context/modalContext";

export const RowReverseBar = ({
  setModalType,
  currentValue,
  location,
  sliderValue,
  zIndex,
  disabled,
  handleSliderChecked,
  sliderChecked,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  currentValue: number;
  location: number;
  sliderValue: (location: number, value: number) => void;
  zIndex?: boolean;
  disabled?: boolean;
  handleSliderChecked: (divId: number) => void;
  sliderChecked: number[];
}) => {
  const { onOpenModal } = useContext(ModalContext);

  const reverseCurrentValue =
    ((marks.length - 1 - currentValue) / (marks.length - 1)) * 10 + 90;
  const [value, setValue] = useState<number>(reverseCurrentValue);
  value;

  const handleChange = (
    e: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    e;
    const reversedValue =
      ((marks.length - 1 - (newValue as number)) / (marks.length - 1)) * 10 +
      90;

    // 슬라이더 변경 값 저장
    setValue(newValue as number);

    // 슬라이더 변경된 location 저장
    sliderValue(location, reversedValue);
  };

  const handleSliderControl = (type: string) => {
    if (disabled) return;

    setModalType(type);
    onOpenModal();
  };

  const valueLabelFormat = (value: number) => {
    const reversedValue =
      ((marks.length - 1 - value) / (marks.length - 1)) * 10 + 90;

    return reversedValue;
  };

  return (
    <>
      <div
        className={`${sliderChecked.includes(location) ? "bg-yellow" : ""} ${zIndex ? "z-20" : "z-10"} w-auto max-w-[37.5rem] bg-[#fff] rounded-md lg:px-[.5rem] lg:py-[.625rem] flex items-center justify-between shadow-lg`}
        onClick={() => handleSliderChecked(location)}
      >
        <span className="mr-1 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>열림</span>
          <span>100%</span>
        </div>
        <Box
          sx={{
            marginLeft: "5px",
            marginRight: "5px",
            maxWidth: "28.75rem",
            minWidth: "17.875rem",
            width: "auto",
            height: "2.375rem",
            borderLeft: "7px solid #707070",
            borderRight: "7px solid #707070",
            borderRadius: "5px",
          }}
        >
          <RowReverseSlider
            disabled={disabled}
            track="inverted"
            valueLabelDisplay="auto"
            aria-label="row slider"
            valueLabelFormat={valueLabelFormat}
            value={value}
            marks={marks}
            max={100}
            min={0}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderControl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>닫힘</span>
          <span>0%</span>
        </div>
        <span className="ml-1 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
      </div>
    </>
  );
};

export const RowBar = ({
  setModalType,
  currentValue,
  location,
  sliderValue,
  zIndex,
  disabled,
  handleSliderChecked,
  sliderChecked,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  currentValue: number;
  location: number;
  sliderValue: (location: number, value: number) => void;
  zIndex?: boolean;
  disabled?: boolean;
  handleSliderChecked: (divId: number) => void;
  sliderChecked: number[];
}) => {
  const [value, setValue] = useState<number>(currentValue);
  const { onOpenModal } = useContext(ModalContext);

  const handleChange = (
    e: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    e;
    // 슬라이더 변경 값 저장
    setValue(newValue as number);

    // 슬라이더 변경된 location 저장
    sliderValue(location, newValue as number);
  };

  const handleSliderControl = (type: string) => {
    if (disabled) return;

    setModalType(type);
    onOpenModal();
  };

  const handelCloseBtn = (type: string) => {
    if (disabled) return;

    if (type === "close") {
      if (value > 0) {
        setValue((prev) => prev - 1);
      }
    } else if (type === "open") {
      if (value < 100) {
        setValue((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      <div
        className={`${sliderChecked.includes(location) ? "bg-yellow" : ""} ${zIndex ? "z-20" : "z-10"} w-auto max-w-[37.5rem] bg-[#fff] rounded-md lg:px-[.5rem] lg:py-[.625rem] flex items-center justify-between shadow-lg`}
        onClick={() => handleSliderChecked(location)}
      >
        <span
          onClick={() => {
            handelCloseBtn("close"), handleSliderControl("slider");
          }}
          className="mr-1 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"
        ></span>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>닫힘</span>
          <span>0%</span>
        </div>
        <Box
          sx={{
            marginLeft: "5px",
            marginRight: "5px",
            maxWidth: "28.75rem",
            minWidth: "17.875rem",
            width: "auto",
            height: "2.375rem",
            borderLeft: "7px solid #707070",
            borderRight: "7px solid #707070",
            borderRadius: "5px",
          }}
        >
          <RowSlider
            disabled={disabled}
            valueLabelDisplay="auto"
            aria-label="row slider"
            marks={marks}
            value={value}
            max={100}
            min={0}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderControl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>열림</span>
          <span>100%</span>
        </div>
        <span
          onClick={() => {
            handelCloseBtn("open"), handleSliderControl("slider");
          }}
          className="ml-1 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"
        ></span>
      </div>
    </>
  );
};

export const ColBar = ({
  setModalType,
  className,
  currentValue,
  location,
  sliderValue,
  disabled,
  handleSliderChecked,
  sliderChecked,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  currentValue: number;
  location: number;
  sliderValue: (location: number, value: number) => void;
  disabled?: boolean;
  handleSliderChecked: (divId: number) => void;
  sliderChecked: number[];
}) => {
  const { onOpenModal } = useContext(ModalContext);
  const [value, setValue] = useState<number>(currentValue);

  const handleChange = (
    e: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    e;
    // 슬라이더 변경 값 저장
    setValue(newValue as number);

    // 슬라이더 변경된 location 저장
    sliderValue(location, newValue as number);
  };

  const handleSliderControl = (type: string) => {
    setModalType(type);
    onOpenModal();
  };

  const colSliderWrap = `${className ?? ""}`;

  return (
    <div className={colSliderWrap}>
      <div
        onClick={() => handleSliderChecked(location)}
        className={`${sliderChecked.includes(location) ? "bg-yellow" : ""} w-[3.75rem] h-[auto] bg-[#fff] rounded-md lg:px-[.625rem] lg:py-[.5rem] flex flex-col items-center justify-between shadow-lg`}
      >
        <span className="cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
        <div className="flex items-center flex-col">
          <span>열림</span>
          <span>100%</span>
        </div>
        <Box
          sx={{
            marginTop: "4px",
            marginBottom: "4px",
            width: "2.375rem",
            height: "5.9375rem",
            borderTop: "7px solid #707070",
            borderBottom: "7px solid #707070",
            borderRadius: "5px",
          }}
        >
          <ColSlider
            disabled={disabled}
            orientation="vertical"
            valueLabelDisplay="auto"
            aria-label="col slider"
            marks={marks}
            value={value}
            max={100}
            min={0}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderControl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col">
          <span>닫힘</span>
          <span>0%</span>
        </div>
        <span className="cursor-pointer w-4 h-4 inline-block bg-[url('../src/assets/icon/section_arw_down@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
      </div>
    </div>
  );
};

const RowReverseSlider = styled(Slider)({
  color: "#BDD39F",
  height: "2.375rem",
  padding: "0",
  borderRadius: "0",
  "& .MuiSlider-rail": {
    borderRadius: "0",
  },
  "& .MuiSlider-track": {
    borderRadius: "0",
    backgroundColor: "rgb(230, 238, 218)",
    border: "currentColor",
  },
  "& .MuiSlider-thumb": {
    width: "8px",
    height: "100%",
    background: "#fff",
    border: "1px solid #707070",
    borderRadius: "5px",
    position: "relative",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
    },
    "&:before": {
      boxShadow: "none",
      right: "0",
    },
    "&:after": {
      position: "absolute",
      width: "1px",
      height: "90%",
      background: "#FF0000",
      borderRadius: "0",
    },
  },
  "& .MuiSlider-mark": {
    width: "1px",
    height: "100%",
    background: "#fff",
  },
});

const RowSlider = styled(Slider)({
  color: "#BDD39F",
  height: "2.375rem",
  padding: "0",
  borderRadius: "0",
  "& .MuiSlider-rail": {
    borderRadius: "0",
  },
  "& .MuiSlider-track": {
    borderRadius: "0",
  },
  "& .MuiSlider-thumb": {
    width: "8px",
    height: "100%",
    background: "#fff",
    border: "1px solid #707070",
    borderRadius: "5px",
    position: "relative",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
    },
    "&:before": {
      boxShadow: "none",
      right: "0",
    },
    "&:after": {
      position: "absolute",
      width: "1px",
      height: "90%",
      background: "#FF0000",
      borderRadius: "0",
    },
  },
  "& .MuiSlider-mark": {
    width: "1px",
    height: "100%",
    background: "#fff",
  },
});

const ColSlider = styled(Slider)({
  color: "#BDD39F",
  width: "2.375rem",
  padding: "0",
  borderRadius: "0",
  "& .MuiSlider-rail": {
    borderRadius: "0",
  },
  "& .MuiSlider-track": {
    borderRadius: "0",
  },
  "& .MuiSlider-thumb": {
    width: "100%",
    height: "8px",
    background: "#fff",
    border: "1px solid #707070",
    borderRadius: "5px",
    "&:focus, &:hover, &.Mui-active": {
      boxShadow: "0px 0px 3px 1px rgba(0, 0, 0, 0.1)",
    },
    "&:before": {
      boxShadow: "none",
    },
    "&:after": {
      position: "absolute",
      width: "90%",
      height: "1px",
      background: "#FF0000",
      borderRadius: "0",
    },
  },
  "& .MuiSlider-mark": {
    width: "100%",
    height: "1px",
    background: "#fff",
  },
});

const marks = [
  {
    value: 0,
  },
  {
    value: 10,
  },
  {
    value: 20,
  },
  {
    value: 30,
  },
  {
    value: 40,
  },
  {
    value: 50,
  },
  {
    value: 60,
  },
  {
    value: 70,
  },
  {
    value: 80,
  },
  {
    value: 90,
  },
  {
    value: 100,
  },
];
