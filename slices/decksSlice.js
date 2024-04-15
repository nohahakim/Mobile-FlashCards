import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// Async thunk to load decks from AsyncStorage
export const loadDecks = createAsyncThunk('decks/loadDecks', async () => {
  const decks = await AsyncStorage.getItem('decks');
  return decks ? JSON.parse(decks) : {};
});

const initialState = {
  decks: {},
};

export const decksSlice = createSlice({
  name: 'decks',
  initialState,
  reducers: {
    setDecks: (state, action) => {
      state.decks = action.payload;
    },
    // addDeck: (state, action) => {
    //   const { title } = action.payload;
    //   const newDeckId = uuidv4();
    //   state.decks[newDeckId] = {
    //     id: newDeckId,
    //     title,
    //     questions: [],
    //   };
    //   AsyncStorage.setItem('decks', JSON.stringify(state.decks));
    // },
   
    addDeck: (state, action) => {
      const { id, title } = action.payload; // Accept the ID from the payload
      state.decks[id] = {
        id,
        title,
        questions: [],
      };
      AsyncStorage.setItem('decks', JSON.stringify(state.decks));
    },
    
    addCardToDeck: (state, action) => {
      const { deckId, card } = action.payload;
      state.decks[deckId].questions.push(card);
      AsyncStorage.setItem('decks', JSON.stringify(state.decks));
    },
    removeDeck: (state, action) => {
      const { deckId } = action.payload;
      delete state.decks[deckId];
      AsyncStorage.setItem('decks', JSON.stringify(state.decks));
    },
    
  },
  extraReducers: (builder) => {
    builder.addCase(loadDecks.fulfilled, (state, action) => {
      state.decks = action.payload;
    });
  },
});

// Actions and reducer export
export const { setDecks, addDeck, addCardToDeck, removeDeck } = decksSlice.actions;
export default decksSlice.reducer;


