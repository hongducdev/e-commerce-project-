/* eslint-disable react/style-prop-object */
import React, { useCallback, useState } from "react";
import { Button, InputField } from "../../components";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });
  console.log("🚀 ~ Login ~ payload:", payload);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(() => {}, [payload]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg min-w-[500px] shadow-lg">
        <h1 className="text-3xl text-primary font-semibold mb-10 uppercase text-center">
          {isRegister ? "Register" : "Login"}
        </h1>

        <div className="flex flex-col gap-3">
          {isRegister && (
            <div className="flex items-center gap-3">
              <InputField
                type="text"
                placeholder="First Name"
                value={payload.firstName}
                setValue={setPayload}
                nameKey="firstName"
              />
              <InputField
                type="text"
                placeholder="Last Name"
                value={payload.lastName}
                setValue={setPayload}
                nameKey="lastName"
              />
            </div>
          )}
          <InputField
            type="email"
            placeholder="Email"
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
          />

          <Button
            name={isRegister ? "Register" : "Login"}
            style="w-full"
            handleOnCLick={handleSubmit}
          />
        </div>
        <div className="flex items-center justify-between text-gray-400 mt-4 text-sm cursor-pointer">
          {!isRegister && (
            <span className="hover:text-primary hover:underline">
              Forgot your account?
            </span>
          )}
          <span
            className="hover:text-primary hover:underline text-center w-full"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {
              isRegister ? "Already have an account?" : "Create an account?"
            }
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
