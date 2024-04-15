// // src/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import decksReducer from './slices/decksSlice';
// import quizReducer from './slices/quizSlice.js';
// import notificationsReducer from './slices/notificationsSlice'

// export const store = configureStore({
//   reducer: {
//     decks: decksReducer,
//     quiz: quizReducer,
//     notifications: notificationsReducer,
//   },
// });

import { configureStore } from '@reduxjs/toolkit';
import decksReducer, { loadDecks } from './slices/decksSlice';
import quizReducer from './slices/quizSlice.js';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    decks: decksReducer,
    quiz: quizReducer,
    notifications: notificationsReducer,
  },
});

// Load decks from AsyncStorage when the store is created
store.dispatch(loadDecks());