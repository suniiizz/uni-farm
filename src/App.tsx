import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "@/routes";
import { ModalContextProvider } from "@/components/common/modal/context/modalContext";

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ModalContextProvider>
      <RouterProvider router={router} />
    </ModalContextProvider>
  );
};

export default App;
