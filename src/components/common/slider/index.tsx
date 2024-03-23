import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { ModalContext } from "../modal/context/modalContext";
import useControl from "@/hooks/service/control/useControl";
import { initialData } from "@/components/pages/control";

export const RowReverseBar = ({
  setModalType,
  currentValue,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  currentValue: number;
}) => {
  const [value, setValue] = useState<number>(0);
  const { onOpenModal } = useContext(ModalContext);

  const handleChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    setValue(newValue as number);
  };

  const handleSliderContorl = (type: string) => {
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
        className={`z-10 w-auto max-w-[37.5rem] bg-[#fff] rounded-md lg:px-[.5rem] lg:py-[.625rem] flex items-center justify-between shadow-lg`}
      >
        <span className="mr-1 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
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
            track="inverted"
            valueLabelDisplay="auto"
            aria-label="row slider"
            valueLabelFormat={valueLabelFormat}
            defaultValue={-currentValue}
            marks={marks}
            // value={value}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderContorl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>닫힘</span>
          <span>0%</span>
        </div>
        <span className="ml-1 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
      </div>
    </>
  );
};

export const RowBar = ({
  setModalType,
  currentValue,
  location,
  setData,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  currentValue: number;
  location: number;
  setData: React.Dispatch<React.SetStateAction<initialData[]>>;
}) => {
  const { onOpenModal } = useContext(ModalContext);
  const [value, setValue] = useState<number>(currentValue);

  const { controlData } = useControl();

  const handleChange = (
    e: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    // 슬라이더 변경 값 저장
    setValue(newValue as number);

    // 슬라이더 변경 값 데이터화 저장
    setData((prevData) => {
      const newData = controlData.map((item) => {
        if (item.location === location) {
          return { ...item, value: newValue };
        }
        return item;
      });

      return newData;
    });
  };

  const handleSliderContorl = (type: string) => {
    setModalType(type);
    onOpenModal();
  };

  return (
    <>
      <div
        className={`z-10 w-auto max-w-[37.5rem] bg-[#fff] rounded-md lg:px-[.5rem] lg:py-[.625rem] flex items-center justify-between shadow-lg`}
      >
        <span className="mr-1 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
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
            valueLabelDisplay="auto"
            aria-label="row slider"
            marks={marks}
            value={value}
            max={100}
            min={0}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderContorl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col w-[2.25rem]">
          <span>열림</span>
          <span>100%</span>
        </div>
        <span className="ml-1 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
      </div>
    </>
  );
};

export const ColBar = ({
  setModalType,
  className,
  currentValue,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  currentValue: number;
}) => {
  const [value, setValue] = useState<number>(0);
  const { onOpenModal } = useContext(ModalContext);

  const handleChange = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],
  ) => {
    setValue(newValue as number);
  };

  const handleSliderContorl = (type: string) => {
    setModalType(type);
    onOpenModal();
  };

  const colSliderWrap = `${className ?? ""}`;

  return (
    <div className={colSliderWrap}>
      <div className="w-[3.75rem] h-[auto] bg-[#fff] rounded-md lg:px-[.625rem] lg:py-[.5rem] flex flex-col items-center justify-between shadow-lg">
        <span className="cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_up@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
        <div className="flex items-center flex-col">
          <span>닫힘</span>
          <span>0%</span>
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
            orientation="vertical"
            valueLabelDisplay="auto"
            aria-label="col slider"
            defaultValue={currentValue}
            marks={marks}
            // value={value}
            onChangeCommitted={handleChange}
            onClick={() => handleSliderContorl("slider")}
          />
        </Box>
        <div className="flex items-center flex-col">
          <span>열림</span>
          <span>100%</span>
        </div>
        <span className="cursor-pointer w-4 h-4 inline-block bg-[url('src/assets/icon/section_arw_down@2x.svg')] bg-no-repeat bg-center bg-contain"></span>
      </div>
    </div>
  );
};

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
