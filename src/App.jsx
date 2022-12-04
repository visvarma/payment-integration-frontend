import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Checkout from "./Pages/checkoutForm";
import { HomePage } from "./Pages/HomePage";

function App() {
  return (
    <div className="App" style={{ width: "100%" }}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/buy_product" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
