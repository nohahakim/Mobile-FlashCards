// QuizResultScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../slices/quizSlice";

const QuizResultScreen = ({ navigation }) => {
  const { correctAnswersCount, answeredQuestionsCount } = useSelector(
    (state) => state.quiz
  );
  const dispatch = useDispatch();

  const handleRestartQuiz = () => {
    dispatch(resetQuiz());
    navigation.pop(1);
  };

  const handleBackToDeck = () => {
    dispatch(resetQuiz());
    navigation.pop(3);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Quiz Complete!</Text>
        <Text style={styles.result}>
          Your Score: {correctAnswersCount}/{answeredQuestionsCount}
        </Text>
        <TouchableOpacity
          onPress={handleRestartQuiz}
          style={styles.button}
          accessibilityLabel="Restart Quiz"
        >
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleBackToDeck}
          style={styles.button}
          accessibilityLabel="Back to Deck"
        >
          <Text style={styles.buttonText}>Back to Deck</Text>
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
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    fontSize: 26,
    color: "#333333",
    marginBottom: 20,
    fontWeight: "700",
  },
  result: {
    fontSize: 20,
    color: "#555555",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#4ECDC4",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default QuizResultScreen;
