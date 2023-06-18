import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import path from "../../ultils/path";
import { toast } from "react-toastify";

const FinalRegister = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "success") {
      toast.success("Successful account registration!");
      navigate(`/${path.LOGIN}`);
    } else {
      toast.error("Account registration failed!");
      navigate(`/${path.LOGIN}`);
    }
  }, [status, navigate]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <h1 className="text-2xl font-bold text-center">
        Redirecting page please wait!
      </h1>
    </div>
  );
};

export default FinalRegister;
