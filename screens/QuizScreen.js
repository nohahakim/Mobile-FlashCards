// QuizScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion, resetQuiz } from '../slices/quizSlice';

function QuizScreen({ route, navigation }) {
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
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (deck.questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No cards in this deck.</Text>
      </View>
    );
  }

  if (currentQuestionIndex >= deck.questions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Quiz Complete!</Text>
        <Text style={styles.resultText}>
          You answered {correctAnswersCount} out of {deck.questions.length} questions correctly!
        </Text>
        <Pressable
          onPress={() => {
            setCurrentQuestionIndex(0);
            setCorrectAnswersCount(0);
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Restart Quiz</Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Back to Deck</Text>
        </Pressable>
      </View>
    );
  }

  const currentQuestion = deck.questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionCounter}>
        {currentQuestionIndex + 1} / {deck.questions.length}
      </Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      {showAnswer && <Text style={styles.answerText}>Answer: {currentQuestion.answer}</Text>}
      <Pressable
        onPress={() => setShowAnswer(!showAnswer)}
        style={styles.showAnswerButton}
      >
        <Text style={styles.showAnswerButtonText}>{showAnswer ? 'Hide' : 'Show'} Answer</Text>
      </Pressable>
      <Pressable
        onPress={() => handleAnswer(true)}
        style={[styles.answerButton, styles.correctButton]}
      >
        <Text style={styles.buttonText}>Correct</Text>
      </Pressable>
      <Pressable
        onPress={() => handleAnswer(false)}
        style={[styles.answerButton, styles.incorrectButton]}
      >
        <Text style={styles.buttonText}>Incorrect</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionCounter: {
    alignSelf: 'flex-start',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
  answerText: {
    fontSize: 20,
    color: 'darkred',
    margin: 15,
    textAlign: 'center',
  },
  header: {
    fontSize: 30,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 24,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    margin: 10,
    minWidth: 150,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  showAnswerButton: {
    marginBottom: 20,
  },
  showAnswerButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
  answerButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    minWidth: 150,
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: 'green',
  },
  incorrectButton: {
    backgroundColor: 'red',
  },
});

export default QuizScreen;
