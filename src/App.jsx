import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Features from "./components/Feature";
import Contact from "./components/Contact";
import DocumentConverter from "./components/DocumentConverter"; // your Home

function App() {
  return (
    <Router>
      {/* Main wrapper for sticky footer */}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<DocumentConverter />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      {/* Footer always visible at bottom */}
      <Footer />
    </Router>
  );
}

export default App;
