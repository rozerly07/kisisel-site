# Proje: Kişisel Web Sitesi — "Dijital Sirk" teması

Bu dosya projenin TEK doğruluk kaynağıdır. Her oturumda buna uy; burada yazanı tekrar sorma.

## Kesin şartlar (hoca)
- Multipage: her sayfa ayrı .html dosyası. SPA / framework YOK.
- İki dil: `tr/` ve `en/` klasörleri, ikisi de multipage, dosya adları aynı.
- Responsive: 360px telefon, 768px tablet, 1280px+ masaüstü.
- Tasarım kararlarında **Impeccable** skill'i kullanılır (`/impeccable ...` komutları).
- Teslim: zip, toplam < 500MB. Site **file:// ile çift tıklayınca da çalışmalı** (hoca sunucusuz açabilir).

## Teknik kurallar
- Saf HTML + CSS + vanilla JS. Build aracı yok.
- Kütüphaneler sadece yerel kopya olarak `assets/js/vendor/`: GSAP + ScrollTrigger. Başka kütüphane ekleme, önce sor.
- `fetch()` ile HTML parçası YÜKLEME (file:// altında bozulur). Ortak navbar/footer/perde `components.js` içinde JS template string ile basılır.
- Fontlar `assets/fonts/` içinde self-host woff2. Türkçe karakterler (ç ğ ı İ ö ş ü) mutlaka desteklenmeli, kontrol et.
- Derinlik önce 2D ile (SVG gradyan, gölge, perspektif çizim). CSS 3D transform sadece gerektiğinde (ör. galeride kalkan karo). Three.js kullanma.
- Animasyonlarda sadece `transform` ve `opacity`. `prefers-reduced-motion` açıksa hareketleri sadeleştir.
- Görseller: WebP, `loading="lazy"`, `width/height` belirtilmiş, anlamlı `alt`.
- Erişilebilirlik: klavye ile gezilebilir, görünür focus, semantik HTML, kontrast AA.

## Klasör yapısı
```
index.html                 → Gişe: dil seçim girişi (TR / EN bileti)
tr/ & en/                  → index, about, projects, gallery, blog, blog-1, blog-2, blog-3, contact (.html)
assets/css/tokens.css      → renk, font, boşluk, süre değişkenleri
assets/css/base.css        → reset, tipografi, layout yardımcıları
assets/css/components.css  → navbar, maskot, perde, kartlar, butonlar, footer
assets/css/pages/*.css     → sayfaya özel stiller
assets/js/components.js    → navbar + maskot + dil değiştirici + perde geçişi + footer
assets/js/pages/*.js       → sayfaya özel etkileşimler
assets/js/vendor/          → gsap.min.js, ScrollTrigger.min.js
assets/fonts/  assets/img/{about,projects,gallery,blog,maskot}/
referans/                  → onaylı tasarım ekran görüntüleri (siteye dahil değil)
content/ICERIK.md          → tüm metinler buradan alınır (kendin metin uydurma)
```

## Konsept
Ziyaretçi, bir bilgisayarın içindeki dijital bir sirke giriyor. Görünüm: **animasyon filmi gibi akıcı 2D** — gradyanlı ışık, hacim veren gölgeler, parlama, sürekli ama yumuşak hareket. Düz/çocukça "sticker" görünümü, kalın siyah kenarlıklar ve düz tek renk alanlar YASAK. Maskot SADECE `assets/img/maskot/` içindeki kullanıcının kendi karakteri; başka dizi/çizgi film karakteri, logo veya isim kullanılmaz.

Görsel referanslar: `referans/anasayfa.html` (giriş + kaydırma + sirkin içi, ONAYLI) ve `referans/giris-sahnesi.html` — onaylanmış giriş sahnesinin BİREBİR kodu. Bu sahne yeniden çizilmez, kopyalanır; içindeki renk, ölçü, açı, koordinat ve süre değerleri değiştirilmez. Diğer sayfalar bu dosyadaki gradyanları, ışıkları, fontları ve zemini aynen kullanır. `referans/` içinde onaylı bir kod varsa her zaman o kopyalanır.

Mekân eşlemesi: Anasayfa = çadırın girişi → içi · Hakkımda = sanatçı afişi + cambaz ipi · Projeler = karo zeminli sahnede döner podyum · Galeri = karo duvar · Blog = duyuru panosu · İletişim = gişe.

## Tasarım dili (onaylı — değiştirme)
**Gökyüzü / ana zemin**: dikey gün batımı gradyanı `#0E0726 → #2A0D57 → #6A1B7A → #C6306E → #FF8A3D → #FFC66B`, `background-size:100% 160%` ile 14 sn'de yavaşça kayar. Üst yarıda ince yıldız tozu.

**Renkler** (tokens.css)
- Çadır kırmızısı gradyan `#FF5A66 → #A3122A` · krem gradyan `#FFF7E8 → #E7C7A0`
- Altın `#FFC24B` · ışık sarısı `#FFE7A3` · pembe `#FF5A6E` / `#FF6FA3` · turuncu `#FF8A3D`
- Gece moru `#1A0B33` (karo koyu) · lila-krem `#F4E2FF` (karo açık) · bordo `#6B0F24` (lekeler, perde gölgesi)
- Soğuk vurgu `#7FE7FF` (ikinci spot ışığı, az kullan)

**Tipografi**
- Büyük başlıklar: **Alfa Slab One** (sade kalın slab serif, katman/gölge yığını YOK). Dolgu `linear-gradient(180deg,#FFF6D6 10%,#FFC24B 50%,#FF5A6E 95%)` + `background-clip:text`; parlama `drop-shadow(0 6px 0 #3A0B52) drop-shadow(0 0 26px rgba(255,170,80,.55))`.
- Ad-soyad başlığında 2–3 harfte bordo leke: düzensiz oval, bir ucu fırça gibi çekilmiş sivri iz, yanında küçük damla, hafif açık iç ışık; her harfte değil. Inline SVG, harfe göre konumlu.
- Bölüm başlıkları (Merhaba ben…, Galeri vb.): **Abril Fatface** (kalın gövde, ince serif), aynı altın→pembe gradyan dolgu ve parlama. Üstünde küçük tema etiketi (ör. "KARO DUVAR").
- Projeler ile ilgili her yazı: pikselli fontlar — başlık/ad **Pixelify Sans**, etiket/açıklama **VT323** (`> PROJELER.EXE_` gibi komut satırı etiketleri).
- Footer: "roze's world" **Rubik Beastly** (şekilsiz, absürt harfler), gradyanlı; altında © satırı. Footer'da link YOK.
- Küçük başlık/etiket: Bungee, geniş harf aralığı, pembe parlama.
- Gövde: Space Grotesk.

**Motifler**
- Marki ampulleri: sıra başlıktan kısa değil, her ampul farklı süre ve gecikmeyle **düzensiz** yanıp söner (sırayla değil).
- Çadır: SVG, şeritler gradyanlı, yanlardan koyu–ortadan açık gölge katmanı, kavisli kubbe, saçak (yarım daireler), dalgalanan bayrak. **Alt kenarı öne doğru yarım daire kavis**, kapı/perde de bu kavise uyar. Kapı içi sıcak radyal ışık, nefes alır gibi parlar.
- Karo zemin: SVG perspektif, **hareketsiz**. Öne doğru ölçülü büyür (en ön karo ≈ en arka karonun 2 katı). Uzakta kaybolmaz; bittiği çizgi **hafif kavisli dünya ufku** (ince açık renk kenar). Ufuk çizgisi çadırın yarı yüksekliğinin altından geçer.
- Spot ışıkları: iki koni (sıcak sarı + soğuk mavi), `mix-blend-mode:screen`, blur, ağır ağır sallanır.
- Konfeti: yavaş düşen, dönen küçük parçalar (az sayıda).
- Navbar: cam efekti (yarı saydam gradyan + `backdrop-filter:blur`), hap şekli, yumuşak gölge.

**Hareket**: akıcı ve sürekli ama sakin; ease-in-out, sahne geçişleri 600–900ms, UI 200–400ms. Sert/zıplayan "oyuncak" hareketleri yok. `prefers-reduced-motion`'da sürekli animasyonlar durur.

## Global bileşenler
- **Maskot (kullanıcının karakteri)**: `assets/img/maskot/` görselleri (şeffaf, ≤160px, WebP). Ekrana sabit (`position:fixed`), kaydırırken hep görünür; birkaç saniyede bir ekranın alt kısmında yeni bir yere yürür (gittiği yöne yan görünüm), durunca önden görünür; imleç üstüne gelince/mobilde dokununca hızla ekranın öbür yanına kaçar. Davranış kodu `referans/anasayfa.html` içinde; sadece yer tutucu daire görsellerle değiştirilir.
- **Logo**: `assets/img/logo/` (SVG tercih, yoksa şeffaf PNG); navbardaki "[ADIN] SİRKİ" yazısının yerine.
- **Mobil menü**: tam ekran perde iner, linkler sırayla düşer.
- **Perde geçişi**: iç linke tıklayınca kadife perde kapanır → sayfa değişir → yeni sayfada açılır.
- **Dil değiştirici**: navbarda TR · EN hap butonu (pembe→turuncu gradyan); aynı dosyayı diğer klasörde açar. `<html lang>` doğru.
- **Footer**: karo zeminden gradyanla geçilen koyu mor alan, "roze's world" + © 2026 satırı. Link yok.

## Çalışma kuralları (token tasarrufu)
- Sadece görevde adı geçen dosyaları oku/düzenle. Tüm projeyi tarama.
- Değişiklik sonrası uzun özet yazma; 3–5 maddelik kısa not yeter.
- Ortak stil/JS tekrar yazma; tokens.css ve components.js'i kullan.
- Önce `tr/` sayfaları bitirilir; `en/` en sonda tek görevde çevrilir.