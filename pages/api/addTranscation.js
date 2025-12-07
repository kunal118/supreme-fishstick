import { initializeApp, getApps } from "firebase/app";
import { getFirestore, addDoc, collection, serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDMTzVCWalNtpoxL4QiX9qX9VYwGP5sJa4",
  authDomain: "fir-first-project-5fd47.firebaseapp.com",
  projectId: "fir-first-project-5fd47",
  storageBucket: "fir-first-project-5fd47.appspot.com",
  messagingSenderId: "12399809829",
  appId: "1:12399809829:web:12661e3c44e9ccaa0eb6cc",
  measurementId: "G-PM471H4DM3"
};
if (!getApps().length) initializeApp(firebaseConfig);
const db = getFirestore();

export default async function handler(req, res) {
  try {
    const value = req.query.value;
    if (!value) return res.status(400).json({ error: "Missing ?value=" });

    await addDoc(collection(db, "transactions"), {
      value,
      timestamp: serverTimestamp(),
    });

    return res.status(200).json({ success: true, value });
  } catch (e) {
    return res.status(500).json({ error: "Failed to save" });
  }
}
