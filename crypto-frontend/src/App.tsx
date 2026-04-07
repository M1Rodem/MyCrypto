import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import { CryptoPage } from "./pages/CryptoPage";
import { CursorGlow } from "./shared/ui/CursorGlow";
import { CryptoParticles } from "./shared/ui/CryptoParticles";
import { CursorParticles } from "./shared/ui/CursorParticles"; // <-- НОВАЯ
import "./shared/ui/CursorGlow.css";
import "./shared/ui/CryptoParticles.css";
import "./shared/ui/CursorParticles.css"; // <-- НОВЫЙ

function App() {
  return (
    <>
      {/* Свечение за мышкой */}
      <CursorGlow />
      
      {/* Рандомные частицы по странице */}
      <CryptoParticles />
      
      {/* Частицы ОТ МЫШКИ */}
      <CursorParticles />
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crypto" element={<CryptoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;