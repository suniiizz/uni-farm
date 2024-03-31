declare module "control" {
  export type SensorDtoList = {
    id: number;
    no: number;
    enable: number;
    value: number;
    unit: string;
    correctionValue: number;
    kqi: number;
    gaugedTime: string | null;
    sensorDeviceId: number;
  };

  export type SensorData = {
    id: number;
    no: number;
    enable: number;
    kqi: number;
    gaugedTime: string | null;
    memo: string;
    sensorDtoList: sensorDtoList[];
    houseNo: string;
    farmCode: string;
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
