import { useState } from "react";
import { signupFields } from "../../../constants/formFields";
import FormAction from "../FormAction";
import Input from "../Input";
import { createCustomer, loginAPI } from "../../../middlewave/customers/listsAPI";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createCookie } from "../../../constants/createCookie";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setLoginState({
      email: signupState.email,
      password: signupState.password
    })
    createAccount(signupState);
  };

  //handle Signup API Integration here
  const createAccount = (information) => {
    async function loginFunc(loginState) {
      const response = await loginAPI(loginState);
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
    async function createAccountAPI(information) {
      const response = await createCustomer(information);
      if(response.customerUserErrors.length > 0) {
        toast.error(response.customerUserErrors[0].message);
      } else {
        loginFunc(loginState)
      }
    }
    createAccountAPI(information);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
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
      </div>
    </form>
  );
}
