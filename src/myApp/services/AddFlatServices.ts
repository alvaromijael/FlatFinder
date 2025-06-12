import { db } from "../../firebase/firebase";
import type { AppFlat } from "../interfaces/AppFlat";
import { addDoc, collection, Timestamp, updateDoc } from "firebase/firestore";


export const registerFlat = async (
  src: string,
  name: string,
  city: string,
  streetName: string,
  streetNumber: string,
  areaSize: number,
  hasAC: boolean,
  yearBuilt: number,
  rentPrice: number,
  dateAvailable: Timestamp,
  creatorUid: string
): Promise<AppFlat> => {
  const flatData = {
    src,
    name,
    city,
    streetName,
    streetNumber,
    areaSize,
    hasAC,
    yearBuilt,
    rentPrice,
    dateAvailable,
    creatorUid
  };

  // Agrega el documento sin uid
  const docRef = await addDoc(collection(db, 'flats'), flatData);

  // Agrega el uid como el id del documento generado
  await updateDoc(docRef, { uid: docRef.id });

  return { ...flatData, uid: docRef.id };
};

