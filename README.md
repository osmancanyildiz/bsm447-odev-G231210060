# Kuzgunpençe Yuvası — BSM447 Dönem Ödevi

| | |
|---|---|
| **Öğrenci no** | G231210060 |
| **Konu** | K25 · Büyücülük Okulu (HP-API) |
| **Varyant** | c · Ravenclaw |
| **Ek kural** | 1 · Aşağı çekince yenileme |
| **Kalıcı veri** | AsyncStorage (`@react-native-async-storage/async-storage`) |

## Ekranlar
- **Liste:** Ravenclaw karakterleri, arama kutusu (büyük/küçük harf duyarsız), aşağı çekince yenileme.
- **Detay:** oyuncu, tür, doğum tarihi, patronus, asa (tek satırda); boş alanlar gösterilmez; Kaydet / Kaydedilenlerden çıkar.
- **Kaydedilenler:** uygulama kapatılıp açılınca yerinde durur.

Konuya özel: görseli olmayan karakterlerde baş harflerden avatar, asa tek satırda (ör. "Söğüt, tek boynuzlu at kılı, 10,75 inç"), binaya göre kart rengi.

## API
`https://hp-api.onrender.com/api/characters/house/ravenclaw`

> Not: Bu adres geliştirme sırasında (Kasım 2026) "Service Suspended" (503) döndürüyordu. Uygulama önce bu adresi dener; çalışmazsa aynı API'nin GitHub deposundaki veri dosyasını
> (`https://raw.githubusercontent.com/KostaSav/hp-api/master/data/characters.json`) çalışma anında çekip `house === "Ravenclaw"` ile süzer.

## Ekran görüntüleri
| Liste | Detay | Kaydedilenler |
|---|---|---|
| ![Liste](screenshots/liste.png) | ![Detay](screenshots/detay.png) | ![Kaydedilenler](screenshots/kaydedilenler.png) |

## Bağlantılar
- **APK:** _(EAS build bağlantısı eklenecek)_
- **Ekran kaydı (≤1 dk):** _(bağlantı eklenecek)_

## Çalıştırma
```bash
npm install
npx expo start
```
APK: `eas build -p android --profile preview`
