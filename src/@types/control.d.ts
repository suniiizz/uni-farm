declare module "control" {
  export type SensorDtoList = {
    id: number;
    value: number;
  };

  export type SensorData = {
    id: number;
    sensorDtoList: sensorDtoList[];
  };

  export type ControlData = {
    id: number;
    no: number;
    enable: number;
    shape: number;
    shapeName: string;
    location: number;
    outputNo: number;
    value: number;
    controlMode: number;
    houseNo: string;
    farmCode: string;
  };

  export type ManualData = {
    no: number;
  };
}
