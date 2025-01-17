import { Route, Routes } from "react-router-dom";
import { AuthenticatedRoutes } from "../../constants/Routes";
const Authenticate = () => {
  return (
    <>
      <Routes>
        <Route path={AuthenticatedRoutes.HOME} element="HOME" />
      </Routes>
    </>
  );
};

export default Authenticate;
