import Layout from "../layout";
import controlRoute from "./control";

export default [
  {
    path: "/",
    index: true,
    element: <Layout />,
  },

  controlRoute,
];
