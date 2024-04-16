import Select from "@/components/common/select";
import { FormProvider, useForm } from "react-hook-form";

const WeatherInfo = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <div className="m-6 bg-main rounded-[.625rem] h-[calc(100vh-6.75rem)]">
        <div className="h-[4.375rem] p-6 bg-main rounded-t-[.625rem] border-b border-mainLine flex justify-between items-center relative">
          <h2 className="text-[1.5rem] text-[#fff] font-bold">
            기상청 날씨정보
          </h2>
        </div>
        <div className="p-6">
          <Select options={REGION_LIST} selectWrap="!w-[18.75rem]" />

          <div className="grid-cols-2 grid gap-[.625rem] justify-center mt-[3.125rem]">
            {INFO_LIST.map((list) => {
              return (
                <div
                  key={list.id}
                  className="bg-sub2 rounded-md p-[.625rem] flex justify-start items-center gap-5 h-[3.125rem] shadow-lg"
                >
                  <img
                    src={`http://175.123.253.182/icon/${list.img}`}
                    alt="icon"
                    className="w-[2.5rem] h-[2.5rem]"
                  />
                  <span className="text-white font-bold text-[1.25rem]">
                    {list.name}
                  </span>
                  <span className="text-white">{list.value}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default WeatherInfo;

const REGION_LIST = [
  { id: 1, name: "서울특별시 성북구" },
  { id: 2, name: "서울특별시 강남구" },
];

const INFO_LIST = [
  {
    id: 1,
    name: "강수량",
    value: "0 mm/hr",
    img: "sensor_rain@2x.svg",
  },
  {
    id: 2,
    name: "강수형태",
    value: "없음",
    img: "sensor_rain@2x.svg",
  },
  {
    id: 3,
    name: "기온",
    value: "-12.2 ℃",
    img: "sensor_temper@2x.svg",
  },
  { id: 4, name: "습기", value: "49 %", img: "sensor_humidity_2@2x.svg" },
  {
    id: 5,
    name: "풍향",
    value: "312 ˚",
    img: "sensor_wind_direction_2@2x.svg",
  },
  {
    id: 6,
    name: "풍속",
    value: "2.5 m/s",
    img: "sensor_wind_speed@2x.svg",
  },
  {
    id: 7,
    name: "이슬점",
    value: "0.2 ℃",
    img: "water-icon.svg",
  },
];
