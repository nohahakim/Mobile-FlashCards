// AllDecksScreen.js
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

const AllDecksScreen = ({ navigation }) => {
  const decks = useSelector((state) => state.decks.decks);
  const isFocused = useIsFocused();

  useEffect(() => {}, [isFocused, decks]);

  const handlePressDeck = (deckId) => {
    navigation.navigate("DeckDetailScreen", { deckId });
  };

  const renderItem = ({ item }) => {
    const deck = decks[item];
    return (
      <TouchableOpacity
        onPress={() => handlePressDeck(item)}
        style={styles.deckContainer}
        accessibilityLabel={`Deck ${deck.title}`}
      >
        <Text style={styles.deckTitle}>{deck.title}</Text>
        <Text style={styles.deckCardCount}>{deck.questions.length} cards</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.keys(decks)}
        renderItem={renderItem}
        keyExtractor={(item) => `deck-${item}`}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No decks available. Please add some decks.
          </Text>
        }
        contentContainerStyle={
          decks && Object.keys(decks).length > 0 ? null : styles.emptyContainer
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7",
    padding: 20,
  },
  deckContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  deckTitle: {
    fontSize: 20,
    color: "#333333",
    fontWeight: "600",
    marginBottom: 5,
  },
  deckCardCount: {
    fontSize: 16,
    color: "#777777",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#777777",
    textAlign: "center",
  },
});

export default AllDecksScreen;
