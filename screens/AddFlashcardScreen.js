import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addCardToDeck } from '../slices/decksSlice';
import { useIsFocused } from '@react-navigation/native';

const AddFlashCardScreen = ({ route, navigation }) => {
  const { deckId } = route.params;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setQuestion('');
      setAnswer('');
    }
  }, [isFocused]);

  const handleSubmit = async () => {
    if (!question || !answer) {
      alert('Please fill out both the question and answer fields.');
      return;
    }

    const card = { question, answer };
    dispatch(addCardToDeck({ deckId, card }));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Flashcard</Text>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Question"
        style={styles.input}
      />
      <TextInput
        value={answer}
        onChangeText={setAnswer}
        placeholder="Answer"
        style={styles.input}
      />
      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    alignSelf: 'stretch',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddFlashCardScreen;