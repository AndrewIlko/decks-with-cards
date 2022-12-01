import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Deck = () => {
  const [decks, setDecks] = useState([]);
  const [name, setName] = useState("");

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == "") return;
    await axios.post("http://localhost:5000/add-deck", { name: name });
    await axios
      .get("http://localhost:5000/get-decks")
      .then((res) => res.data)
      .then((res) => setDecks(res));
    setName("");
    console.log("Deck added and decks updated");
  };

  const deleteDeck = async (id) => {
    await axios.post(`http://localhost:5000/delete-deck`, { id: id });
    await axios
      .get("http://localhost:5000/get-decks")
      .then((res) => res.data)
      .then((res) => setDecks(res));
  };

  useEffect(() => {
    (async () => {
      let decks;
      await axios
        .get("http://localhost:5000/get-decks")
        .then((res) => res.data)
        .then((res) => (decks = res));
      setDecks(decks);
    })();
  }, []);
  return (
    <>
      <div className="decks">
        {decks.map((deck) => (
          <div className="deck" key={deck._id}>
            <Link
              to={`/deck/${deck._id}`}
              style={{ textDecoration: "none", color: "teal" }}
            >
              {deck.name}
            </Link>
            <i
              className="material-icons close-icon"
              onClick={() => {
                deleteDeck(deck._id);
              }}
            >
              close
            </i>
          </div>
        ))}
        ;
      </div>
      <div className="deckForm__wrapper">
        <form className="deckForm" onSubmit={handleSubmit}>
          <div className="deckForm-title">Title</div>
          <input
            className="deckForm-input"
            type="text"
            value={name}
            onChange={handleInput}
          />
          <button className="deckForm-btn">Add deck</button>
        </form>
      </div>
    </>
  );
};

export default Deck;
