import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';

interface SuggestionProps {
  suggestions: string[];
  onSelect: (city: string) => void;
}

const SearchSuggestions: React.FC<SuggestionProps> = ({
  suggestions,
  onSelect,
}) => {
  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.suggestionItem}
          onPress={() => onSelect(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  suggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default SearchSuggestions;
