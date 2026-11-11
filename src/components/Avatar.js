import { Image, StyleSheet, Text, View } from 'react-native';
import { getHouseColor, getInitials } from '../utils/format';

// Görsel varsa resmi, yoksa adın baş harflerini daire içinde gösterir
export default function Avatar({ character, size = 56 }) {
  const color = getHouseColor(character.house);
  const shape = { width: size, height: size, borderRadius: size / 2 };

  if (character.image) {
    return <Image source={{ uri: character.image }} style={[styles.image, shape]} />;
  }
  return (
    <View style={[styles.initials, shape, { backgroundColor: color.main }]}>
      <Text style={[styles.initialsText, { fontSize: size * 0.38, color: color.light }]}>
        {getInitials(character.name)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: { backgroundColor: '#ddd' },
  initials: { alignItems: 'center', justifyContent: 'center' },
  initialsText: { fontWeight: 'bold' },
});
