// import AsyncStorage from '@react-native-async-storage/async-storage';
// import dummyData from './dummyData';

// export const getDecks = async () => {
//   try {
//     let decks = await AsyncStorage.getItem('decks');
//     if (decks === null) {
//       decks = dummyData;
//       await AsyncStorage.setItem('decks', JSON.stringify(dummyData));
//     } else {
//       decks = JSON.parse(decks);
//     }
//     return decks;
//   } catch (error) {
//     console.error('Error getting decks: ', error);
//   }
// };

// export const getDeck = async (id) => {
//   try {
//     const decks = await getDecks();
//     return decks[id];
//   } catch (error) {
//     console.error('Error getting a single deck: ', error);
//   }
// };

// export const saveDeckTitle = async (title) => {
//   try {
//     const newDeck = {
//       [title]: {
//         title,
//         questions: [],
//       },
//     };
//     const decks = await getDecks();
//     await AsyncStorage.setItem('decks', JSON.stringify({
//       ...decks,
//       ...newDeck,
//     }));
//   } catch (error) {
//     console.error('Error saving deck title: ', error);
//   }
// };

// export const addCardToDeck = async (title, card) => {
//   try {
//     const decks = await getDecks();
//     const deck = decks[title];
//     if (deck) {
//       deck.questions.push(card);
//       await AsyncStorage.setItem('decks', JSON.stringify(decks));
//     }
//   } catch (error) {
//     console.error('Error adding card to deck: ', error);
//   }
// };

// export const deleteDeck = async (title) => {
//   try {
//     const decks = await getDecks(); // Fetch the current decks
//     delete decks[title]; // Delete the specified deck
//     await AsyncStorage.setItem('decks', JSON.stringify(decks)); // Save the updated decks object
//   } catch (error) {
//     console.error('Error removing deck: ', error);
//   }
// };


// utils/asyncStorageAPI.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getDecks = async () => {
  try {
    let decks = await AsyncStorage.getItem('decks');
    if (decks === null) {
      decks = {};
      await AsyncStorage.setItem('decks', JSON.stringify({}));
    } else {
      decks = JSON.parse(decks);
    }
    return decks;
  } catch (error) {
    console.error('Error getting decks: ', error);
  }
};

export const getDeck = async (id) => {
  try {
    const decks = await getDecks();
    return decks[id];
  } catch (error) {
    console.error('Error getting a single deck: ', error);
  }
};

export const saveDeckTitle = async (title) => {
  try {
    const newDeckId = Date.now().toString();
    console.log(newDeckId)
    const newDeck = {
      [newDeckId]: {
        id: newDeckId,
        title,
        questions: [],
      },
    };
    const decks = await getDecks();
    await AsyncStorage.setItem('decks', JSON.stringify({
      ...decks,
      ...newDeck,
    }));
    return newDeckId; // Return the new deck's ID
  } catch (error) {
    console.error('Error saving deck title: ', error);
  }
};

export const addCardToDeck = async (deckId, card) => {
  try {
    const decks = await getDecks();
    const deck = decks[deckId];
    if (deck) {
      deck.questions.push(card);
      await AsyncStorage.setItem('decks', JSON.stringify(decks));
    }
  } catch (error) {
    console.error('Error adding card to deck: ', error);
  }
};

export const deleteDeck = async (deckId) => {
  try {
    const decks = await getDecks();
    delete decks[deckId];
    await AsyncStorage.setItem('decks', JSON.stringify(decks));
  } catch (error) {
    console.error('Error removing deck: ', error);
  }
};

// slices/decksSlice.js

// slices/quizSlice.js
