// QuizScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { answerQuestion, resetQuiz } from "../slices/quizSlice";

const QuizScreen = ({ route, navigation }) => {
  const { deckId } = route.params;
  const deck = useSelector((state) => state.decks.decks[deckId]);
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    dispatch(resetQuiz());
  }, [deckId]);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }
    setShowAnswer(false);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  if (!deck) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (deck.questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>No cards in this deck.</Text>
      </View>
    );
  }

  if (currentQuestionIndex >= deck.questions.length) {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.header}>Quiz Complete!</Text>
          <Text style={styles.resultText}>
            You answered {correctAnswersCount} out of {deck.questions.length}{" "}
            questions correctly!
          </Text>
          <TouchableOpacity
            onPress={() => {
              setCurrentQuestionIndex(0);
              setCorrectAnswersCount(0);
            }}
            style={styles.button}
            accessibilityLabel="Restart Quiz"
          >
            <Text style={styles.buttonText}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
            accessibilityLabel="Back to Deck"
          >
            <Text style={styles.buttonText}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const currentQuestion = deck.questions[currentQuestionIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.questionCounter}>
          {currentQuestionIndex + 1} / {deck.questions.length}
        </Text>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {showAnswer && (
          <Text style={styles.answerText}>
            Answer: {currentQuestion.answer}
          </Text>
        )}
        <TouchableOpacity
          onPress={() => setShowAnswer(!showAnswer)}
          style={styles.showAnswerButton}
          accessibilityLabel="Show Answer"
        >
          <Text style={styles.showAnswerButtonText}>
            {showAnswer ? "Hide" : "Show"} Answer
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAnswer(true)}
          style={[styles.answerButton, styles.correctButton]}
          accessibilityLabel="Correct Answer"
        >
          <Text style={styles.buttonText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleAnswer(false)}
          style={[styles.answerButton, styles.incorrectButton]}
          accessibilityLabel="Incorrect Answer"
        >
          <Text style={styles.buttonText}>Incorrect</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    maxWidth: 500,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionCounter: {
    alignSelf: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 24,
    color: "#333333",
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "500",
  },
  answerText: {
    fontSize: 20,
    color: "#555555",
    marginVertical: 15,
    textAlign: "center",
  },
  header: {
    fontSize: 26,
    color: "#333333",
    marginBottom: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  resultText: {
    fontSize: 20,
    color: "#555555",
    marginBottom: 30,
    textAlign: "center",
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
  showAnswerButton: {
    marginBottom: 20,
  },
  showAnswerButtonText: {
    fontSize: 18,
    color: "#4ECDC4",
    fontWeight: "600",
  },
  answerButton: {
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  correctButton: {
    backgroundColor: "#2ECC71",
  },
  incorrectButton: {
    backgroundColor: "#E74C3C",
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: "#777777",
  },
});

export default QuizScreen;
