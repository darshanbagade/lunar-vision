import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SpaceBackground from "./components/SpaceBackground";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Methodology from "./pages/Methodology";
import Metrics from "./pages/Metrics";

function App() {
  return (
    <BrowserRouter>
      <SpaceBackground />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/methodology" element={<Methodology />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </main>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;