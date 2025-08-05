import React from "react";
import { Route, Routes } from "react-router-dom";
import { paths } from "@/lib/constants";
import { Toaster } from "sonner";
import AppLayout from "@layouts/AppLayout";
import HomePage from "@pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";
import RegisterPage from "@/features/auth/pages/RegisterPage";
import MyStackPage from "@/features/word/pages/MyStackPage";
import LearnPage from "@/features/word/pages/LearnPage";
import SearchPage from "@/features/word/pages/SearchPage";
import ProfilePage from "@/pages/ProfilePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={paths.register} element={<RegisterPage />} />
          <Route path={paths.login} element={<LoginPage />} />
          <Route path={paths.home} element={<HomePage />} />
          <Route path={paths.myStack} element={<MyStackPage />} />
          <Route path={paths.learn} element={<LearnPage />} />
          <Route path={paths.search} element={<SearchPage />} />
          <Route path={paths.profile} element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default App;
