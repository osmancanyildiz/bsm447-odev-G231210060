import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View,
} from 'react-native';
import CharacterCard from '../components/CharacterCard';
import { API_URL, FALLBACK_URL } from '../utils/format';

// Önce asıl API; çalışmazsa aynı verinin GitHub dosyasından Ravenclaw'ları süz
async function fetchCharacters() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('API hatası');
    return await response.json();
  } catch {
    const response = await fetch(FALLBACK_URL);
    if (!response.ok) throw new Error('Veri alınamadı');
    const all = await response.json();
    return all.filter((item) => item.house === 'Ravenclaw');
  }
}

export default function ListScreen({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    setError(null);
    try {
      const data = await fetchCharacters();
      setCharacters(data);
    } catch (e) {
      setError('Veri yüklenemedi. İnternet bağlantınızı kontrol edin.');
    }
  };

  // İlk açılış
  useEffect(() => {
    loadData().finally(() => setLoading(false));
  }, []);

  // Ek kural 1: aşağı çekince yenileme
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Arama büyük/küçük harfe duyarsız
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('tr-TR');
    return characters.filter((item) =>
      item.name.toLocaleLowerCase('tr-TR').includes(query)
    );
  }, [characters, search]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F3A93" />
        <Text style={styles.message}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error && characters.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.message}>{error}</Text>
        <Pressable
          style={styles.retry}
          onPress={() => {
            setLoading(true);
            loadData().finally(() => setLoading(false));
          }}
        >
          <Text style={styles.retryText}>Tekrar dene</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Karakter ara..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
            onPress={() => navigation.navigate('Detail', { character: item })}
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={<Text style={styles.message}>Sonuç bulunamadı</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  search: {
    margin: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
  },
  message: { textAlign: 'center', marginTop: 16, fontSize: 16, color: '#555' },
  retry: {
    marginTop: 16,
    backgroundColor: '#1F3A93',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: 'bold' },
});
