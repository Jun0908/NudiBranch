import Header from "./Header";
import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Explana from "./Explana";
//import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const toastStyle: React.CSSProperties = {
    position: "fixed",
    bottom: "1rem",
    right: "1rem",
    backgroundColor: "#319795",
    color: "#fff",
    padding: "1rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    transition: "opacity 0.5s",
    opacity: showToast ? 1 : 0,
  };

  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <Explana />
      <Footer />
      {showToast && (
        <div style={toastStyle}>
          <strong>Connect Wallet</strong>
          <div>Connect to Polygon Mumbai for testing</div>
        </div>
      )}
    </>
  );
}
