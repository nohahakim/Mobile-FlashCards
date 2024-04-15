// QuizResultScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuiz } from '../slices/quizSlice';

const QuizResultScreen = ({ navigation }) => {
  const { correctAnswersCount, answeredQuestionsCount } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const handleRestartQuiz = () => {
    dispatch(resetQuiz());
    navigation.pop(1); // Assuming QuizScreen is two screens back
  };

  const handleBackToDeck = () => {
    dispatch(resetQuiz());
    navigation.pop(3); // Assuming Individual Deck view is three screens back
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Quiz Complete!</Text>
      <Text style={styles.result}>Your Score: {`${correctAnswersCount}/${answeredQuestionsCount}`}</Text>
      <TouchableOpacity onPress={handleRestartQuiz} style={styles.button}>
        <Text>Restart Quiz</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToDeck} style={styles.button}>
        <Text>Back to Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  result: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    margin: 10,
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});

export default QuizResultScreen;
