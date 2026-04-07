import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { encryptRequest, decryptRequest, generateKeyRequest } from "../api/cryptoApi";

const KEY_COOKIE_NAME = "crypto_session_key";

export interface UseCryptoReturn {
  // State
  text: string;
  result: string;
  mode: "encrypt" | "decrypt";
  loading: boolean;
  keyStatus: "empty" | "loaded";
  
  // Actions
  setText: (value: string) => void;
  setMode: (mode: "encrypt" | "decrypt") => void;
  encrypt: () => Promise<void>;
  decrypt: () => Promise<void>;
  generateKey: () => Promise<void>;
}

export const useCrypto = (): UseCryptoReturn => {
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [loading, setLoading] = useState(false);
  const [keyStatus, setKeyStatus] = useState<"empty" | "loaded">("empty");

  const [texts, setTexts] = useState<{
    encrypt: string;
    decrypt: string;
  }>({
    encrypt: "",
    decrypt: "",
  });

  const [results, setResults] = useState<{
    encrypt: string;
    decrypt: string;
  }>({
    encrypt: "",
    decrypt: "",
  });

  const text = mode === "encrypt" ? texts.encrypt : texts.decrypt;

  const result = mode === "encrypt" ? results.encrypt : results.decrypt;

  const setText = useCallback((value: string) => {
    setTexts((prev) => ({
      ...prev,
      [mode]: value,
    }));
  }, [mode]);

  useEffect(() => {
    const existingKey = Cookies.get(KEY_COOKIE_NAME);
    if (existingKey && existingKey.length > 0) {
      setKeyStatus("loaded");
    }
  }, []);

  const generateKey = useCallback(async () => {
    try {
      setLoading(true);
      const response = await generateKeyRequest();
      const newKey = response.data?.key;

      if (!newKey) {
        throw new Error("Invalid key response");
      }

      Cookies.set(KEY_COOKIE_NAME, newKey, {
        expires: 7,
        secure: import.meta.env.PROD,
        sameSite: "strict",
      });

      setKeyStatus("loaded");
    } catch (error) {
      console.error("Error generating key:", error);
      alert("Ошибка генерации ключа");
    } finally {
      setLoading(false);
    }
  }, []);

  const getKeyFromCookies = useCallback((): string | null => {
    return Cookies.get(KEY_COOKIE_NAME) || null;
  }, []);

  const encrypt = useCallback(async () => {
    const key = getKeyFromCookies();
    if (!key) {
      alert("Сначала сгенерируйте ключ!");
      return;
    }
    if (!texts.encrypt.trim()) {
      alert("Введите текст!");
      return;
    }

    try {
      setLoading(true);
      const response = await encryptRequest(texts.encrypt, key);
      const encrypted = response.data?.encrypted || response.data?.result || "";
      
      setResults((prev) => ({ ...prev, encrypt: encrypted }));
    } catch (error) {
      console.error("Encryption error:", error);
      alert("Ошибка шифрования");
    } finally {
      setLoading(false);
    }
  }, [texts.encrypt, getKeyFromCookies]);

  const decrypt = useCallback(async () => {
    const key = getKeyFromCookies();
    if (!key) {
      alert("Сначала сгенерируйте ключ!");
      return;
    }
    if (!texts.decrypt.trim()) {
      alert("Введите зашифрованный текст!");
      return;
    }

    try {
      setLoading(true);
      const response = await decryptRequest(texts.decrypt, key);
      const decrypted = response.data?.decrypted || response.data?.result || "";
      
      setResults((prev) => ({ ...prev, decrypt: decrypted }));
    } catch (error) {
      console.error("Decryption error:", error);
      alert("Ошибка расшифровки");
    } finally {
      setLoading(false);
    }
  }, [texts.decrypt, getKeyFromCookies]);

  return {
    text, 
    result,
    mode,
    loading,
    keyStatus,
    setText,    
    setMode,
    encrypt,
    decrypt,
    generateKey,
  };
};