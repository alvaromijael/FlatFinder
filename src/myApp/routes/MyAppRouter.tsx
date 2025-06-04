import React from "react";
import { HomePage } from "../pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { SideBar } from "../components/SideBar";

export const MyAppRouter = () => {
  return (
    <>
      <SideBar/>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
