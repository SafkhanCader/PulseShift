import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Services from "./sections/Services";
import Tech from "./sections/Tech";
import Project from "./sections/Project";
import Contact from "./sections/Contact";
import NewsLetter from "./sections/NewsLetter";
import Footer from "./sections/Footer";
import Preloader from "./sections/Preloader";

// New subpages
import Web from "./sections/sub/Web";
import Mobile from "./sections/sub/Mobile";
import Cloud from "./sections/sub/Cloud";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Services />
                <Tech />
                <Project />
                <Contact />
                <NewsLetter />
              </>
            }
          />
          <Route path="/web" element={<Web />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/cloud" element={<Cloud />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
