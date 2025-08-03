import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { paths } from "@/lib/constants";
import useAuth from "../hooks/useAuth";

const LoginPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { handleLogin, handleLoginWithGoogle, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 flex-1"
    >
      <h2 className="tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
        Welcome to VocabMate!
      </h2>

      {/* Email / Username */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            name="email"
            type="text"
            autoComplete="username"
            placeholder="Username or Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input flex w-full resize-none rounded-lg border h-14 p-[15px] text-base font-normal leading-normal placeholder:text-text-secondary focus:outline-0 focus:ring-0 dark:bg-[#2b3136]"
          />
        </label>
      </div>

      {/* Password */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input flex w-full resize-none rounded-lg border h-14 p-[15px] text-base font-normal leading-normal placeholder:text-text-secondary focus:outline-0 focus:ring-0 dark:bg-[#2b3136]"
          />
        </label>
      </div>

      {/* Forgot password */}
      <div className="px-4">
        <Link
          to={paths.forgotPassword || "#"}
          className="text-text-secondary text-sm font-normal leading-normal underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit button */}
      <div className="max-w-[480px] flex px-4 py-3">
        <button
          disabled={loading}
          type="submit"
          className="flex flex-1 h-10 items-center justify-center overflow-hidden rounded-lg bg-accent-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-text-accent disabled:cursor-wait"
        >
          <span className="truncate">
            {loading ? "Logging in..." : "Login"}
          </span>
        </button>
      </div>

      {/* Divider */}
      <p className="text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Or continue with
      </p>

      {/* Social logins */}
      <div className="max-w-[480px] flex justify-center">
        <div className="flex flex-1 flex-wrap justify-center gap-3 px-4 py-3">
          {/* Google */}
          <button
            disabled={loading}
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex h-10 grow cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#f0f2f4] px-4 text-sm font-bold leading-normal tracking-[0.015em] dark:bg-[#2b3136] disabled:cursor-wait"
          >
            <GoogleIcon className="size-5" />
            <span className="truncate">Continue with Google</span>
          </button>

          {/* Facebook */}
          <button
            disabled={loading}
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex h-10 grow cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#f0f2f4] px-4 text-sm font-bold leading-normal tracking-[0.015em] dark:bg-[#2b3136] disabled:cursor-wait"
          >
            <FacebookIcon className="size-5" />
            <span className="truncate">Continue with Facebook</span>
          </button>
        </div>
      </div>

      {/* Register link */}
      <Link
        to={paths.register}
        className="text-text-secondary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Don&apos;t have an account? Sign Up
      </Link>
    </form>
  );
};

export default LoginPage;
