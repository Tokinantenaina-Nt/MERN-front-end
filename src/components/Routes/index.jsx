import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Trending from "../../pages/Trending";
import Profil from "../../pages/Profil";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/trending" element={<Trending />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
