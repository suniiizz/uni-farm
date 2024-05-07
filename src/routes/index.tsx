import Layout from "@/layout";
import weatherRoute from "@/routes/weather";
import controlRoute from "@/routes/control";
import controlRecordRoute from "@/routes/control-record";
import sensorViewRoute from "@/routes/sensor-view";
import sensorRecordRoute from "@/routes/sensor-record";
import farmRoute from "@/routes/farm";
import userRoute from "@/routes/user-list";
import alertRoute from "@/routes/alert";
import authRoute from "@/routes/auth";
import cctvRoute from "@/routes/cctv";
import RequiredAuth from "@/components/pages/user/required-auth";

export default [
  {
    path: "/",
    index: true,
    element: (
      <RequiredAuth>
        <Layout />
      </RequiredAuth>
    ),
  },

  authRoute, //인증
  weatherRoute, //기상청 날씨 정보
  controlRoute, //원격 제어
  controlRecordRoute, //제어 기록
  sensorViewRoute, //센서 보기
  sensorRecordRoute, //센서 기록
  alertRoute, //경보내역
  cctvRoute, //cctv
  farmRoute, //농가 리스트
  userRoute, //사용자 리스트
];
