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

  export type OpclSensorControlDto = {
    id: number;
    priority: number;
    enable: number;
    sensorNo: number;
    useUpperLimit: number;
    upperLimit: number;
    upperLimitLocation: number;
    useIncludeimit: number;
    includeLimitLocation: number;
    useLowerLimit: number;
    lowerLimit: number;
    lowerLimitLocation: number;
    useRatioControl: number;
    ratioControl: number;
    useInnerSensor: number;
    useTimerControl: number;
    timerControl: number;
    timerOperationTime: number;
    opclTimeControlId: number;
  };

  export type OpclLocationControlDto = {
    id: number;
    enable: number;
    targetLocation: number;
    useTimer: number;
    cycle: number;
    operationTime: number;
    onLocation: number;
    offLocation: number;
    opclTimeControlId: number;
  };

  export type ControlModalData = {
    id: number;
    no: number;
    enable: number;
    mode: number;
    fromTime: string;
    toTime: string;
    opclLocationControlDto: OpclLocationControlDto;
    opclSensorControlDtoList: OpclSensorControlDto[];
    opclId: number;
  };

  export type OpclData = ControlModalData[];

  export type ManualItem = {
    id: number;
    no: number;
    enable: number;
    shape: number;
    shapeName: string | null;
    value: number;
    controlMode: number;
    cycle: number;
    operation: number;
    currentTimeControlNo: number;
    currentControl: number;
    houseNo: string;
    farmCode: string;
  };

  export type RelayItem = {
    id: number;
    no: number;
    enable: number;
    mode: number;
    fromTime: string;
    toTime: string;
    relaySensorControlDto: RelaySensorControlDto;
    relayCycleControlDto: RelayCycleControlDto;
    relayId: number;
  }[];

  export type RelaySensorControlDto = {
    id: number;
    onValue: number;
    offValue: number;
    cycle: number;
    twinTimer: number;
    relayTimeControlId: number;
  };

  export type RelayCycleControlDto = {
    id: number;
    enable: number;
    cycle: number;
    period: number;
    relayTimeControlId: number;
  };
}
