import FacebookIcon from "@/components/icons/FacebookIcon";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { paths } from "@/lib/paths";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RegisterForm = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const { handleRegister, handleLoginWithGoogle, loading } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("You must agree to the Terms of Service to continue.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    handleRegister(fullname, username, email, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <Label className="flex flex-col min-w-40 flex-1">
          <Input
            type="text"
            placeholder="Full Name"
            className="form-input flex w-full min-w-0 flex-1"
            required
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
        </Label>
      </div>
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <Label className="flex flex-col min-w-40 flex-1">
          <Input
            type="text"
            placeholder="Username"
            className="form-input flex w-full min-w-0 flex-1"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Label>
      </div>
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <Label className="flex flex-col min-w-40 flex-1">
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className="form-input flex w-full min-w-0 flex-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>
      </div>
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <Label className="flex flex-col min-w-40 flex-1">
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            className="form-input flex w-full min-w-0 flex-1"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Label>
      </div>
      <div className="w-full flex flex-wrap items-end gap-4 px-4 py-3">
        <Label className="flex flex-col min-w-40 flex-1">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="form-input flex w-full min-w-0 flex-1"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Label>
      </div>
      <div className="w-full flex items-center gap-4 px-4 min-h-14 justify-between">
        <div className="shrink-0">
          <div className="flex size-7 items-center justify-center">
            <Checkbox
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
            />
          </div>
        </div>
        <p className="text-base font-normal leading-normal flex-1 truncate">
          I agree to the&nbsp;
          <Link to={paths.register} className="text-[#1877F2] underline">
            Terms of Service and Privacy Policy
          </Link>
        </p>
      </div>

      <div className="w-full flex px-4 py-3 *:w-full">
        <Button disabled={loading}>Sign Up</Button>
      </div>
      <div className="w-full px-4 py-3 space-y-2">
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2 justify-center"
          onClick={handleLoginWithGoogle}
        >
          <GoogleIcon />
          Sign up with Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center gap-2 justify-center text-[#1877F2]"
        >
          <FacebookIcon />
          Sign up with Facebook
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
