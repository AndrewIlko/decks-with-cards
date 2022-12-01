import mongoose from "mongoose";
const { Schema } = mongoose;

const deckSchema = new Schema({
  name: String,
  cards: [Object],
});

const Deck = mongoose.model("Deck", deckSchema);
export default Deck;
