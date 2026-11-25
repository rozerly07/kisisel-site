# Claude Code görev listesi

Yöntem: Her sayfa önce Claude sohbetinde önizlemeyle tasarlanır, onaylanınca `referans/` klasörüne birebir kod olarak konur ve Claude Code onu KOPYALAR. Her görevi ayrı oturumda yapıştır (önce `/clear`).

| Görev | Sayfa | Durum |
|---|---|---|
| 0–1.5 | Kurulum, temel, görsel dil | ✅ |
| 2 | Anasayfa (giriş + kaydırma + sirkin içi + maskot) | ✅ |
| 3 | Projeler | ✅ |
| 4 | Galeri + ortak karo duvar + imleç | ✅ (Görev 4 bittiyse) |
| 5 | Hakkımda | ⏳ referans hazır, komut aşağıda |
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

## Görev 4 — Galeri + ortak karo duvar + imleç (kopyala)
`referans/` klasörüne şunları koy: `galeri.html`, `karo-duvar.js`, `imlec/imlec.svg`, `imlec/imlec-el.svg`. Sonra:
```
0. Kalıcı kural: bundan sonra hiçbir görevde ekran görüntüsü alma. Kontrol için sadece sayfaları açıp konsolda hata olup olmadığına bak. Bu kuralı CLAUDE.md'nin "Çalışma kuralları" bölümüne ekle.

1. Galeri: referans/galeri.html onaylı Galeri sayfasının BİREBİR kodu. Yeniden çizme, KOPYALA.
   - tr/gallery.html'i bu dosyanın kopyası yap. Stiller assets/css/galeri.css, script assets/js/galeri.js. Hiçbir renk, ölçü, açı, koordinat, süre veya easing değerini değiştirme. Çakışmada sadece önek ekle.
   - Yer tutucu navbar ve footer yerine sitenin ortak navbar, logo, mobil menü, perde geçişi, maskot ve imzalı footer'ı gelsin. "Galeri" linki aktif olsun. TR · EN → ../en/gallery.html.
   - galeri.js'teki GALERI listesini @content/ICERIK.md'deki galeri fotoğraflarıyla doldur (assets/img/gallery WebP'leri; alt ve aciklama ICERIK'ten; renk alanı yedek olarak kalsın).

2. Ortak karo duvar: referans/karo-duvar.js'i assets/js/karo-duvar.js olarak kopyala (değiştirmeden).
   - Galeri onu yukarıdaki ayarlarla kullanıyor.
   - Anasayfadaki eski karo duvar kodunu (anasayfa.js'teki GALERI/yuvalar/duvarCiz bölümü ve karoların üstündeki cam parlaklığı ve gölge katmanı) kaldır. Yerine aynı #karo-duvar kutusuna şunu kur:
     KaroDuvar(document.getElementById('karo-duvar'), { fotolar: GALERI, adim: 26, kosegen: 21.8, xMax: 1.5,
       yildiz: { boyutYatay: 1.6, boyutCapraz: 1.1, renk: '#D9C2FF', parilti: 'rgba(127,231,255,.85)' },
       tikla: function (i) { location.href = 'gallery.html#foto-' + (i + 1); } });
     Böylece anasayfada köşeler keskin, cam efekti yok, parıltılar daha küçük ve lila-camgöbeği renkte olur. Anasayfadaki karoya tıklayınca galeri o fotoğraf açık şekilde gelir.
   - Anasayfa ve galeri aynı fotoğraf listesini kullansın: listeyi tek bir yerde tut (ör. assets/js/galeri-veri.js) ve iki sayfa da onu yüklesin.

3. İmleç (bütün sayfalar): imlec.svg ve imlec-el.svg'yi assets/img/imlec/ içine koy. galeri.html'deki "SİTE GENELİ İMLEÇ" kurallarını (hotspot 16 16) ortak CSS'e (tokens.css ya da base.css) taşı, yolları buna göre düzelt. Bütün tr/ sayfalarında çalışsın.

4. CLAUDE.md'ye Galeri, ortak karo duvar ve imleç bilgilerini ekle.

Bitince sayfaları açıp sadece konsol hatası kontrol et. En fazla 6 maddede özetle.
```

## Görev 5 — Hakkımda (kopyala)
`referans/hakkimda.html` dosyasını `referans/` klasörüne koy, sonra:
```
referans/hakkimda.html onaylı Hakkımda sayfasının BİREBİR kodu (süslü çerçeveli vesikalık + özgeçmiş, cambaz ipi eğitim, güç ölçer yetenekler, hokkabaz topları ilgi alanları). Yeniden çizme, KOPYALA.
1. tr/about.html'i bu dosyanın kopyası yap. Stiller assets/css/hakkimda.css, script assets/js/hakkimda.js. Hiçbir renk, ölçü, açı, koordinat, süre veya easing değerini değiştirme; çakışmada sadece önek ekle. Vesikalık çerçevesinin süs SVG'si anasayfadakiyle aynı: ortak bir yere almak istersen al, ama değerleri değiştirme.
2. Yer tutucu navbar ve footer yerine sitenin ortak navbar, logo, mobil menü, perde geçişi, maskot, imleç ve imzalı footer'ı gelsin. "Hakkımda" linki aktif. TR · EN → ../en/about.html.
3. İçerik @content/ICERIK.md'den: [VESİKALIK] → anasayfadaki vesika WebP'si (aynı object-position); kurdeledeki [ADIN] → adım (büyük harf, anasayfadaki gibi); özgeçmiş paragrafı; üç etiket (şehir, bölüm/okul, şu an ne yaptığım — ICERIK'te karşılığı yoksa o etiketi kaldır); hakkimda.js'teki EGITIM, YETENEK (ad + 1–10) ve ILGI listeleri. Uydurma; ICERIK'te olmayan bir şey varsa bana listele.
4. Anasayfadaki "Hikâyemin tamamı" düğmesi tr/about.html'e gitsin.
Bitince sayfayı açıp sadece konsol hatası kontrol et. En fazla 5 maddede özetle.
```

## Görev 6–7
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
