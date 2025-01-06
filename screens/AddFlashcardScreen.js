// AddFlashCardScreen.js
import React, { useState, useEffect } from "react";
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
import { addCardToDeck } from "../slices/decksSlice";
import { useIsFocused } from "@react-navigation/native";

const AddFlashCardScreen = ({ route, navigation }) => {
  const { deckId } = route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setQuestion("");
      setAnswer("");
    }
  }, [isFocused]);

  const handleSubmit = async () => {
    if (!question.trim() || !answer.trim()) {
      alert("Please fill out both the question and answer fields.");
      return;
    }
    const card = { question, answer };
    dispatch(addCardToDeck({ deckId, card }));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Add a Flashcard</Text>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Question"
          style={styles.input}
          placeholderTextColor="#888"
          accessibilityLabel="Question Input"
        />
        <TextInput
          value={answer}
          onChangeText={setAnswer}
          placeholder="Answer"
          style={styles.input}
          placeholderTextColor="#888"
          accessibilityLabel="Answer Input"
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          accessibilityLabel="Submit Flashcard"
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

export default AddFlashCardScreen;
