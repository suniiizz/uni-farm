const SensorContent = () => {
  return (
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
