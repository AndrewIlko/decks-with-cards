import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const DeckCards = () => {
  const [cards, setCards] = useState(null);
  const { deckId } = useParams();
  useEffect(() => {
    (async () => {
      await axios
        .get(`http://localhost:5000/deck/${deckId}`)
        .then((res) => res.data)
        .then((res) => setCards(res));
    })();
  }, []);

  const handleCardBtn = async () => {
    await axios.post(`http://localhost:5000/deck/${deckId}`);
    await axios
      .get(`http://localhost:5000/deck/${deckId}`)
      .then((res) => res.data)
      .then((res) => setCards(res));
  };
  return (
    <>
      {!cards ? (
        <h1 style={{ color: "#fff" }}>Cards shoud be here</h1>
      ) : (
        <div>
          <div className="decks">
            {cards.map((deck) => (
              <div className="deck" key={deck._id}>
                {deck.name}
              </div>
            ))}
          </div>
          <button onClick={handleCardBtn}>Add card</button>
        </div>
      )}
    </>
  );
};

export default DeckCards;
