import admin from "firebase-admin";
import serviceAccountJSON from "./serviceAccountKey.json";
import { ServiceAccount } from "firebase-admin";

const serviceAccount = serviceAccountJSON as ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const verifyToken = async (token: string) => {
  try {
    return await admin.auth().verifyIdToken(token);
  } catch (error) {
    console.error("Token verification failed:", error);
    throw error;
  }
};
