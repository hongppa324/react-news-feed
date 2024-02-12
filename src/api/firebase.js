import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
// 	apiKey: process.env.REACT_APP_FB_API_KEY,
// 	authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
// 	projectId: process.env.REACT_APP_PROJECT_ID,
// 	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
// 	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
// 	appId: process.env.REACT_APP_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDgSPbM00g_0Q97DEy-2OnSZ5BXpNC7Zc0",
  authDomain: "newsfeedpractice.firebaseapp.com",
  projectId: "newsfeedpractice",
  storageBucket: "newsfeedpractice.appspot.com",
  messagingSenderId: "707606848072",
  appId: "1:707606848072:web:b7f6aa4457ca5b8a8e6e7d"
};

// Firebase 앱 초기화

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
