import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { AppFlat } from "../interfaces/AppFlat";

export const GetFavoriteFlats = async (): Promise<AppFlat[]> => {
  const flatsCollection = collection(db, "flats");
  const q = query(flatsCollection, where("isFavorite", "==", true));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      uid: doc.id,
    } as AppFlat;
  });
};