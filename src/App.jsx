// import { useState } from "react";

// import "./App.css";
import Header from "./Header";
import MainBody from "./Mainbody";
import ScissorStats from "./Scissorstats";
import Pricing from "./Pricing";
import CtaForm from "./Cta";
import Faq from "./Faq";
import GetStarted from "./Getstarted";
import Footer from "./Footer";
import "./index.css";

function App() {
  return (
    <>
      <Header />
      <MainBody />
      <ScissorStats />
      <Pricing />
      <CtaForm />
      <Faq />
      <GetStarted />
      <Footer />
    </>
  );
}

export default App;
