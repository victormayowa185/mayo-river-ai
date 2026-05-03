import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SolverPage from "./pages/SolverPage";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";

import Preloader from "./components/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show the preloader for 2.5 seconds (adjust as you like)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // While loading, only render the preloader
  if (loading) {
    return <Preloader />;
  }

  // Afterwards, the full app appears
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solver" element={<SolverPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
