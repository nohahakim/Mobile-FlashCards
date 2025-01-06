import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeDeck } from "../slices/decksSlice";

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
    Alert.alert("Delete Deck", "Are you sure you want to delete this deck?", [
      { text: "Cancel", style: "cancel" },
      { text: "OK", onPress: () => deleteDeckConfirm() },
    ]);
  };

  const deleteDeckConfirm = async () => {
    dispatch(removeDeck({ deckId }));
    navigation.goBack();
  };

  if (!deck) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading deck...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cardCount}>{deck.questions.length} cards</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddFlashcardScreen", { deckId })}
          accessibilityLabel="Add Card"
        >
          <Text style={styles.buttonText}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.quizButton]}
          onPress={() => navigation.navigate("QuizScreen", { deckId })}
          accessibilityLabel="Start Quiz"
        >
          <Text style={styles.buttonText}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          // onPress={handleDeleteDeck}
          onPress={deleteDeckConfirm}
          accessibilityLabel="Delete Deck"
        >
          <Text style={styles.buttonText}>Delete Deck</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    color: "#333333",
    marginBottom: 10,
    fontWeight: "700",
  },
  cardCount: {
    fontSize: 18,
    color: "#777777",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  quizButton: {
    backgroundColor: "#556B2F",
  },
  deleteButton: {
    backgroundColor: "#B22222",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#777777",
  },
});

export default DeckDetailScreen;
