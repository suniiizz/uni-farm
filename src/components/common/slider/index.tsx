import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

export const RowBar = () => {
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

  return (
    <div className="z-10 w-auto max-w-[37.5rem] bg-[#fff] rounded-md px-[.9375rem] py-[.625rem] flex items-center justify-between shadow-lg">
      <span className="mr-2 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
      <div className="flex items-center flex-col">
        <span>닫힘</span>
        <span>0%</span>
      </div>
      <Box
        sx={{
          marginLeft: "10px",
          marginRight: "10px",
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
        />
      </Box>
      <div className="flex items-center flex-col">
        <span>열림</span>
        <span>100%</span>
      </div>
      <span className="ml-2 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
    </div>
  );
};

export const ColBar = () => {
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

  return (
    <div className="w-[3.75rem] h-[18.75rem] bg-[#fff] rounded-md px-[.9375rem] py-[.625rem] flex flex-col items-center justify-between shadow-lg">
      <span className="cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
      <div className="flex items-center flex-col">
        <span>닫힘</span>
        <span>0%</span>
      </div>
      <Box
        sx={{
          marginTop: "10px",
          marginBottom: "10px",
          width: "2.375rem",
          height: "10.3125rem",
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
        />
      </Box>
      <div className="flex items-center flex-col">
        <span>열림</span>
        <span>100%</span>
      </div>
      <span className="cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_down@2x.png')] bg-no-repeat bg-center bg-contain"></span>
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
