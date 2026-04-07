import "./CryptoPage.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CryptoForm } from "../features/crypto/components/CryptoForm";
import { ArrowLeftIcon } from "../shared/ui/Icons";

export const CryptoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="crypto-page">
      {/* Навигация */}
      <header className="crypto-header">
        <motion.button
          className="crypto-back-btn"
          onClick={() => navigate("/")}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeftIcon size={18} color="#94a3b8" />
          <span>Назад</span>
        </motion.button>

        <div className="header-separator" />

        <span className="header-brand">Encryption Tool</span>
      </header>

      {/* Форма */}
      <CryptoForm />
    </div>
  );
};