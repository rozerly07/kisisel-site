# Claude Code görev listesi

Kullanım: her görevi **ayrı bir oturumda** yapıştır. Görev bitince kontrol et, beğendiysen git commit at, sonra `/clear` ile temizle ve sonrakine geç. CLAUDE.md her oturumda otomatik okunur, o yüzden komutlar kısa.

İpucu: rutin işlerde (Görev 5, 6, 9, 10) daha hafif bir model seçmek token tasarrufu sağlar; animasyonlu ağır görevlerde (1, 2, 3, 4) güçlü modeli kullan (`/model`).

---

## Görev 0 — Kurulum (elle, terminalde)
```
mkdir kisisel-site && cd kisisel-site && git init
npx skills add pbakaus/impeccable
```
CLAUDE.md'yi ve `content/ICERIK.md`'yi proje köküne/klasörüne koy. Sonra Claude Code'da:
```
/impeccable teach
```
Sorulara cevap verirken "Cevapların çoğu CLAUDE.md'de, oradan al" de.

---

## Görev 1 — Temel + global bileşenler + gişe
```
CLAUDE.md'ye göre projenin temelini kur:
1. Klasör yapısını oluştur. GSAP ve ScrollTrigger min dosyalarını assets/js/vendor/ içine indir. Seçtiğin 3 fontu woff2 olarak assets/fonts/ içine indir, Türkçe karakter desteğini doğrula.
2. tokens.css, base.css, components.css yaz.
3. components.js: navbar (maskot Bilet'in SVG'si ve yeme/kusma animasyonu dahil), mobil perde menü, perde sayfa geçişi, TR/EN değiştirici, footer.
4. Kök index.html: "Gişe" — gece arka planında ampullü bir gişe, iki bilet (Türkçe / English). Bilete tıklayınca bilet yırtılır ve ilgili dile gider. navigator.language'a göre ilgili bileti hafifçe öne çıkar.
5. tr/ altındaki 9 sayfayı sadece iskelet olarak oluştur (head, navbar, boş main, footer).
Bitince file:// ile açıldığında hata olmadığını kontrol et.
```

## Görev 1.5 — Yeni görsel dile geçiş (Görev 1'i yaptıysan)
```
CLAUDE.md'deki "Konsept", "Tasarım dili" ve "Global bileşenler" bölümleri güncellendi. Görev 1'de yaptıklarını buna uyarla, yapıyı bozma:
1. tokens.css'i yeni renk/gradyan/font değişkenleriyle yeniden yaz. Alfa Slab One, Bungee, Space Grotesk woff2'lerini assets/fonts/ içine indir; VT323'ü ve kullanılmayan fontları kaldır.
2. base.css ve components.css'teki düz renkli, kalın siyah kenarlıklı "sticker" stillerini kaldır; navbarı cam efektli hap şekline çevir.
3. Eski Bilet maskotunu sil; CLAUDE.md'deki maskot davranışını assets/img/maskot/ görselleriyle kur.
4. Kök index.html (gişe) sahnesini referans/giris.png'deki görsel dile çevir: aynı gün batımı göğü, karo zemin ve ufuk; gişe kulübesi de çadır gibi gradyanlı ve hacimli olsun.
Bitince değiştirdiğin dosyaları 5 maddede özetle.
```

## Görev 2 — Anasayfa: sirkin içi (tr/index.html)
```
tr/index.html'in ilk ekranı referans/giris-sahnesi.html'in kopyası, ona DOKUNMA. Altına, aynı görsel dili kullanarak devamını yap. Yeni renk/gölge/gradyan uydurma; assets/css/giris.css'teki değerleri ve CLAUDE.md "Tasarım dili"ni kullan.
1. ScrollTrigger: kaydırdıkça sahne çadır kapısına doğru büyür (gök, spot ve zemin farklı hızlarda — parallax), kapı perdeleri iki yana açılır, kapıdaki sıcak ışık ekranı doldurur ve içeri girilir.
2. İçeride: aynı karo zemin ve kavisli ufuk, üstte sallanan spot ışıkları, gün batımı yerine koyu mor kubbe içi. Sırayla:
   - Hakkımda özeti: spot altında afiş (Alfa Slab One başlık, gradyan dolgu), about.html'e link.
   - 3 proje kartı: gradyanlı, ışıklı, hafif gölgeli; projects.html'e link.
   - 6 galeri karosu önizlemesi; gallery.html'e link.
   Metinler @content/ICERIK.md'den.
3. Mobilde pin süresini kısalt, parallax katmanlarını azalt. Reduced-motion'da animasyonsuz düz akış.
Düz renkli kutu, kalın siyah kenarlık ve sticker görünümü kullanma.
```

## Görev 3 — Galeri (tr/gallery.html)
```
tr/gallery.html: fotoğraflar perspektifli bir karo duvarda, her fotoğraf bir karo. Tıklayınca karo duvardan havaya kalkar (translateZ + hafif dönüş + gölge büyür), komşu karolar dalga gibi sarsılır, sonra fotoğraf büyük gösterilir (lightbox: ok tuşları, ESC, swipe, açıklama). Kapatınca karo yerine "oturur". Mobilde 2 sütun, dokunmatik uyumlu. Görseller assets/img/gallery/ içinden, metinler @content/ICERIK.md'den.
```

## Görev 4 — Projeler (tr/projects.html)
```
tr/projects.html: araba seçme ekranı gibi proje seçimi, karo zeminli bir sahnede.
- Masaüstü: bölüm pinlenir, aşağı kaydırdıkça projeler yatayda kayar; aktif proje döner bir podyumun üstünde spot altında büyür, diğerleri karanlıkta küçülür.
- Yan panelde "istatistik kartı": proje adı, kısa açıklama, kullanılan araçlar oyun statları gibi dolan barlar, link butonu ("SEÇ").
- Ok tuşları ve alttaki nokta göstergeleri ile de geçilebilsin.
- Mobil: yatay swipe + scroll-snap, pin yok.
Metin ve görseller @content/ICERIK.md ve assets/img/projects/.
```

## Görev 5 — Hakkımda (tr/about.html)
```
tr/about.html, @content/ICERIK.md'deki bilgilerle:
- Üstte "Bu akşam sahnede" sirk afişi: vesikalık fotoğraf süslü bir çerçevede, adım afiş tipografisiyle.
- Özgeçmiş kısa metin.
- Eğitim: cambaz ipi zaman çizelgesi — kaydırdıkça küçük bir figür ip üstünde ilerler ve her duraktaki okul kartı açılır.
- Yetenekler: lunapark "güç ölçer" kuleleri; görünür olunca ibre seviyesine kadar fırlar, en yüksekte zil çalar (görsel).
- İlgi alanları: havada dönen hokkabaz topları; hover'da top büyür ve etiketi gösterir.
```

## Görev 6 — Blog (tr/blog.html + blog-1..3.html)
```
Blog'u yap. tr/blog.html: duvara yapıştırılmış afişler gibi 3 yazı kartı (hover'da afiş köşesi kalkar). Üstte bilet şeklinde kategori filtreleri (JS ile filtrele), kartlarda etiket çipleri. tr/blog-1/2/3.html: okunaklı yazı sayfası (maks ~70 karakter satır), üstte kategori + etiketler + tarih + okuma süresi, altta önceki/sonraki yazı. Metinler @content/ICERIK.md'den.
```

## Görev 7 — İletişim (tr/contact.html)
```
tr/contact.html, gişe teması:
- Adres, telefon (tel: linki), e-posta.
- Google Maps iframe'i ampullü bir çerçevenin içinde.
- İletişim formu bilet şeklinde: ad, e-posta, konu, mesaj; JS doğrulama ve anlaşılır hata mesajları. Gönderilince bilete "GÖNDERİLDİ" damgası vurulur. Gönderim için Formspree (form action) kullan; endpoint'i ICERIK.md'den al, yoksa yer tutucu bırak.
- Letterboxd ve Instagram linkleri neon tabela gibi, hover'da yanıp söner.
```

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
