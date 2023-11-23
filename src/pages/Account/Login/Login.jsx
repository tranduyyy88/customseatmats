import { useState } from "react";
import { loginFields } from "../../../constants/formFields";
import FormExtra from "../FormExtra";
import FormAction from "../FormAction";
import Input from "../Input";
import { loginAPI } from "../../../middlewave/customers/listsAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCookie } from "../../../constants/createCookie";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser(loginState);
  };

  
  //Handle Login API Integration here
  const authenticateUser = (information) => {
    
    async function loginFunc(information) {
      const response = await loginAPI(information);
      if (response.customerUserErrors.length > 0) {
        toast.error(response.customerUserErrors[0].message);
      } else {
        toast.success("You are successfully logged in");
        createCookie(
          "AccessTokenShopify",
          response.customerAccessToken.accessToken,
          response.customerAccessToken.expiresAt
        );
        setTimeout(function () {
          window.location.replace('/');
        }, 2000)
      }
    }
    loginFunc(information);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
