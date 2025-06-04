import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { MyFlatsPage } from "../pages/MyFlatsPage";
import { FavouritesPage } from "../pages/FavouritesPage";
import { AllUsersPage } from "../pages/AllUsersPage";


export const MyAppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-flats" element={<MyFlatsPage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};