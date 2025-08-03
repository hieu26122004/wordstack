import React from "react";
import { Route, Routes } from "react-router-dom";
import AppLayout from "@layouts/AppLayout";
import { paths } from "@/lib/constants";
import HomePage from "@pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={paths.register} element={<RegisterPage />} />
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.home} element={<HomePage />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default App;
