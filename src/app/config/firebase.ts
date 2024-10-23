// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDnVF8xL-SzAQWi1m7MWdrhukebsqKueLc",
  authDomain: "olxstore-ebbd5.firebaseapp.com",
  projectId: "olxstore-ebbd5",
  storageBucket: "olxstore-ebbd5.appspot.com",
  messagingSenderId: "823041580706",
  appId: "1:823041580706:web:f1b22dba93063283d181fb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export default async function uploadFile(file: File) {
  try {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
