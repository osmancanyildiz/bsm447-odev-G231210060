import { FlatList, StyleSheet, Text, View } from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { useSaved } from '../context/SavedContext';

export default function SavedScreen({ navigation }) {
  const { saved } = useSaved();

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('Detail', { character: item })}
          />
        )}
        contentContainerStyle={{ paddingVertical: 6 }}
        ListEmptyComponent={<Text style={styles.empty}>Henüz kayıt yok</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
});
