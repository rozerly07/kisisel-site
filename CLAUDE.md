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
assets/css/components.css  → navbar, maskot, perde, kartlar, butonlar
assets/css/footer.css      → ortak imzalı footer (bütün sayfalar)
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

**Projeler sahnesi** (`tr/projects.html`, `assets/css/projeler.css`, `assets/js/projeler.js`; görünüm `referans/projeler.html`):
- Masaüstü: bölüm sabit (sticky), kaydırma podyumu **kesintisiz** döndürür: `rot = p × (N−1)` (ondalıklı). Kart yörünge konumu/ölçeği/parlaklığı ve disk dönüşü `rot`'tan; `.kart` ve `#disk` transition'ı `0.15s linear`. Panel, sayaç, `aria-hidden` ve tıklanabilirlik en yakın projeye göre (`Math.round(rot)`); panel yalnızca bu değer değişince yeniden dolar (çubuklar baştan dolar). Son projeden sonra sabitlik biter, sayfa normal devam eder.
- Telefon: sola-sağa kaydırma ile proje proje (geçiş eski 1.1s eğrisiyle). Klavye ← → her yerde çalışır.
- Ok/nokta düğmeleri YOK. Sol altta ipucu: "AŞAĞI KAYDIR ↓" (telefonda "KAYDIR ← →").
- Panel altında yanıp sönen imleçli VT323 satırı: "> SEÇMEK İÇİN PROJEYE TIKLA_" (kilitli: "> BU NUMARA KİLİTLİ_"). SEÇ düğmesi yok.
- Yalnızca öndeki (aktif) kilitsiz kart tıklanır: `role="button"`, `tabindex="0"`, `aria-label="[ad] ayrıntılarını aç"`, Enter/Space; detay penceresi açılır, kapanınca odak karta döner. Arkadaki kartlar `pointer-events:none`. Hover/focus: `.kart-ic` scale 1.03 + kalem çerçevesi hafif parlar. Kilitli kartta hiçbir şey olmaz.
- **Ses** (Web Audio, dosyasız, square dalga): aktif proje değişince bip 880→1320Hz/70ms, ses 0.05, en sık 90ms'de bir; detay açılınca arpej 660·880·1320Hz (her biri 60ms); kapanınca 440Hz/80ms. AudioContext ilk tıklama/dokunma/tuşta oluşturulur/resume edilir; hata sessizce geçilir. Sayaç altında "SES: AÇIK / SES: KAPALI" düğmesi (`aria-pressed`, varsayılan açık, `localStorage` `sirk-ses`). Reduced-motion sesi etkilemez.

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
- Footer: "roze's world" **Mrs Saint Delafield** (el yazısı imza; yerel woff2, ğ/İ/ş glifi yok → yalnızca ASCII), altın→pembe→lila gradyan; altında © satırı. Footer'da link YOK.
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
- **Maskot (kullanıcının karakteri)**: `assets/img/maskot/` görselleri (şeffaf, ≤160px, WebP): `on.webp`, `yan.webp` (sola bakar), `yan-sag.webp` (aynalı, sağa bakar), `arka.webp`. Ekrana sabit (`position:fixed`). Kod `assets/js/maskot.js`'de (anasayfa); dolaşma modu `referans/anasayfa.html`'deki değerlerle. Rengi `--maskot-renk` (tokens.css; on.webp'nin baskın rengi `#C0AED8`).
  - **Navbar modu** (scrollY < 80): logonun sağında, dikey ortalı, 44px (mobil 36px), on.webp ile yerinde süzülür; z-index navbardan yüksek. İmleçle dokunulunca yan görünümle navbardaki boşluklardan birine kaçar (0.45s), navbardan çıkmaz, durunca önden döner.
  - **Aşağı kaydırınca** (scrollY ≥ 80): yan görünümle yay çizerek (önce biraz yukarı, sonra aşağı) 0.9s'de navbardan atlar, 90px'e büyür, dolaşma moduna geçer: her 4.2 sn'de ekranın alt kısmında (72–90vh) yeni yere yürür (2.8s), dokununca kaçar (0.45s).
  - **En üste dönünce**: yürüyüp küçülerek (0.9s) navbardaki yerine oturur.
  - **Yazı yeme** (yalnızca navbar modunda, yalnızca "Anasayfa", "Hakkımda", "Projeler"): boştayken 7–10 sn'de bir rastgele ya da imleç linkte 400ms kalınca; aynı anda tek yeme. Maskot linkin yanına uçar, ağzını linke çevirir; harfler en yakından başlayıp 40ms arayla ağza doğru kayar (en fazla %60 yol), %60'a küçülür, maskot rengine döner — kaybolmaz; maskot 3 kez çiğner (~700ms). Kusma (~600ms): harfler aynı sırayla hafif geri sekmeyle yerine zıplar, 5–6 maskot renginde damla saçılıp söner; harfler 2.5 sn maskot renginde kalır, 1 sn'de eski rengine döner. Link harf span'larına bölünür (span'lar `aria-hidden`, linkte `aria-label` tam metin); link kutusu değişmez, yalnızca harflerin transform'u ve rengi değişir; link her an tıklanabilir, yeme sırasında maskot `pointer-events:none`, tıklama animasyonu beklemez. Mobil menü açıkken yeme olmaz.
  - **prefers-reduced-motion**: yalnızca navbarda hareketsiz durur, yeme yok.
- **Logo**: `assets/img/logo/` (SVG tercih, yoksa şeffaf PNG); navbardaki "[ADIN] SİRKİ" yazısının yerine.
- **Mobil menü**: tam ekran perde iner, linkler sırayla düşer.
- **Perde geçişi**: iç linke tıklayınca kadife perde kapanır → sayfa değişir → yeni sayfada açılır.
- **Dil değiştirici**: navbarda TR · EN hap butonu (pembe→turuncu gradyan); aynı dosyayı diğer klasörde açar. `<html lang>` doğru.
- **Footer (imzalı, tek kaynak)**: HTML'i `components.js` (`footerHTML`/`footerKur`) basar, stili `assets/css/footer.css`; bütün `tr/` sayfalarında aynı. Karo zeminli sayfada yer tutucu `<div data-footer="karo"></div>` (zeminden `#2A0D57`→`#140629` gradyanla geçiş), diğer sayfalarda body sonuna eklenir ve üst kenarı `#140629`'dan yumuşak gradyanla başlar. Min. yükseklik 320px (telefon 240px), içerik dikey ortalı.
  - "roze's world": Mrs Saint Delafield, 132px (telefon 76px), dolgu `linear-gradient(90deg,#FFC24B,#FF5A8A 50%,#B98CFF)`, parlama `drop-shadow(0 0 18px rgba(255,120,160,.45))`.
  - **İmza dokunuşu**: footer ekrana ilk girince (IntersectionObserver, bir kez) yazı 1.6s'de soldan sağa açılır (clip-path inset, ease-out); ardından altında yazı genişliğinde elle çekilmiş kıvrımlı altın SVG kuyruk çizilir (stroke-dashoffset, 0.9s). Reduced-motion'da direkt görünür.
  - Altında "© 2026 roze's world · Tüm hakları saklıdır." Link yok.

## Çalışma kuralları (token tasarrufu)
- Sadece görevde adı geçen dosyaları oku/düzenle. Tüm projeyi tarama.
- Değişiklik sonrası uzun özet yazma; 3–5 maddelik kısa not yeter.
- Ortak stil/JS tekrar yazma; tokens.css ve components.js'i kullan.
- Önce `tr/` sayfaları bitirilir; `en/` en sonda tek görevde çevrilir.