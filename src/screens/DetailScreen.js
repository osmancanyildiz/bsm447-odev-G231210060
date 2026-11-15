import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Avatar from '../components/Avatar';
import { useSaved } from '../context/SavedContext';
import { formatWand, getHouseColor, isEmpty } from '../utils/format';

export default function DetailScreen({ route }) {
  // Kayıt navigasyon parametresiyle gelir
  const { character } = route.params;
  const { isSaved, toggleSaved } = useSaved();
  const color = getHouseColor(character.house);
  const saved = isSaved(character.id);

  // Gösterilecek alanlar; boş olanlar filtrelenir
  const fields = [
    { label: 'Oyuncu', value: character.actor },
    { label: 'Tür', value: character.species },
    { label: 'Doğum tarihi', value: character.dateOfBirth },
    { label: 'Patronus', value: character.patronus },
    { label: 'Asa', value: formatWand(character.wand) },
  ].filter((field) => !isEmpty(field.value));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={[styles.header, { backgroundColor: color.light, borderColor: color.main }]}>
        <Avatar character={character} size={120} />
        <Text style={[styles.name, { color: color.main }]}>{character.name}</Text>
        {character.house ? (
          <Text style={[styles.house, { color: color.accent }]}>{character.house}</Text>
        ) : null}
      </View>

      {fields.map((field) => (
        <View key={field.label} style={styles.row}>
          <Text style={styles.label}>{field.label}</Text>
          <Text style={styles.value}>{field.value}</Text>
        </View>
      ))}

      <Pressable
        style={[styles.button, { backgroundColor: saved ? '#888' : color.main }]}
        onPress={() => toggleSaved(character)}
      >
        <Text style={styles.buttonText}>{saved ? 'Kaydedilenlerden çıkar' : 'Kaydet'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  header: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  name: { fontSize: 24, fontWeight: 'bold', marginTop: 12, textAlign: 'center' },
  house: { fontSize: 16, marginTop: 4 },
  row: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  label: { fontSize: 13, color: '#888' },
  value: { fontSize: 17, marginTop: 2 },
  button: { marginTop: 24, padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
