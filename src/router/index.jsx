import { PATH } from "../constants/path";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Collections";
import Product from "../pages/Product";
import LoginPage from "../pages/Account/Login/LoginPage";
import SignupPage from "../pages/Account/Singup/SignupPage";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path={PATH.NOTFOUND} element={<NotFound />} />
      <Route exact path={PATH.HOME} element={<Home />} />
      <Route path={PATH.SHOP} element={<Shop />} />
      <Route path={PATH.PRODUCT} element={<Product />} />
      <Route path={PATH.LOGIN} element={<LoginPage />} />
      <Route path={PATH.SIGNUP} element={<SignupPage />} />
    </Routes>
  );
};

export default Router;
