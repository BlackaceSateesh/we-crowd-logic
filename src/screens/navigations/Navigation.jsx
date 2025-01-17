/* eslint-disable no-constant-condition */
import { BrowserRouter } from "react-router-dom";
import Auth from "./Auth";
import Authenticate from "./Authenticate";

const Navigation = () => {
  return (
    <>
      <BrowserRouter>{true ? <Authenticate /> : <Auth />}</BrowserRouter>
    </>
  );
};

export default Navigation;
