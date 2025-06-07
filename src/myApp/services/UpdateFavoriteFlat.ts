import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const updateFavoriteStatus = async (
  flatId: string,
  isFavorite: boolean
) => {
  const flatRef = doc(db, "flats", flatId);
  await updateDoc(flatRef, { isFavorite });
};