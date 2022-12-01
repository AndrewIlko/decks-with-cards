import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const DeckCards = () => {
  const [cards, setCards] = useState([]);
  const [name, setName] = useState("");
  const { deckId } = useParams();

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name == "") return;
    await axios.post(`http://localhost:5000/deck/${deckId}`, { name: name });
    await axios
      .get(`http://localhost:5000/deck/${deckId}`)
      .then((res) => res.data)
      .then((res) => setCards(res));
    setName("");
    console.log("Deck added and decks updated");
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:5000/deck/${deckId}`)
        .then((res) => res.data)
        .then((res) => setCards(res));
    })();
  }, []);

  return (
    <>
      {!cards ? (
        <h1 style={{ color: "#fff" }}>Cards shoud be here</h1>
      ) : (
        <div className="decks__wrapper">
          <div className="decks">
            {cards.map((deck) => (
              <div
                key={deck._id}
                className="deck"
                style={{ textDecoration: "none", color: "purple" }}
              >
                {deck.name}
              </div>
            ))}
          </div>
          <form className="deckForm" onSubmit={handleSubmit}>
            <div className="deckForm-title">Title</div>
            <input
              className="deckForm-input"
              type="text"
              value={name}
              onChange={handleInput}
            />
            <button className="deckForm-btn">Add card</button>
          </form>
        </div>
      )}
    </>
  );
};

export default DeckCards;
