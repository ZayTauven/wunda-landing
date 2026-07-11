import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { About } from "./components/About";
import { Cta } from "./components/Cta";
import { FAQ } from "./components/FAQ";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Navbar } from "./components/Navbar";
import { Newsletter } from "./components/Newsletter";
import { ScrollToTop } from "./components/ScrollToTop";
import { Services } from "./components/Services";
import { Sponsors } from "./components/Sponsors";
import { SuiviPublic } from "./components/SuiviPublic";
import { Team } from "./components/Team";
import { Testimonials } from "./components/Testimonials";
import { InitiativesPage } from "./pages/InitiativesPage";
import { InitiativeDetailPage } from "./pages/InitiativeDetailPage";
import "./App.css";

function HomePage() {
  return (
    <>
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <SuiviPublic />
      <Newsletter />
      <FAQ />
    </>
  );
}

/** Remonte en haut de page à chaque navigation (et suit les ancres /#section). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/initiatives" element={<InitiativesPage />} />
        <Route path="/initiatives/:id" element={<InitiativeDetailPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
