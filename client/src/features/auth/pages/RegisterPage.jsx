import React from "react";
import { Link } from "react-router-dom";
import GoogleIcon from "@/components/icons/GoogleIcon";
import FacebookIcon from "@/components/icons/FacebookIcon";
import { paths } from "@/lib/constants";
import useAuth from "../hooks/useAuth";

const RegisterPage = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { handleRegister, handleLoginWithGoogle, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(username, email, password);
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

      {/* Username */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            name="username"
            type="text"
            placeholder="Username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-input flex w-full flex-1 resize-none rounded-lg border h-14 p-[15px] text-base font-normal leading-normal placeholder:text-text-secondary focus:outline-0 focus:ring-0 dark:bg-[#2b3136]"
          />
        </label>
      </div>

      {/* Email */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input flex w-full flex-1 resize-none rounded-lg border h-14 p-[15px] text-base font-normal leading-normal placeholder:text-text-secondary focus:outline-0 focus:ring-0 dark:bg-[#2b3136]"
          />
        </label>
      </div>

      {/* Password */}
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input flex w-full flex-1 resize-none rounded-lg border h-14 p-[15px] text-base font-normal leading-normal placeholder:text-text-secondary focus:outline-0 focus:ring-0 dark:bg-[#2b3136]"
          />
        </label>
      </div>

      {/* Submit */}
      <div className="max-w-[480px] flex px-4 py-3">
        <button
          disabled={loading}
          type="submit"
          className="flex h-10 flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-accent-primary px-4 text-sm font-bold leading-normal tracking-[0.015em] text-text-accent disabled:cursor-wait"
        >
          <span className="truncate">
            {loading ? "Registering..." : "Register"}
          </span>
        </button>
      </div>

      {/* Or continue with */}
      <p className="text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
        Or continue with
      </p>

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

      {/* Link to login page */}
      <Link
        to={paths.login}
        className="text-text-secondary text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center underline"
      >
        Already have an account? Log in
      </Link>
    </form>
  );
};

export default RegisterPage;
