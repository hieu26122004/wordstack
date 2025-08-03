import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../auth.api";
import { setCredentials } from "../auth.slice";
import { paths } from "@/lib/constants";
import { toast } from "sonner";
import { SERVER_URL } from "@/lib/constants";

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    setLoading(true);
    setError("");
    try {
      const { data, message } = await loginUser(email, password);
      dispatch(setCredentials({ accessToken: data.at, user: data.user }));
      navigate(paths.home);
      toast.success(message);
    } catch (error) {
      setError(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    setError("");
    try {
      const { success, message } = await registerUser(
        username,
        email,
        password
      );
      toast.success(message);
      if (success) {
        navigate(paths.login);
      }
    } catch (error) {
      setError(error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = () => {
    const newWindow = window.open(
      `${SERVER_URL}/api/v1/auth/google`,
      "_blank",
      "width=500,height=600"
    );
    const handleReciveInfo = (event) => {
      if (event.origin !== SERVER_URL) return;
      const { at, user } = event.data;
      dispatch(setCredentials({ accessToken: at, user }));
      navigate(paths.home);
      newWindow?.close();
      window.removeEventListener("message", handleReciveInfo);
      toast.success("Login successful.");
    };
    window.addEventListener("message", handleReciveInfo);
  };

  return {
    handleLogin,
    handleRegister,
    handleLoginWithGoogle,
    loading,
    error,
  };
};

export default useAuth;
