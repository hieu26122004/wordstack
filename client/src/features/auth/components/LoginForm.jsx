import React, { useState } from "react";
import FacebookIcon from "@/components/icons/FacebookIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { handleLogin, handleLoginWithGoogle, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Username / Email"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <label class="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Password"
            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#111518] focus:outline-0 focus:ring-0 border border-[#dbe1e6] bg-white focus:border-[#dbe1e6] h-14 placeholder:text-[#617689] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="w-full flex items-center gap-4 px-4 min-h-14 justify-between">
        <p className="text-sm font-normal leading-normal flex-1 truncate">
          Remember me
        </p>
        <div className="shrink-0">
          <div className="flex size-7 items-center justify-center">
            {/* <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(!!checked)}
            /> */}
          </div>
        </div>
      </div>
      <div className="w-full flex px-4 py-3 *:w-full">
        <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-[#2a8fed] text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span class="truncate">Login</span>
        </button>
      </div>
      <div className="w-full px-4 py-3 space-y-2">
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center"
          onClick={handleLoginWithGoogle}
        >
          <GoogleIcon />
          Sign up with Google
        </button>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center text-[#1877F2]"
        >
          <FacebookIcon />
          Login with Facebook
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
