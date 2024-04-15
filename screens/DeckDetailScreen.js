import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeDeck } from '../slices/decksSlice';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deckId } = route.params;
  const deck = useSelector((state) => state.decks.decks[deckId]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!deck) {
      navigation.goBack();
    }
  }, [deck, navigation]);

  const handleDeleteDeck = () => {
    Alert.alert(
      "Delete Deck",
      "Are you sure you want to delete this deck?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => deleteDeckConfirm() }
      ]
    );
  };

  const deleteDeckConfirm = async () => {
    console.log("Deleting deck:", deckId);

    dispatch(removeDeck({ deckId }));
    navigation.goBack();
  };


  if (!deck) {
    return <View style={styles.container}><Text>Loading deck...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{deck.title}</Text>
      <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddFlashcardScreen', { deckId })}
      >
        <Text style={styles.buttonText}>Add Card</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.quizButton]}
        onPress={() => navigation.navigate('QuizScreen', { deckId })}
      >
        <Text style={styles.buttonText}>Start Quiz</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.deleteButton]}
        // onPress={handleDeleteDeck}
        onPress={deleteDeckConfirm}
      >
        <Text style={styles.buttonText}>Delete Deck</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardCount: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: 10,
  },
  quizButton: {
    backgroundColor: "#556B2F",
  },
  deleteButton: {
    backgroundColor: "#B22222",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});

export default DeckDetailScreen;
