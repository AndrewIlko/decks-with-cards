import axios from "axios";
import { useEffect, useState } from "react";
import Deck from "./components/Deck";
import DeckCards from "./components/DeckCards";
import Error from "./components/ErrorPage";
import "./styles/dist/style.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div className="app__wrapper">
        <Routes>
          <Route path="/" element={<Deck />} />
          <Route path="/deck/:deckId" element={<DeckCards />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
