import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Deck = () => {
  const [name, setName] = useState("");
  const [decks, setDecks] = useState(null);
  const handleInput = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/add-deck", { name: name });
    await axios
      .get("http://localhost:5000/get-decks")
      .then((res) => res.data)
      .then((res) => setDecks(res));
    console.log("Deck added and decks updated");
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
        {decks == null
          ? "Loading..."
          : decks.map((deck) => (
              <Link
                key={deck._id}
                to={`/deck/${deck._id}`}
                style={{ textDecoration: "none", color: "blue" }}
              >
                <div className="deck">{deck.name}</div>
              </Link>
            ))}
      </div>
      <div className="deckForm__wrapper">
        <form className="deckForm" onSubmit={handleSubmit}>
          <div className="deckForm-title">Name</div>
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
