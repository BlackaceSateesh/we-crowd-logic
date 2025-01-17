import { Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../../constants/Routes";
const Auth = () => {
  return (
    <>
      <Routes>
        <Route path={AuthRoutes.LOGIN} element={"LOGIN"} />
      </Routes>
    </>
  );
};

export default Auth;
