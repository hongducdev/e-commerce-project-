/* eslint-disable react/style-prop-object */
import React, { useCallback, useState } from "react";
import { Button, InputField } from "../../components";
import * as apis from "../../apis";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { useDispatch } from "react-redux";
import { register } from "../../store/user/userSlice";
import icons from "../../ultils/icons";

const { AiOutlineClose } = icons;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    mobile: "",
  });
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apis.apiRegister(payload);
      if (response?.success) {
        toast.success(response?.message);
        setPayload({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          mobile: "",
        });
        setIsRegister(false);
      } else {
        toast.error(response?.message);
      }
    } else {
      const response = await apis.apiLogin(data);
      if (response.success) {
        toast.success(response.message);
        dispatch(
          register({
            isLogin: true,
            token: response.accessToken,
            userData: response.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        toast.error(response.message);
      }
    }
  }, [payload, isRegister, dispatch, navigate]);

  // forgot password
  const [payloadForgotPassword, setPayloadForgotPassword] = useState({
    email: "",
  });
  const handleForgotPassword = async () => {
    const response = await apis.apiForgotPassword({
      ...payloadForgotPassword,
    });
    if (response.success) {
      toast.success(response.message);
      setPayloadForgotPassword({
        email: "",
      });
      setIsForgotPassword(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center relative">
      {isForgotPassword && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-20 flex items-center justify-center animate-slide-up">
          <div className="bg-white min-w-[500px] p-8 rounded-lg">
            <div className="flex justify-between">
              <h1 className="text-3xl text-primary font-semibold mb-10 uppercase text-center">
                Forgot Password
              </h1>
              <div className="">
                <AiOutlineClose
                  className="text-2xl cursor-pointer hover:text-primary"
                  onClick={() => setIsForgotPassword(false)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <InputField
                type="email"
                placeholder="Email"
                value={payloadForgotPassword.email}
                setValue={setPayloadForgotPassword}
                nameKey="email"
              />
              <Button
                name="Send Email"
                style="w-full"
                handleOnCLick={handleForgotPassword}
              />
            </div>
          </div>
        </div>
      )}
      <div className="bg-white p-8 rounded-lg min-w-[500px] shadow-lg">
        <h1 className="text-3xl text-primary font-semibold mb-10 uppercase text-center">
          {isRegister ? "Register" : "Login"}
        </h1>

        <div className="flex flex-col gap-3">
          {isRegister && (
            <div className="flex flex-col gap-3">
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
              <InputField
                type="text"
                placeholder="Mobile"
                value={payload.mobile}
                setValue={setPayload}
                nameKey="mobile"
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
            <span
              className="hover:text-primary hover:underline"
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot your account?
            </span>
          )}
          <span
            className={`hover:text-primary hover:underline ${
              isRegister && "text-center w-full"
            }`}
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? "Already have an account?" : "Create an account?"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
