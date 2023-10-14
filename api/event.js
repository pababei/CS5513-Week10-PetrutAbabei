import { db } from "@/firebase/firebase-app";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addEvent = async ({ userId, date, title, description, status }) => {
  try {
    await addDoc(collection(db, "event"), {
      user: userId,
      date: date,
      title: title,
      description: description,
      status: status,
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const changeEventStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "event", docId);
    await updateDoc(todoRef, { status });
  } catch (err) {
    console.log(err);
  }
};

const deleteEvent = async (docId) => {
  try {
    const todoRef = doc(db, "event", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addEvent, changeEventStatus, deleteEvent };
