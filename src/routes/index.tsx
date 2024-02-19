import Layout from "../layout";
import controlRoute from "./control";
import weatherRoute from "./weatherInfo";

export default [
  {
    path: "/",
    index: true,
    element: <Layout />,
  },

  weatherRoute, //기상청 날씨 정보
  controlRoute, //원격 제어
];
