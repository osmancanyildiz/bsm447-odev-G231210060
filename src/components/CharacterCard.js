import { Pressable, StyleSheet, Text, View } from 'react-native';
import Avatar from './Avatar';
import { getHouseColor } from '../utils/format';

// Listede bir satır: avatar + ad + bina; kart rengi binaya göre
export default function CharacterCard({ character, onPress }) {
  const color = getHouseColor(character.house);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { backgroundColor: color.light, borderLeftColor: color.main }]}
    >
      <Avatar character={character} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: color.main }]}>{character.name}</Text>
        {character.house ? (
          <Text style={[styles.house, { color: color.accent }]}>{character.house}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    borderLeftWidth: 6,
  },
  info: { marginLeft: 12, flex: 1 },
  name: { fontSize: 17, fontWeight: 'bold' },
  house: { fontSize: 14, marginTop: 2 },
});
