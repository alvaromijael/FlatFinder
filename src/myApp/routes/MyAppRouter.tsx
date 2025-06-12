import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";

import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { MyFlatsPage } from "../pages/MyFlatsPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { AllUsersPage } from "../pages/AllUsersPage";
import { NewFlat } from "../pages/NewFlat";
import { UpdateFlat } from "../pages/UpdateFlat";
import { ItemFlat } from "../pages/ItemFlat";


export const MyAppRouter = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/my-flats" element={<MyFlatsPage />} />
        <Route path="/new-flat" element={<NewFlat />} />
        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="/all-users" element={<AllUsersPage />} />
        <Route path="/update-flat/:id" element={<UpdateFlat />} />
        <Route path="/flat/:id" element={<ItemFlat />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};