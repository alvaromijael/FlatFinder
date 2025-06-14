// services/UpdateFlatServices.ts
import { db } from "../../firebase/firebase";
import { doc, updateDoc, Timestamp } from "firebase/firestore";

export const updateFlat = async (
  uid: string,
  data: {
    src: string;
    name: string;
    city: string;
    streetName: string;
    streetNumber: string;
    areaSize: number;
    hasAC: boolean;
    yearBuilt: number;
    rentPrice: number;
    dateAvailable: Timestamp;
  }
) => {
  const flatRef = doc(db, "flats", uid);
  await updateDoc(flatRef, data);
};