const SensorContent = () => {
  return (
    <>
      <div className="w-full h-auto border border-white rounded-md flex items-center p-[1.25rem] gap-5">
        <span className="text-[1.25rem] font-bold text-white">외부환경</span>

        <div className="grid-cols-4 grid justify-between w-full gap-2">
          {INFO_LIST.map((list) => {
            return (
              <div
                key={list.id}
                className="bg-sub2 rounded-md p-[.625rem] h-[3.75rem] flex justify-start items-center shadow-lg"
              >
                <img
                  src={`src/assets/icon/${list.img}`}
                  alt="icon"
                  className="w-[2.5rem] h-[2.5rem]"
                />
                <div className="flex flex-col w-full text-center">
                  <span className="text-white font-bold text-[1.125rem]">
                    {list.name}
                  </span>
                  <span className="text-white font-bold">{list.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-[1.875rem]">
        <table className="border-separate border-spacing-3 table-fixed w-full text-[.8125rem]">
          <thead className="bg-sub2">
            <tr>
              {TABLE_HEAD.map((value, id) => {
                return (
                  <th
                    key={id}
                    className={`first:bg-main first:shadow-none first:w-[10%] w-[12%] text-[1.125rem] text-white font-normal p-2 rounded-md shadow-lg`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {value.img && (
                        <img
                          src={`src/assets/icon/${value.img}`}
                          alt="icon"
                          className="w-[2.5rem] h-[2.5rem]"
                        />
                      )}
                      {value.name}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="bg-sub2">
            {TABLE_BODY.map((value, id) => {
              return (
                <tr
                  key={id}
                  className="text-center text-white font-bold text-[1.125rem]"
                >
                  <th className="rounded-md shadow-lg px-3 py-1">{value.th}</th>
                  <td className="rounded-md shadow-lg px-3 py-1">
                    {value.tem}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-1">
                    {value.hum}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-1">
                    {value.co2}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-1">
                    {value.solar}
                  </td>
                  <td className="rounded-md shadow-lg px-3 py-1">{value.pt}</td>
                  <td className="rounded-md shadow-lg px-3 py-1">{value.ph}</td>
                  <td className="rounded-md shadow-lg px-3 py-1">{value.ec}</td>
                </tr>
              );
            })}
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
    value: "-12.2 ℃",
    img: "sensor_temper@2x.svg",
  },
  { id: 2, name: "습기", value: "31.4 %", img: "sensor_humidity_2@2x.svg" },

  {
    id: 3,
    name: "강우",
    value: "1 mm",
    img: "sensor_rain@2x.svg",
  },
  {
    id: 4,
    name: "일사",
    value: "18 W/㎡",
    img: "sun-icon@2x.svg",
  },

  {
    id: 5,
    name: "풍향",
    value: "246 ˚",
    img: "sensor_wind_direction_2@2x.svg",
  },
  {
    id: 6,
    name: "풍속",
    value: "0 m/s",
    img: "sensor_wind_speed@2x.svg",
  },
  {
    id: 7,
    name: "CO₂",
    value: "503 ppm",
    img: "sensor-co2@2x.svg",
  },
];

const TABLE_HEAD = [
  { name: "" },
  { name: "온도 (℃)", img: "sensor_temper@2x.svg" },
  { name: "습도 (%)", img: "sensor_humidity_2@2x.svg" },
  { name: "CO₂ (ppm)", img: "sensor-co2@2x.svg" },
  { name: "solar (W/㎡)", img: "sun-icon@2x.svg" },
  { name: "Pt100 (℃)", img: "temper-icon@2X.svg" },
  { name: "pH (pH)", img: "ph.svg" },
  { name: "EC (mD/cm)", img: "ec.svg" },
];

const TABLE_BODY = [
  {
    th: "평균",
    tem: "20.3",
    hum: "31.4",
    co2: "503",
    solar: "18",
    pt: "20.3",
    ph: "7.2",
    ec: "2.00",
  },
  {
    th: "1",
    tem: "20.3",
    hum: "31.4",
    co2: "503",
    solar: "18",
    pt: "",
    ph: "",
    ec: "",
  },
  {
    th: "2",
    tem: "20.3",
    hum: "31.4",
    co2: "503",
    solar: "18",
    pt: "",
    ph: "",
    ec: "",
  },
  {
    th: "3",
    tem: "20.3",
    hum: "31.4",
    co2: "503",
    solar: "18",
    pt: "",
    ph: "",
    ec: "",
  },
  {
    th: "4",
    tem: "20.3",
    hum: "31.4",
    co2: "503",
    solar: "18",
    pt: "",
    ph: "",
    ec: "",
  },
  {
    th: "토양1",
    tem: "",
    hum: "",
    co2: "",
    solar: "",
    pt: "20.3",
    ph: "7.2",
    ec: "2.00",
  },
  {
    th: "토양2",
    tem: "",
    hum: "",
    co2: "",
    solar: "",
    pt: "20.3",
    ph: "7.2",
    ec: "2.00",
  },
];
