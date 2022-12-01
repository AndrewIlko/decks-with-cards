import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//Consts
const PORT = 5000;
const DB_URL = `mongodb+srv://admin:admin@cluster0.x9dzgnt.mongodb.net/blog-project?retryWrites=true&w=majority`;

import Deck from "./DeckSchema.js";

app.get("/get-decks", async (req, res) => {
  const result = await Deck.find();
  res.json(result || []);
});

app.post("/add-deck", async (req, res) => {
  const deck = await new Deck(req.body);
  const isExist = await Deck.findOne({ name: deck.name });
  if (isExist) return res.json({ message: "Deck already exist" });
  await deck.save();
  res.json(deck);
});

app.post("/delete-deck", async (req, res) => {
  const id = req.body.id;
  await Deck.findByIdAndDelete(id);
  res.json({ message: "Deleted" });
});

app.post("/deck/:deckId", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  await deck.cards.push({ name: req.body.name });
  await deck.save();
  res.json(deck);
});

app.get("/deck/:deckId", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  res.json(deck.cards);
});

mongoose.connect(DB_URL, () => {
  app.listen(PORT);
  console.log(`SERVER IS LIVE. Port:${PORT}`);
});
