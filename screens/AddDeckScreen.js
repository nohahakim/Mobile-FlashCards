// AddDeckScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useDispatch } from "react-redux";
import { addDeck } from "../slices/decksSlice";
import { v4 as uuidv4 } from "uuid";

const AddDeckScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Please enter the title of the deck.");
      return;
    }
    const newDeckId = uuidv4();
    await dispatch(addDeck({ id: newDeckId, title }));
    setTitle("");
    navigation.navigate("DeckDetailScreen", { deckId: newDeckId });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Create a New Deck</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Deck Title"
          style={styles.input}
          placeholderTextColor="#888"
          accessibilityLabel="Deck Title Input"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          accessibilityLabel="Submit Deck"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    color: "#333333",
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    color: "#333333",
  },
  button: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AddDeckScreen;
