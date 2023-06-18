import React, { useState } from "react";
import { Button, InputField } from "../../components";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import path from "../../ultils/path";
import * as apis from "../../apis";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [payload, setPayload] = useState({
    password: "",
  });
  const { token } = useParams();
  const handleSubmit = async () => {
    const response = await apis.apiResetPassword({ ...payload, token });
    if (response.success) {
      toast.success(response.message);
      navigate(`/${path.LOGIN}`);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg min-w-[500px] shadow-lg">
        <h1 className="text-3xl text-primary font-semibold mb-10 uppercase text-center">
          Reset Password
        </h1>
        <div className="flex flex-col gap-3">
          <InputField
            type="password"
            placeholder="Password"
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
          />
          <Button name="Submit" style="w-full" handleOnCLick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
