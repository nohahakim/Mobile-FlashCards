
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addDeck } from '../slices/decksSlice';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator if not already imported


const AddDeckScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch() 

const handleSubmit = async () => {
  if (!title.trim()) {
    alert('Please enter the title of the deck.');
    return;
  }

  const newDeckId = uuidv4(); // Generate the new deck's ID
  await dispatch(addDeck({ id: newDeckId, title })); // Dispatch the action with the ID and title

  setTitle(''); // Reset the title state
  navigation.navigate('DeckDetailScreen', { deckId: newDeckId }); // Navigate to the detail screen with the new deck ID
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Deck</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Deck Title"
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
    margin: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'stretch',
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddDeckScreen;
