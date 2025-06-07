import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"; // Ajusta si tu ruta es distinta
import type { AppFlat } from "../interfaces/AppFlat";

export const GetAllFlats = async (): Promise<AppFlat[]> => {
  const flatsCollection = collection(db, "flats");
  const snapshot = await getDocs(flatsCollection);

  const flats: AppFlat[] = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      uid: doc.id, // ⚠️ Asegúrate que esté también en el documento (si ya lo guardaste ahí)
    } as AppFlat;
  });

  return flats;
};