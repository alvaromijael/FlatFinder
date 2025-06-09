import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { MyFlatsPage } from "../pages/MyFlatsPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { AllUsersPage } from "../pages/AllUsersPage";
import { NewFlat } from "../pages/NewFlat";
import { WelcomePage } from "../pages/WelcomePage";


export const MyAppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-flats" element={<MyFlatsPage />} />
        <Route path="/new-flat" element={<NewFlat />} />
        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};