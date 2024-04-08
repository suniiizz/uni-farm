import useSensor from "@/hooks/service/control/useSensor";
import { SensorData, SensorDtoList } from "control";

const SensorContent = () => {
  const { sensorData } = useSensor();

  const sensorDataFunc = (id: number) => {
    const sensorDataList: SensorData | undefined = sensorData.find(
      (item: SensorData) => item.id === 115,
    );

    return sensorDataList?.sensorDtoList.find(
      (item: SensorDtoList) => item.id === id,
    ).value;
  };

  return (
    <>
      <div className="w-full h-auto border border-white rounded-md flex items-center p-[1.25rem] gap-5">
        <span className="text-[1.25rem] font-bold text-white">외부환경</span>

        <div className="grid-cols-4 grid justify-between w-full gap-2">
          {INFO_LIST.map((list) => {
            const value = (name: string) => {
              switch (name) {
                case "기온":
                  return <>{sensorDataFunc(116)}</>;
                case "습기":
                  return <>{sensorDataFunc(117)}</>;
                case "강우":
                  return <>{sensorDataFunc(118)}</>;
                case "일사":
                  return <>{sensorDataFunc(119)}</>;
                case "풍향":
                  return <>{sensorDataFunc(120)}</>;
                case "풍속":
                  return <>{sensorDataFunc(121)}</>;
                case "CO₂":
                  return <>{sensorDataFunc(122)}</>;
                default:
                  return;
              }
            };
            return (
              <div
                key={list.id}
                className="bg-sub2 rounded-md p-[.625rem] h-[3.75rem] flex justify-start items-center shadow-lg"
              >
                <img
                  src={`http://175.123.253.182/icon/${list.img}`}
                  alt="icon"
                  className="w-[2.5rem] h-[2.5rem]"
                />
                <div className="flex flex-col w-full text-center">
                  <span className="text-white font-bold text-[1.125rem]">
                    {list.name}
                  </span>
                  <span className="text-white font-bold">
                    {value(list.name)}
                    {list.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-2">
        <table className="border-separate border-spacing-3 table-fixed w-full text-[.8125rem]">
          <thead className="bg-sub2">
            <tr>
              {TABLE_HEAD.map((value, id) => {
                return (
                  <th
                    key={id}
                    className={`first:bg-main first:shadow-none first:w-[10%] w-[12%] text-[1.125rem] text-white font-normal p-2 rounded-md shadow-lg`}
                  >
                    <div className="flex items-center justify-center gap-2 font-bold">
                      {value.img && (
                        <img
                          src={`http://175.123.253.182/icon/${value.img}`}
                          alt="icon"
                          className="w-[2.5rem] h-[2.5rem]"
                        />
                      )}
                      {value.name}
                      <br />
                      {value.unit}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="bg-sub2">
            {sensorData.map((data, id) => {
              if (data.no === 8) {
                return null;
              }

              return (
                <tr
                  key={id}
                  className="text-center text-white font-bold text-[1.125rem]"
                >
                  <th className="rounded-md shadow-lg px-3 py-3">
                    {data.no === 0 ? "평균" : data.no}
                  </th>
                  {data.sensorDtoList.map((sensor, idx) => (
                    <td key={idx} className="rounded-md shadow-lg px-3 py-3">
                      {sensor.value}
                    </td>
                  ))}
                </tr>
              );
            })}
            {/* {TABLE_BODY.map((value, id) => {
              return (
                <tr
                  key={id}
                  className="text-center text-white font-bold text-[1.125rem]"
                >
                  <th className="rounded-md shadow-lg px-3 py-3">{value.th}</th>
                  <td className="rounded-md shadow-lg px-3 py-3">
                    {value.tem}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-3">
                    {value.hum}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-3">
                    {value.co2}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-3">
                    {value.solar}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-3">{value.pt}</td>
                  <td className="rounded-md shadow-lg px-3 py-3">{value.ph}</td>
                  <td className="rounded-md shadow-lg px-3 py-3">{value.ec}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default SensorContent;

const INFO_LIST = [
  {
    id: 1,
    name: "기온",
    unit: "℃",
    img: "sensor_temper@2x.svg",
  },
  {
    id: 2,
    name: "습기",
    unit: "%",
    img: "sensor_humidity_2@2x.svg",
  },

  {
    id: 3,
    name: "강우",
    unit: "mm",
    img: "sensor_rain@2x.svg",
  },
  {
    id: 4,
    name: "일사",
    unit: "W/㎡",
    img: "sun-icon@2x.svg",
  },

  {
    id: 5,
    name: "풍향",
    unit: "˚",
    img: "sensor_wind_direction_2@2x.svg",
  },
  {
    id: 6,
    name: "풍속",
    unit: "m/s",
    img: "sensor_wind_speed@2x.svg",
  },
  {
    id: 7,
    name: "CO₂",
    unit: "ppm",
    img: "sensor-co2@2x.svg",
  },
];

const TABLE_HEAD = [
  { name: "" },
  { name: "온도", unit: "(℃)", img: "sensor_temper@2x.svg" },
  { name: "습도", unit: "(%)", img: "sensor_humidity_2@2x.svg" },
  { name: "CO₂", unit: "(ppm)", img: "sensor-co2@2x.svg" },
  { name: "일사", unit: "(W/㎡)", img: "sun-icon@2x.svg" },
  { name: "Pt100", unit: "(℃)", img: "temper-icon@2x.svg" },
  { name: "pH", unit: "(pH)", img: "ph.svg" },
  { name: "EC", unit: "(mD/cm)", img: "ec.svg" },
];
