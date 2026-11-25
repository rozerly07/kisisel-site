# Claude Code görev listesi

Yöntem: Her sayfa önce Claude sohbetinde önizlemeyle tasarlanır, onaylanınca `referans/` klasörüne birebir kod olarak konur ve Claude Code onu KOPYALAR. Her görevi ayrı oturumda yapıştır (önce `/clear`).

| Görev | Sayfa | Durum |
|---|---|---|
| 0–1.5 | Kurulum, temel, görsel dil | ✅ |
| 2 | Anasayfa (giriş + kaydırma + sirkin içi + maskot) | ✅ |
| 3 | Projeler | ⏳ referans hazır, komut aşağıda |
| 4 | Galeri | önizleme bekliyor |
| 5 | Hakkımda | önizleme bekliyor |
| 6 | Blog + 3 yazı | önizleme bekliyor |
| 7 | İletişim | önizleme bekliyor |
| 8 | Impeccable denetimi | sonda |
| 9 | İngilizce sürüm | sonda |
| 10 | Teslim hazırlığı | sonda |

---

## Görev 3 — Projeler (kopyala)
`referans/projeler.html` dosyasını projenin `referans/` klasörüne koy, sonra:
```
referans/projeler.html onaylı Projeler sayfasının BİREBİR kodu (karo sahne, döner podyum, yörüngedeki kartlar, oyun paneli, kaydırmayla geçiş, detay penceresi). Yeniden çizme, KOPYALA.
1. tr/projects.html'i bu dosyanın kopyası yap. Stilleri assets/css/projeler.css, script'i assets/js/projeler.js içine taşıyabilirsin; hiçbir renk, ölçü, açı, koordinat, süre veya easing değerini değiştirme. Çakışma olursa sadece sınıf adına önek ekle.
2. Yer tutucu navbar ve footer'ı silip tr/index.html'deki ortak navbar, logo, mobil menü, perde geçişi, maskot (maskot.js: navbar modu, dolaşma, yazı yeme) ve footer ile değiştir. Navbarda "Projeler" aktif görünsün (aria-current="page"). TR · EN → ../en/projects.html.
3. projeler.js'in başındaki PROJELER listesini @content/ICERIK.md'den doldur: ad, kisa, uzun, rol, yil, link, gorseller (assets/img/projects içindeki WebP'ler; proje başına kaç tane varsa o kadar, en az 1), araclar (ad + 1–10 seviye). Boş alan bırakılırsa pencerede gizlenir; uydurma. Sondaki kilitli "??? YAKINDA" numarası kalsın.
4. Anasayfadaki proje kartları ve "tüm projeleri aç" linki tr/projects.html'e gitsin. Kart tıklanınca ilgili projeyi seçili açmak için tr/projects.html#proje-2 gibi bir adres kullan: sayfa açılınca o projeye kaydırıp seçsin.
5. Fontlar yerel dosyalardan (Pixelify Sans, VT323, Rubik Beastly, Space Grotesk). Türkçe karakterleri kontrol et.
Bitince 1440px ve 390px'te kontrol et: kaydırma, oklar, noktalar, klavye okları, SEÇ penceresi (ESC ile kapanma), telefonda sola-sağa kaydırma. En fazla 6 maddede özetle.
```

## Görev 4–7
Önizleme onaylanınca buraya "kopyala" komutu olarak yazılacak. Eski tarif metinlerini kullanma.

## Görev 8 — Tasarım denetimi (Impeccable)
Her sayfa için sırayla (gerekirse ayrı oturumlarda):
```
/impeccable critique tr/index.html
/impeccable audit tr/
/impeccable polish tr/gallery.html
```
Sonra:
```
Tüm tr/ sayfalarını 360px, 768px ve 1280px genişlikte kontrol et; taşan, üst üste binen ya da dokunmatikte çalışmayan her şeyi düzelt. Lighthouse erişilebilirlik ve performans sorunlarını listele ve düzelt.
```

## Görev 9 — İngilizce sürüm
```
tr/ içindeki tüm html dosyalarını en/ klasörüne kopyala. Sadece görünen metinleri, alt metinlerini, title ve meta description'ı İngilizceye çevir; lang="en" yap. Yapıya, sınıflara ve JS'e dokunma. components.js'deki navbar/footer metinlerini dile göre (document.documentElement.lang) seçecek şekilde ayarla. Dil değiştiricinin her sayfada karşılığına gittiğini test et.
```

## Görev 10 — Teslim hazırlığı
```
assets/img altındaki tüm görselleri WebP'ye çevir, en uzun kenar 1600px (galeri), 1200px (proje), 800px (vesikalık) olacak şekilde küçült, kalite ~80. Kullanılmayan dosyaları listele (silmeden önce bana sor). Toplam proje boyutunu raporla ve tüm linklerin file:// altında çalıştığını kontrol et.
```
Sonra zip: proje klasörüne sağ tık → sıkıştır (.git klasörünü hariç tutmayı unutma).