import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { ModalContext } from "../modal/context/modalContext";

export const RowBar = ({
  setModalType,
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
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
            defaultValue={0}
            marks={marks}
            value={value}
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
}: {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
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

  return (
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
          defaultValue={0}
          marks={marks}
          value={value}
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
