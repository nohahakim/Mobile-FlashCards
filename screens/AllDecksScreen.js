import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const AllDecksScreen = ({ navigation }) => {
  const decks = useSelector((state) => state.decks.decks);
  const isFocused = useIsFocused();

  
  useEffect(() => {}, [isFocused, decks]);

  const handlePressDeck = (deckId) => {
    navigation.navigate('DeckDetailScreen', { deckId });
  };

  const renderItem = ({ item }) => {
    const deck = decks[item];
    return (
      <Pressable
        onPress={() => handlePressDeck(item)}
        style={styles.deckContainer}
      >
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(decks)}
        renderItem={renderItem}
        keyExtractor={(item) => `deck-${item}`}
        ListEmptyComponent={<Text>No decks available. Please add some decks.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  deckContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  deckCardCount: {
    fontSize: 16,
    color: 'grey',
  },
});

export default AllDecksScreen;