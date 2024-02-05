import { Col, Row, Slider } from "rsuite";

export const RowBar = () => {
  return (
    <div className="z-10 w-auto max-w-[37.5rem] bg-[#fff] rounded-md px-[.9375rem] py-[.625rem] flex items-center justify-between shadow-lg">
      <span className="mr-2 rotate-[-90deg] cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
      <div className="flex items-center flex-col">
        <span>닫힘</span>
        <span>0%</span>
      </div>
      <div
        style={{
          paddingLeft: 10,
          paddingRight: 10,
          maxWidth: 460,
          minWidth: 300,
        }}
      >
        <Slider defaultValue={0} min={10} max={100} progress />
      </div>
      <div className="flex items-center flex-col">
        <span>열림</span>
        <span>100%</span>
      </div>
      <span className="ml-2 rotate-[90deg] cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
    </div>
  );
};

export const ColBar = () => {
  return (
    <div className="w-[3.75rem] h-[18.75rem] bg-[#fff] rounded-md px-[.9375rem] py-[.625rem] flex flex-col items-center justify-between shadow-lg">
      <span className="cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_up@2x.png')] bg-no-repeat bg-center bg-contain"></span>
      <div className="flex items-center flex-col">
        <span>닫힘</span>
        <span>0%</span>
      </div>
      <Row>
        <Col md={2}>
          <div style={{ height: 165, paddingTop: 5, paddingBottom: 5 }}>
            <Slider defaultValue={0} min={0} max={100} vertical progress />
          </div>
        </Col>
      </Row>
      <div className="flex items-center flex-col">
        <span>열림</span>
        <span>100%</span>
      </div>
      <span className="cursor-pointer w-4 h-4 inline-block bg-[url('./assets/icon/section_arw_down@2x.png')] bg-no-repeat bg-center bg-contain"></span>
    </div>
  );
};
