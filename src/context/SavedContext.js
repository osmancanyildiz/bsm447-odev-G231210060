import { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'saved';
const SavedContext = createContext(null);

export function SavedProvider({ children }) {
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Uygulama açılınca kayıtları telefondan oku
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((json) => {
        if (json) setSaved(JSON.parse(json));
      })
      .finally(() => setLoaded(true));
  }, []);

  // Liste her değiştiğinde telefona yaz (ilk okuma bitmeden yazma)
  useEffect(() => {
    if (loaded) AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved, loaded]);

  const isSaved = (id) => saved.some((item) => item.id === id);

  const toggleSaved = (character) => {
    setSaved((current) =>
      current.some((item) => item.id === character.id)
        ? current.filter((item) => item.id !== character.id)
        : [...current, character]
    );
  };

  return (
    <SavedContext.Provider value={{ saved, isSaved, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  return useContext(SavedContext);
}
