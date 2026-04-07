import "./CryptoForm.css";
import { motion, AnimatePresence } from "framer-motion";
import { useCrypto } from "../hooks/useCrypto";
import {
  LockIcon,
  KeyIcon,
  EncryptIcon,
  DecryptIcon,
  CheckIcon,
  CopyIcon,
  WarningIcon,
} from "../../../shared/ui/Icons";

export const CryptoForm = () => {
  const {
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
  } = useCrypto();

  return (
    <div className="cf-wrapper">
      {/* Фон */}
      <div className="cf-bg">
        <div className="cf-glow cf-glow-1" />
        <div className="cf-glow cf-glow-2" />
        <div className="cf-grid" />
      </div>

      {/* Карточка */}
      <motion.div
        className="cf-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* === HEADER === */}
        <div className="cf-header">
          <div className="cf-header-left">
            <div className="cf-logo">
              <LockIcon size={24} color="#22c55e" />
            </div>
            <div className="cf-header-text">
              <h1 className="cf-title">Композитное шифрование</h1>
              <p className="cf-subtitle">PBKDF2 + ChaCha20 + HMAC</p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.button
              key={keyStatus}
              className={`cf-key-btn ${keyStatus}`}
              onClick={generateKey}
              disabled={loading}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
            >
              {keyStatus === "loaded" ? (
                <>
                  <span className="cf-key-dot" />
                  <CheckIcon size={14} color="#22c55e" />
                  <span>Key Saved</span>
                </>
              ) : (
                <>
                  <KeyIcon size={14} color="#000000" />
                  <span>Generate Key</span>
                </>
              )}
            </motion.button>
          </AnimatePresence>
        </div>

        {/* === TABS — ИСПРАВЛЕННЫЕ === */}
        <div className="cf-tabs">
          <button
            className={`cf-tab ${mode === "encrypt" ? "active" : ""}`}
            onClick={() => setMode("encrypt")}
          >
            <EncryptIcon
              size={17}
              color={mode === "encrypt" ? "#000000" : "#64748b"}
            />
            <span>Зашифровать</span>
          </button>

          <button
            className={`cf-tab ${mode === "decrypt" ? "active" : ""}`}
            onClick={() => setMode("decrypt")}
          >
            <DecryptIcon
              size={17}
              color={mode === "decrypt" ? "#000000" : "#64748b"}
            />
            <span>Расшифровать</span>
          </button>
          <motion.div
            className="cf-tab-indicator"
            animate={{
              x: mode === "encrypt" ? 0 : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 28,
            }}
          />
        </div>

        {/* === INPUT — БЕЗ KEY! СОХРАНЯЕТ ТЕКСТ === */}
        <div className="cf-input-wrap">
          <textarea
            className="cf-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={
              mode === "encrypt"
                ? "Введите текст для шифрования..."
                : "Вставьте зашифрованный текст..."
            }
            rows={5}
          />
          {text.length > 0 && (
            <span className="cf-char-count">{text.length}</span>
          )}
        </div>

        {/* === ACTION BUTTON === */}
        <div className="cf-action">
          <button
            className="cf-submit"
            onClick={mode === "encrypt" ? encrypt : decrypt}
            disabled={loading || keyStatus === "empty"}
          >
            {loading ? (
              <div className="cf-spinner" />
            ) : mode === "encrypt" ? (
              <>
                <EncryptIcon size={18} color="#000000" />
                <span>Зашифровать</span>
              </>
            ) : (
              <>
                <DecryptIcon size={18} color="#000000" />
                <span>Расшифровать</span>
              </>
            )}
          </button>

          {/* Warning */}
          <AnimatePresence>
            {keyStatus === "empty" && !loading && (
              <motion.div
                className="cf-warning"
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.25 }}
              >
                <WarningIcon size={15} color="#f59e0b" />
                <span>Сначала сгенерируйте ключ</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === RESULT С АНИМАЦИЯМИ === */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={`${mode}-result`}
              className="cf-result"
              initial={{
                opacity: 0,
                height: 0,
                y: -15,
                filter: "blur(8px)",
              }}
              animate={{
                opacity: 1,
                height: "auto",
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                height: 0,
                y: 15,
                filter: "blur(8px)",
                transition: { duration: 0.2 },
              }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
            >
              <div className="cf-result-head">
                <div className="cf-result-label">
                  {mode === "encrypt" ? (
                    <EncryptIcon size={14} color="#22c55e" />
                  ) : (
                    <DecryptIcon size={14} color="#3b82f6" />
                  )}
                  <span>
                    {mode === "encrypt"
                      ? "Зашифрованный результат"
                      : "Расшифрованный результат"}
                  </span>
                </div>
		<button
		  className="cf-copy-btn"
  		  onClick={async () => {
    if (!result) {
      alert("Нет данных для копирования");
      return;
    }
    try {
      await navigator.clipboard.writeText(result);
      alert("Скопировано!");
    } catch (err) {
      // Fallback для HTTP
      const textarea = document.createElement("textarea");
      textarea.value = result;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Скопировано");
    }
  }}
>
  <CopyIcon size={13} color="#22c55e" />
  <span>Копировать</span>
</button>
              </div>

              <div className="cf-result-body">
                <p className="cf-result-text">{result}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
