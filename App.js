import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { store } from './store';
// import React from 'react';
import React, { useEffect } from 'react';
import { loadDecks } from './slices/decksSlice'; // Ensure correct path
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AllDecksScreen from './screens/AllDecksScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import AddFlashcardScreen from './screens/AddFlashcardScreen';
import QuizScreen from './screens/QuizScreen';
import AddDeckScreen from './screens/AddDeckScreen';
import QuizResultScreen from './screens/QuizResultScreen';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
      <Stack.Screen name="DeckDetailScreen" component={DeckDetailScreen} options={({ route }) => ({ title: route.params.deckTitle })} />
      <Stack.Screen name="AddFlashcardScreen" component={AddFlashcardScreen} options={{ title: 'Add Card' }} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="QuizResultScreen" component={QuizResultScreen} options={{ title: 'Quiz Result' }} />

    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'AllDecksScreen') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'AddDeckScreen') {
            iconName = focused ? 'ios-add-circle' : 'ios-add-circle-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="AllDecksScreen" component={AllDecksScreen} options={{ title: 'Decks' }} />
      <Tab.Screen name="AddDeckScreen" component={AddDeckScreen} options={{ title: 'Add Deck' }} />
    </Tab.Navigator>
  );
}

function App() {
  useEffect(() => {
    store.dispatch(loadDecks());
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </Provider>
  );
}

export default App;



/////old code//////////////////////////
// import { StatusBar } from 'expo-status-bar';
// import { Provider } from 'react-redux';
// import { store } from './store';
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import AllDecksScreen from './screens/AllDecksScreen';
// import DeckDetailScreen from './screens/DeckDetailScreen';
// import AddFlashcardScreen from './screens/AddFlashcardScreen';
// import QuizScreen from './screens/QuizScreen';
// import AddDeckScreen from './screens/AddDeckScreen';
// import { Ionicons } from '@expo/vector-icons'; // make sure to install expo-vector-icons

// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// // You can create a separate stack navigator for each tab if needed
// function DecksStack() {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="DeckList" component={AllDecksScreen} options={{ title: 'Decks' }} />
//       {/* Add more screens if needed */}
     
//         <Stack.Screen
//           name="IndividualDeck"
//           component={DeckDetailScreen}
//           options={({ route }) => ({ title: route.params.deckTitle })}
//         />
//         <Stack.Screen
//           name="AddFlashcard"
//           component={AddFlashcardScreen}
//           options={{ title: 'Add Card' }}
//         />
//         <Stack.Screen
//           name="Quiz"
//           component={QuizScreen}
//           options={{ title: 'Quiz' }}
//         />
      
//     </Stack.Navigator>
//   );
// }

// // Root component for tabs
// function RootTabNavigator() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: route.name === "AddDeck",
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Decks') {
//             iconName = focused ? 'list' : 'list-outline'; // Corrected icon names
//           } else if (route.name === 'AddDeck') {
//             iconName = focused ? 'add-circle' : 'add-circle-outline'; // Corrected icon names
//           }
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'tomato', // Moved here from tabBarOptions
//         tabBarInactiveTintColor: 'gray', // Moved here from tabBarOptions
//         tabBarStyle: [{ display: "flex" }, null], // Moved here from tabBarOptions
        
        
//       })}
//     >
//       <Tab.Screen name="Decks" component={DecksStack} />
//       <Tab.Screen name="AddDeck" component={AddDeckScreen} />
//     </Tab.Navigator>
//   );
// }


// function App() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <RootTabNavigator />
//       </NavigationContainer>
//     </Provider>
//   );
// }
// export default App;