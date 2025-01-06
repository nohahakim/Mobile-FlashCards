// decksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadDecks = createAsyncThunk("decks/loadDecks", async () => {
  const decks = await AsyncStorage.getItem("decks");
  return decks ? JSON.parse(decks) : {};
});

const initialState = {
  decks: {},
};

export const decksSlice = createSlice({
  name: "decks",
  initialState,
  reducers: {
    setDecks: (state, action) => {
      state.decks = action.payload;
    },
    addDeck: (state, action) => {
      const { id, title } = action.payload;
      state.decks[id] = {
        id,
        title,
        questions: [],
      };
      AsyncStorage.setItem("decks", JSON.stringify(state.decks));
    },
    addCardToDeck: (state, action) => {
      const { deckId, card } = action.payload;
      state.decks[deckId].questions.push(card);
      AsyncStorage.setItem("decks", JSON.stringify(state.decks));
    },
    removeDeck: (state, action) => {
      const { deckId } = action.payload;
      delete state.decks[deckId];
      AsyncStorage.setItem("decks", JSON.stringify(state.decks));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadDecks.fulfilled, (state, action) => {
      state.decks = action.payload;
    });
  },
});

export const { setDecks, addDeck, addCardToDeck, removeDeck } =
  decksSlice.actions;
export default decksSlice.reducer;
