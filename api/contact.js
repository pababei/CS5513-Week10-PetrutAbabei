import { db } from "@/firebase/firebase-app";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addContact = async ({ userId, firstName, lastName, email, phone }) => {
  try {
    await addDoc(collection(db, "contact"), {
      user: userId,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const deleteContact = async (docId) => {
  try {
    const todoRef = doc(db, "contact", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addContact, deleteContact };
