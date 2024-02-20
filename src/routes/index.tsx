import Layout from "@/layout";
import weatherRoute from "@/routes/weather";
import controlRoute from "@/routes/control";
import farmRoute from "@/routes/farm";
import userRoute from "@/routes/user";

export default [
  {
    path: "/",
    index: true,
    element: <Layout />,
  },

  weatherRoute, //기상청 날씨 정보
  controlRoute, //원격 제어
  farmRoute, //농가 리스트
  userRoute, //사용자 리스트
];
