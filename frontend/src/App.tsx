import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SolverPage from "./pages/SolverPage"; // we'll build this next
import NotFound from "./pages/NotFound"; // you already have this
import Footer from "./components/Footer"; // you already have this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solver" element={<SolverPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
