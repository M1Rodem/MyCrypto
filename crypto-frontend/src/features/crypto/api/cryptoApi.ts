import { api } from "../../../app/api";

export const encryptRequest = (text: string, key: string) =>
  api.post("/Crypto/encrypt", { text, key });

export const decryptRequest = (encryptedText: string, key: string) =>
  api.post("/Crypto/decrypt", { encryptedText, key });

export const generateKeyRequest = () =>
  api.get("/Crypto/generate-key");