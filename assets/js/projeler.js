// projeler.js — tr/projects.html (referans/projeler.html'deki script; değerler aynen)
(function () {
  /* ================= VERİ =================
     Projeleri buraya yaz (ICERIK.md'den). Alan boşsa pencerede o kısım gizlenir.
     gorseller: 1 tane de olur; 1'den fazlaysa küçük görseller çıkar.
     kilitli:true → oyunlardaki gibi kilitli "YAKINDA" numarası (istersen sil). */
  var IMG = '../assets/img/projects/';
  var PROJELER = [
    { ad: 'Animate Projesi', kisa: 'Etkileşimli menü butonları, sahne geçişleri ve katmanlı zaman çizelgesi animasyonları içeren web arayüzü çalışmasıdır. Görsel içeriklerin ve zamanlama akışının uyumlu bir bütünlük sunması hedeflenmiştir.', uzun: '', rol: '', yil: '', link: '',
      gorseller: [IMG + 'gaproje.webp'], araclar: [['Adobe Animate', 8], ['Zaman Çizelgesi (Timeline)', 8], ['Katmanlar (Layers)', 8], ['Buton ve Metin Araçları', 7], ['Kare / Anahtar Kare Yönetimi', 7]], renk: 'linear-gradient(160deg,#2A0D57,#C6306E 70%,#FF8A3D)' },
    { ad: 'Photoshop ürün tanıtımı', kisa: 'MAC Matte Maximal Lipstick ürünü için mat doku vurgusu ve yansıma efektiyle hazırlanan tanıtım görseli tasarımıdır. Tipografi ve renk dengesiyle ürünün marka kimliğini öne çıkarması amaçlanmıştır.', uzun: '', rol: '', yil: '', link: '',
      gorseller: [IMG + 'resim3.webp'], araclar: [['Adobe Photoshop', 8], ['Metin (Type) Aracı', 8], ['Katman Maskeleri', 7], ['Gradyan ve Yansıma Efektleri', 7], ['Renk ve Ton Ayarları', 7], ['Seçim Araçları', 6]], renk: 'linear-gradient(160deg,#0E3A6E,#6A1B7A 60%,#FF5A8A)' },
    { ad: 'Photoshop görüntü düzenleme', kisa: 'Siyah-beyaz atmosfer üzerinde seçili karakterlerin renkli bırakıldığı dramatik sahne düzenleme çalışmasıdır. Geçmiş fırçası ve ton düzenlemeleriyle odak noktasının güçlendirilmesi sağlanmıştır.', uzun: '', rol: '', yil: '', link: '',
      gorseller: [IMG + 'pic15.webp'], araclar: [['Adobe Photoshop', 8], ['History Brush (Geçmiş Fırçası)', 9], ['Siyah-Beyaz / Tonlama Ayarları', 8], ['Fırça (Brush) Aracı', 8], ['Katmanlar ve Maskeler', 7], ['Zoom / Yakınlaştırma Aracı', 7]], renk: 'linear-gradient(160deg,#6A1B7A,#FF8A3D 70%,#FFC66B)' },
    // araç seviyeleri ICERIK.md'de yok → boş (pencerede gizlenir); seviyeler eklenince doldur
    { ad: 'Web arayüzü', kisa: 'Bir web sitesinin arayüzünü gösterebilen bir çalışma photoshop üzerinde bölümlere ayrılarak yapıldı, değişikliklerin kaydedilip istendiğinde web sitesinin nasıl görünebileceğine dair seçenekler de sunuldu.', uzun: '', rol: '', yil: '', link: '',
      gorseller: [IMG + 'pic12.webp'], araclar: [], renk: 'linear-gradient(160deg,#2A0D57,#C6306E 70%,#FF8A3D)' },
    { ad: '??? YAKINDA', kisa: 'Bu numara henüz prova aşamasında. Kilidi yakında açılacak.', kilitli: true,
      gorseller: [], araclar: [['???', 0], ['???', 0], ['???', 0]], renk: 'linear-gradient(160deg,#1E0838,#3A1260)' }
  ];
  // en/projects.html: projeler.en.js yüklüyse liste ve arayüz metinleri İngilizce
  if (window.PROJELER_EN) PROJELER = window.PROJELER_EN.liste;
  var T = (window.PROJELER_EN && window.PROJELER_EN.metin) || {
    kilitli: 'KİLİTLİ', gorsel: '[PROJE GÖRSELİ]', numara: 'NUMARA_', oyuncu: 'OYUNCU 1 · ',
    imlecKilit: '> BU NUMARA KİLİTLİ', imlecSec: '> SEÇMEK İÇİN PROJEYE TIKLA',
    sesAcik: 'SES: AÇIK', sesKapali: 'SES: KAPALI', ac: function (ad) { return ad + ' ayrıntılarını aç'; },
    gorselNo: 'Görsel ', profil: ' · PROFİL', rol: 'ROL: ', yil: 'TARİH: '
  };
  /* Elle çizilmiş sarı kalem çerçeveler (kart kutusunun 0–100 koordinatlarında). Değiştirme. */
  var KALEM = [["M0.96 4.99 L3.06 5.14 L5.16 5.16 L7.27 5.09 L9.35 5.10 L11.40 5.28 L13.45 5.55 L15.54 5.87 L17.69 6.08 L19.88 6.06 L22.06 5.81 L24.18 5.45 L26.21 5.16 L28.19 5.04 L30.19 5.11 L32.25 5.28 L34.40 5.40 L36.58 5.34 L38.72 5.09 L40.80 4.78 L42.82 4.56 L44.82 4.54 L46.86 4.75 L48.95 5.09 L51.08 5.41 L53.22 5.56 L55.35 5.52 L57.45 5.36 L59.53 5.25 L61.59 5.31 L63.66 5.56 L65.74 5.91 L67.85 6.20 L70.00 6.29 L72.15 6.15 L74.27 5.86 L76.35 5.60 L78.39 5.49 L80.41 5.58 L82.47 5.79 L84.60 5.96 L86.78 5.98 L88.96 5.79 L91.06 5.48 L93.07 5.06 L95.06 4.77 L97.10 4.73 L99.20 4.87 L101.32 5.04 L101.38 4.71 L99.32 4.14 L97.25 3.57 L95.11 3.15 L92.91 3.00 L90.73 3.11 L88.65 3.45 L86.64 3.70 L84.64 3.79 L82.59 3.75 L80.47 3.71 L78.31 3.80 L76.15 4.09 L74.05 4.54 L71.99 4.99 L69.95 5.27 L67.91 5.31 L65.84 5.12 L63.75 4.84 L61.64 4.61 L59.52 4.54 L57.41 4.60 L55.33 4.67 L53.27 4.60 L51.24 4.31 L49.19 3.84 L47.11 3.32 L44.97 2.91 L42.79 2.75 L40.62 2.81 L38.51 2.98 L36.47 3.10 L34.47 3.06 L32.43 2.90 L30.32 2.72 L28.14 2.67 L25.93 2.86 L23.78 3.27 L21.70 3.75 L19.69 4.13 L17.70 4.31 L15.67 4.28 L13.59 4.15 L11.46 4.05 L9.32 4.17 L7.22 4.44 L5.14 4.73 L3.06 4.89 L0.98 4.75Z", "M95.52 0.85 L95.54 2.94 L95.57 5.02 L95.55 7.08 L95.44 9.10 L95.30 11.12 L95.30 13.18 L95.36 15.27 L95.55 17.39 L95.88 19.49 L96.30 21.55 L96.73 23.58 L97.05 25.60 L97.16 27.61 L97.03 29.63 L96.68 31.67 L96.19 33.72 L95.69 35.78 L95.28 37.86 L95.04 39.95 L94.96 42.05 L94.98 44.14 L95.03 46.20 L95.03 48.23 L94.93 50.25 L94.77 52.28 L94.62 54.35 L94.55 56.47 L94.65 58.62 L94.94 60.76 L95.38 62.85 L95.85 64.88 L96.24 66.87 L96.46 68.83 L96.47 70.80 L96.28 72.82 L95.95 74.87 L95.59 76.96 L95.31 79.05 L95.16 81.15 L95.15 83.23 L95.20 85.30 L95.23 87.35 L95.17 89.40 L95.07 91.43 L94.92 93.49 L94.81 95.56 L94.82 97.64 L95.04 99.71 L95.35 99.70 L95.39 97.64 L95.56 95.60 L95.79 93.56 L95.98 91.49 L96.08 89.42 L96.02 87.34 L95.91 85.27 L95.85 83.22 L95.90 81.19 L96.14 79.16 L96.55 77.14 L97.07 75.11 L97.61 73.06 L98.03 70.96 L98.25 68.81 L98.21 66.65 L97.97 64.51 L97.62 62.42 L97.28 60.39 L97.04 58.40 L96.92 56.42 L96.91 54.42 L96.94 52.37 L96.93 50.29 L96.83 48.19 L96.62 46.10 L96.35 44.04 L96.12 42.01 L96.03 39.99 L96.12 37.96 L96.43 35.93 L96.88 33.88 L97.38 31.81 L97.80 29.74 L98.05 27.64 L98.10 25.53 L97.96 23.42 L97.74 21.33 L97.53 19.27 L97.42 17.25 L97.43 15.24 L97.52 13.21 L97.63 11.15 L97.50 9.05 L97.20 6.96 L96.77 4.89 L96.29 2.85 L95.87 0.81Z", "M100.61 95.25 L98.48 95.58 L96.35 95.87 L94.22 96.06 L92.11 96.09 L90.01 95.95 L87.91 95.75 L85.79 95.49 L83.66 95.25 L81.52 95.07 L79.38 94.96 L77.26 94.89 L75.16 94.81 L73.09 94.68 L71.02 94.49 L68.91 94.25 L66.76 94.04 L64.58 93.91 L62.38 93.95 L60.20 94.18 L58.04 94.56 L55.92 95.02 L53.82 95.46 L51.72 95.79 L49.63 95.95 L47.52 95.92 L45.41 95.75 L43.30 95.51 L41.17 95.25 L39.04 95.04 L36.90 94.89 L34.77 94.77 L32.67 94.63 L30.58 94.45 L28.51 94.20 L26.41 93.91 L24.27 93.65 L22.08 93.49 L19.87 93.50 L17.67 93.71 L15.50 94.10 L13.38 94.57 L11.29 95.04 L9.22 95.40 L7.14 95.68 L5.04 95.77 L2.92 95.70 L0.79 95.54 L-1.34 95.33 L-1.36 95.56 L0.76 95.78 L2.88 96.09 L5.00 96.37 L7.15 96.58 L9.32 96.66 L11.50 96.51 L13.67 96.27 L15.80 96.01 L17.88 95.83 L19.93 95.78 L21.97 95.85 L24.03 96.04 L26.14 96.26 L28.28 96.46 L30.45 96.56 L32.62 96.56 L34.76 96.47 L36.88 96.36 L38.99 96.29 L41.10 96.29 L43.22 96.38 L45.36 96.51 L47.49 96.63 L49.64 96.66 L51.79 96.57 L53.95 96.37 L56.10 96.10 L58.23 95.85 L60.33 95.71 L62.40 95.72 L64.45 95.89 L66.51 96.19 L68.61 96.54 L70.75 96.86 L72.92 97.07 L75.09 97.16 L77.25 97.13 L79.38 97.04 L81.48 96.95 L83.59 96.90 L85.70 96.91 L87.84 96.94 L89.98 96.95 L92.13 96.82 L94.27 96.57 L96.40 96.23 L98.52 95.83 L100.64 95.49Z", "M2.89 99.50 L3.27 97.44 L3.64 95.38 L3.95 93.30 L4.16 91.21 L4.25 89.12 L4.13 87.05 L4.03 84.99 L3.97 82.93 L4.00 80.87 L4.13 78.80 L4.33 76.73 L4.57 74.65 L4.81 72.57 L4.99 70.48 L5.09 68.38 L5.08 66.27 L5.00 64.15 L4.86 62.05 L4.72 59.97 L4.61 57.91 L4.55 55.88 L4.56 53.86 L4.61 51.83 L4.69 49.77 L4.74 47.69 L4.75 45.60 L4.69 43.50 L4.58 41.41 L4.44 39.33 L4.32 37.26 L4.26 35.20 L4.31 33.14 L4.48 31.08 L4.77 29.02 L5.13 26.96 L5.53 24.90 L5.88 22.82 L6.15 20.72 L6.30 18.59 L6.30 16.46 L6.18 14.34 L5.98 12.24 L5.75 10.17 L5.38 8.15 L5.02 6.12 L4.76 4.08 L4.60 2.01 L4.51 -0.07 L4.26 -0.08 L3.98 1.99 L3.71 4.07 L3.49 6.17 L3.36 8.30 L3.37 10.43 L3.63 12.52 L3.93 14.58 L4.22 16.61 L4.43 18.63 L4.55 20.66 L4.54 22.70 L4.43 24.76 L4.23 26.84 L4.00 28.92 L3.78 31.00 L3.60 33.09 L3.46 35.17 L3.35 37.26 L3.26 39.34 L3.15 41.41 L3.00 43.47 L2.81 45.52 L2.60 47.57 L2.39 49.64 L2.23 51.73 L2.17 53.84 L2.24 55.97 L2.44 58.09 L2.76 60.19 L3.15 62.27 L3.54 64.32 L3.87 66.36 L4.09 68.40 L4.16 70.45 L4.08 72.51 L3.87 74.57 L3.58 76.63 L3.25 78.70 L2.93 80.77 L2.66 82.86 L2.45 84.95 L2.30 87.04 L2.19 89.11 L2.23 91.17 L2.33 93.23 L2.41 95.30 L2.47 97.38 L2.51 99.47Z", "M9.59 4.94 L11.68 4.96 L13.77 5.15 L15.86 5.38 L17.95 5.50 L20.04 5.40 L22.13 5.08 L24.23 4.66 L26.32 4.31 L28.41 4.16 L30.50 4.22 L32.59 4.39 L34.68 4.53 L36.78 4.52 L38.87 4.34 L40.96 4.10 L43.05 3.95 L45.14 4.03 L47.23 4.33 L49.32 4.77 L51.41 5.16 L53.50 5.38 L55.59 5.39 L57.68 5.28 L59.77 5.19 L61.86 5.26 L63.95 5.50 L66.04 5.82 L68.13 6.05 L70.22 6.08 L72.32 5.87 L74.41 5.50 L76.50 5.15 L78.60 4.94 L80.69 4.94 L82.78 5.07 L84.87 5.18 L86.96 5.14 L89.05 4.92 L91.15 4.59 L93.24 4.33", "M92.37 96.76 L90.25 96.75 L88.12 96.65 L86.00 96.50 L83.88 96.37 L81.75 96.31 L79.63 96.30 L77.50 96.31 L75.38 96.28 L73.25 96.18 L71.13 95.97 L69.01 95.70 L66.89 95.41 L64.76 95.20 L62.64 95.13 L60.51 95.24 L58.39 95.50 L56.26 95.86 L54.13 96.21 L52.01 96.48 L49.88 96.60 L47.76 96.57 L45.64 96.43 L43.51 96.24 L41.39 96.07 L39.26 95.96 L37.14 95.92 L35.02 95.92 L32.89 95.89 L30.77 95.80 L28.64 95.63 L26.52 95.39 L24.40 95.14 L22.28 94.97 L20.15 94.94 L18.03 95.07 L15.90 95.35 L13.77 95.72 L11.65 96.07 L9.52 96.33 L7.40 96.43"], ["M0.15 5.02 L2.23 5.10 L4.34 5.02 L6.48 4.79 L8.59 4.55 L10.59 4.41 L12.52 4.29 L14.47 4.33 L16.52 4.45 L18.63 4.51 L20.75 4.43 L22.83 4.21 L24.88 3.98 L26.91 3.90 L28.95 4.05 L30.98 4.45 L33.03 4.97 L35.12 5.43 L37.27 5.67 L39.44 5.62 L41.57 5.35 L43.62 5.01 L45.60 4.75 L47.56 4.61 L49.58 4.55 L51.66 4.46 L53.77 4.24 L55.85 3.88 L57.90 3.45 L59.92 3.13 L61.94 3.06 L63.96 3.30 L65.98 3.82 L68.03 4.43 L70.12 4.97 L72.26 5.27 L74.41 5.32 L76.51 5.20 L78.53 5.05 L80.51 4.96 L82.53 4.94 L84.62 4.90 L86.74 4.72 L88.85 4.34 L90.90 3.72 L92.93 3.09 L94.95 2.62 L96.99 2.43 L99.04 2.57 L99.06 2.33 L96.99 2.18 L94.91 2.27 L92.82 2.55 L90.72 2.88 L88.66 3.07 L86.65 3.12 L84.65 2.98 L82.61 2.76 L80.51 2.61 L78.38 2.65 L76.28 2.89 L74.26 3.20 L72.28 3.42 L70.30 3.45 L68.27 3.25 L66.19 2.90 L64.08 2.55 L61.97 2.36 L59.87 2.36 L57.78 2.51 L55.71 2.66 L53.67 2.70 L51.66 2.59 L49.62 2.41 L47.51 2.28 L45.36 2.37 L43.22 2.71 L41.15 3.22 L39.17 3.73 L37.22 4.09 L35.24 4.18 L33.21 4.01 L31.13 3.68 L29.04 3.36 L26.95 3.15 L24.86 3.07 L22.79 3.04 L20.75 2.94 L18.75 2.70 L16.73 2.36 L14.65 2.04 L12.49 1.89 L10.29 2.07 L8.18 2.69 L6.17 3.48 L4.19 4.19 L2.19 4.65 L0.15 4.78Z", "M95.51 0.11 L95.40 2.18 L95.21 4.26 L95.04 6.36 L94.96 8.50 L95.01 10.63 L95.31 12.71 L95.62 14.74 L95.86 16.72 L95.96 18.69 L95.89 20.70 L95.65 22.75 L95.31 24.84 L94.97 26.96 L94.73 29.07 L94.63 31.18 L94.70 33.29 L94.88 35.39 L95.11 37.48 L95.29 39.56 L95.39 41.61 L95.38 43.65 L95.29 45.69 L95.20 47.76 L95.17 49.85 L95.24 51.95 L95.42 54.04 L95.67 56.11 L95.91 58.14 L96.05 60.16 L96.05 62.19 L95.87 64.24 L95.56 66.32 L95.18 68.41 L94.85 70.51 L94.66 72.61 L94.64 74.74 L94.81 76.87 L95.10 78.99 L95.41 81.08 L95.67 83.13 L95.81 85.13 L95.83 87.12 L95.76 89.13 L95.82 91.19 L95.92 93.29 L96.07 95.39 L96.24 97.47 L96.40 99.55 L96.64 99.55 L96.79 97.48 L97.04 95.42 L97.39 93.38 L97.80 91.33 L98.15 89.25 L98.21 87.11 L98.06 84.95 L97.71 82.81 L97.18 80.72 L96.58 78.67 L96.03 76.66 L95.63 74.65 L95.46 72.63 L95.56 70.59 L95.89 68.54 L96.36 66.48 L96.86 64.41 L97.29 62.32 L97.59 60.21 L97.73 58.09 L97.75 55.97 L97.69 53.89 L97.62 51.84 L97.56 49.80 L97.51 47.75 L97.42 45.67 L97.26 43.57 L96.98 41.47 L96.60 39.38 L96.15 37.32 L95.72 35.27 L95.42 33.23 L95.33 31.19 L95.50 29.16 L95.90 27.13 L96.46 25.10 L97.07 23.04 L97.61 20.95 L97.97 18.80 L98.08 16.63 L97.97 14.47 L97.68 12.36 L97.33 10.30 L96.83 8.29 L96.39 6.28 L96.08 4.24 L95.87 2.18 L95.75 0.11Z", "M99.84 93.64 L97.73 93.83 L95.61 94.07 L93.50 94.23 L91.46 94.23 L89.45 94.11 L87.40 94.08 L85.30 94.08 L83.17 94.22 L81.05 94.50 L78.98 94.85 L76.93 95.14 L74.88 95.24 L72.82 95.08 L70.74 94.71 L68.65 94.27 L66.53 93.91 L64.38 93.73 L62.23 93.75 L60.11 93.90 L58.04 94.06 L56.02 94.16 L53.99 94.20 L51.90 94.25 L49.77 94.41 L47.64 94.75 L45.55 95.24 L43.50 95.76 L41.46 96.17 L39.42 96.32 L37.37 96.18 L35.30 95.81 L33.22 95.35 L31.10 94.96 L28.96 94.72 L26.83 94.64 L24.74 94.65 L22.70 94.65 L20.68 94.59 L18.61 94.51 L16.47 94.50 L14.31 94.66 L12.17 95.04 L10.08 95.61 L8.05 96.26 L6.01 96.78 L3.96 97.06 L1.88 97.09 L-0.20 96.94 L-0.22 97.18 L1.87 97.36 L3.97 97.42 L6.08 97.29 L8.20 97.02 L10.32 96.73 L12.39 96.49 L14.41 96.44 L16.42 96.58 L18.47 96.80 L20.57 96.99 L22.72 97.02 L24.85 96.87 L26.93 96.62 L28.97 96.39 L31.00 96.30 L33.07 96.39 L35.17 96.63 L37.29 96.89 L39.41 97.04 L41.54 97.02 L43.67 96.84 L45.78 96.62 L47.85 96.46 L49.88 96.44 L51.92 96.51 L54.00 96.58 L56.14 96.54 L58.28 96.31 L60.38 95.92 L62.42 95.48 L64.43 95.13 L66.46 95.01 L68.52 95.13 L70.62 95.43 L72.72 95.78 L74.84 96.05 L76.96 96.18 L79.08 96.18 L81.18 96.15 L83.23 96.18 L85.27 96.30 L87.34 96.44 L89.47 96.50 L91.63 96.20 L93.74 95.65 L95.80 94.98 L97.82 94.33 L99.88 93.88Z", "M5.82 99.60 L5.78 97.54 L5.70 95.48 L5.65 93.43 L5.67 91.37 L5.74 89.31 L5.80 87.24 L5.84 85.16 L5.82 83.06 L5.71 80.95 L5.53 78.86 L5.34 76.81 L5.18 74.81 L5.10 72.84 L5.11 70.86 L5.21 68.84 L5.36 66.78 L5.52 64.68 L5.62 62.57 L5.64 60.47 L5.58 58.39 L5.48 56.32 L5.39 54.25 L5.36 52.19 L5.42 50.14 L5.55 48.09 L5.72 46.04 L5.85 43.96 L5.89 41.86 L5.77 39.74 L5.48 37.64 L5.08 35.58 L4.62 33.55 L4.21 31.55 L3.92 29.55 L3.81 27.53 L3.90 25.48 L4.15 23.43 L4.50 21.36 L4.86 19.30 L5.18 17.21 L5.39 15.12 L5.49 13.02 L5.50 10.93 L5.29 8.88 L5.01 6.85 L4.73 4.81 L4.50 2.76 L4.30 0.70 L3.98 0.70 L3.75 2.76 L3.52 4.83 L3.36 6.91 L3.30 9.00 L3.38 11.07 L3.65 13.10 L3.87 15.12 L3.98 17.15 L3.93 19.19 L3.74 21.25 L3.45 23.32 L3.14 25.40 L2.87 27.48 L2.71 29.58 L2.69 31.70 L2.79 33.81 L2.97 35.90 L3.18 37.95 L3.38 39.96 L3.54 41.97 L3.66 43.98 L3.79 46.03 L3.93 48.10 L4.12 50.17 L4.35 52.24 L4.59 54.30 L4.78 56.35 L4.85 58.40 L4.76 60.44 L4.50 62.47 L4.10 64.49 L3.63 66.52 L3.18 68.59 L2.85 70.70 L2.71 72.85 L2.81 74.99 L3.11 77.10 L3.54 79.17 L4.01 81.19 L4.44 83.20 L4.76 85.22 L4.95 87.26 L5.02 89.31 L5.05 91.37 L5.09 93.44 L5.16 95.50 L5.32 97.57 L5.55 99.62Z", "M8.63 3.92 L10.69 3.54 L12.75 3.39 L14.81 3.48 L16.87 3.71 L18.94 3.91 L21.00 3.98 L23.06 3.92 L25.12 3.83 L27.18 3.82 L29.24 4.01 L31.31 4.37 L33.37 4.79 L35.43 5.10 L37.49 5.18 L39.55 4.97 L41.61 4.58 L43.67 4.16 L45.73 3.86 L47.79 3.75 L49.85 3.78 L51.91 3.83 L53.97 3.77 L56.03 3.57 L58.09 3.28 L60.15 3.05 L62.21 3.01 L64.27 3.23 L66.33 3.66 L68.40 4.14 L70.46 4.51 L72.52 4.65 L74.58 4.56 L76.64 4.34 L78.70 4.15 L80.76 4.09 L82.82 4.15 L84.89 4.24 L86.95 4.22 L89.01 4.00 L91.06 3.60", "M91.79 95.52 L89.71 95.61 L87.62 95.56 L85.53 95.49 L83.45 95.50 L81.36 95.63 L79.28 95.82 L77.20 95.96 L75.11 95.94 L73.02 95.73 L70.93 95.37 L68.83 95.00 L66.74 94.76 L64.66 94.73 L62.57 94.91 L60.49 95.21 L58.41 95.49 L56.33 95.65 L54.25 95.69 L52.16 95.68 L50.07 95.72 L47.99 95.91 L45.91 96.23 L43.83 96.60 L41.75 96.89 L39.67 96.98 L37.58 96.83 L35.49 96.52 L33.39 96.17 L31.30 95.93 L29.22 95.85 L27.13 95.93 L25.05 96.06 L22.96 96.13 L20.88 96.09 L18.79 95.96 L16.70 95.84 L14.61 95.85 L12.53 96.07 L10.45 96.47 L8.37 96.94"], ["M-1.26 6.24 L0.87 6.63 L3.06 6.87 L5.29 6.79 L7.51 6.43 L9.64 5.90 L11.65 5.33 L13.66 4.98 L15.73 4.88 L17.86 4.91 L20.03 4.92 L22.19 4.78 L24.33 4.51 L26.45 4.23 L28.55 4.14 L30.61 4.34 L32.67 4.82 L34.78 5.45 L36.96 5.99 L39.21 6.29 L41.45 6.27 L43.61 6.05 L45.68 5.82 L47.72 5.71 L49.79 5.76 L51.94 5.86 L54.15 5.85 L56.35 5.58 L58.51 5.05 L60.62 4.38 L62.71 3.80 L64.79 3.47 L66.88 3.45 L69.00 3.64 L71.14 3.88 L73.33 3.98 L75.53 3.88 L77.69 3.65 L79.75 3.48 L81.74 3.49 L83.74 3.74 L85.83 4.14 L88.03 4.53 L90.28 4.72 L92.51 4.49 L94.66 4.06 L96.76 3.65 L98.86 3.42 L100.99 3.50 L101.01 3.26 L98.87 3.11 L96.71 3.06 L94.56 3.09 L92.46 3.02 L90.42 2.75 L88.40 2.37 L86.31 1.85 L84.12 1.37 L81.84 1.13 L79.57 1.25 L77.38 1.64 L75.29 2.11 L73.24 2.49 L71.17 2.66 L69.05 2.66 L66.89 2.64 L64.72 2.76 L62.56 3.10 L60.41 3.61 L58.29 4.09 L56.20 4.37 L54.15 4.35 L52.09 4.09 L49.97 3.73 L47.77 3.48 L45.54 3.46 L43.36 3.67 L41.27 3.93 L39.25 4.09 L37.23 4.03 L35.13 3.77 L32.95 3.42 L30.73 3.19 L28.53 3.21 L26.37 3.46 L24.24 3.81 L22.13 4.06 L20.03 4.08 L17.93 3.88 L15.79 3.60 L13.60 3.42 L11.36 3.51 L9.13 3.88 L7.02 4.53 L5.00 5.18 L2.99 5.64 L0.91 5.85 L-1.23 5.89Z", "M95.58 -0.26 L95.10 1.82 L94.65 3.90 L94.40 6.01 L94.33 8.14 L94.35 10.26 L94.40 12.32 L94.32 14.34 L94.12 16.37 L93.92 18.47 L93.87 20.65 L94.09 22.84 L94.54 24.98 L95.07 27.03 L95.50 29.02 L95.70 31.01 L95.66 33.04 L95.45 35.12 L95.22 37.23 L95.09 39.34 L95.08 41.45 L95.09 43.53 L94.99 45.58 L94.68 47.60 L94.18 49.62 L93.62 51.69 L93.18 53.84 L93.03 56.05 L93.19 58.26 L93.54 60.38 L93.92 62.41 L94.19 64.40 L94.31 66.42 L94.35 68.50 L94.44 70.62 L94.67 72.74 L95.04 74.84 L95.43 76.92 L95.66 78.97 L95.61 81.01 L95.26 83.04 L94.72 85.08 L94.17 87.16 L93.76 89.29 L93.71 91.45 L93.89 93.55 L94.10 95.61 L94.22 97.66 L94.20 99.75 L94.58 99.80 L95.04 97.73 L95.32 95.62 L95.42 93.50 L95.45 91.44 L95.51 89.43 L95.62 87.40 L95.89 85.32 L96.21 83.20 L96.40 81.06 L96.37 78.93 L96.14 76.82 L95.87 74.72 L95.69 72.65 L95.72 70.60 L95.91 68.56 L96.15 66.47 L96.28 64.32 L96.18 62.14 L95.90 60.00 L95.56 57.95 L95.33 55.98 L95.30 54.03 L95.48 52.01 L95.76 49.92 L95.98 47.78 L96.05 45.63 L95.95 43.52 L95.81 41.43 L95.79 39.37 L95.98 37.32 L96.36 35.26 L96.80 33.18 L97.13 31.05 L97.21 28.87 L97.02 26.69 L96.70 24.57 L96.42 22.53 L96.27 20.55 L96.27 18.56 L96.33 16.49 L96.32 14.36 L96.14 12.21 L95.79 10.11 L95.34 8.05 L95.05 6.01 L95.05 3.95 L95.34 1.87 L95.82 -0.21Z", "M98.82 95.87 L96.76 95.89 L94.70 95.91 L92.64 95.91 L90.59 95.85 L88.54 95.70 L86.50 95.55 L84.44 95.37 L82.36 95.24 L80.26 95.20 L78.15 95.29 L76.05 95.48 L73.97 95.72 L71.94 95.93 L69.95 96.05 L67.98 96.04 L66.01 95.89 L64.01 95.63 L61.97 95.32 L59.88 95.03 L57.77 94.83 L55.66 94.76 L53.56 94.80 L51.49 94.91 L49.44 95.03 L47.40 95.10 L45.36 95.10 L43.31 95.03 L41.25 94.93 L39.18 94.87 L37.10 94.88 L35.02 95.02 L32.94 95.26 L30.87 95.57 L28.81 95.86 L26.76 96.07 L24.73 96.12 L22.72 96.02 L20.71 95.76 L18.69 95.42 L16.64 95.05 L14.56 94.73 L12.47 94.50 L10.38 94.37 L8.30 94.48 L6.25 94.66 L4.21 94.81 L2.16 94.89 L0.10 94.90 L0.06 95.29 L2.10 95.70 L4.16 96.04 L6.23 96.29 L8.30 96.47 L10.34 96.58 L12.36 96.58 L14.38 96.66 L16.42 96.81 L18.48 97.00 L20.56 97.18 L22.66 97.27 L24.76 97.22 L26.85 97.02 L28.93 96.69 L30.99 96.32 L33.04 95.97 L35.08 95.72 L37.12 95.61 L39.15 95.65 L41.19 95.81 L43.24 96.03 L45.30 96.24 L47.37 96.41 L49.45 96.51 L51.51 96.57 L53.56 96.63 L55.57 96.75 L57.57 96.95 L59.57 97.25 L61.60 97.62 L63.66 97.98 L65.77 98.27 L67.91 98.41 L70.06 98.37 L72.18 98.15 L74.27 97.81 L76.32 97.43 L78.34 97.09 L80.35 96.84 L82.36 96.70 L84.40 96.66 L86.45 96.67 L88.52 96.68 L90.59 96.59 L92.65 96.45 L94.71 96.28 L96.77 96.13 L98.82 96.11Z", "M3.66 99.23 L3.80 97.18 L3.91 95.12 L4.09 93.10 L4.42 91.14 L4.90 89.21 L5.31 87.21 L5.70 85.12 L5.88 82.95 L5.75 80.78 L5.34 78.68 L4.78 76.64 L4.26 74.64 L3.92 72.65 L3.80 70.64 L3.85 68.61 L3.95 66.55 L3.96 64.48 L3.85 62.39 L3.69 60.33 L3.59 58.33 L3.67 56.40 L3.96 54.49 L4.41 52.53 L4.90 50.47 L5.24 48.33 L5.31 46.17 L5.13 44.05 L4.81 42.00 L4.51 39.99 L4.35 37.98 L4.37 35.95 L4.48 33.90 L4.56 31.84 L4.48 29.75 L4.22 27.65 L3.86 25.57 L3.55 23.54 L3.44 21.58 L3.55 19.66 L3.84 17.71 L4.18 15.68 L4.42 13.58 L4.45 11.45 L4.17 9.37 L3.82 7.34 L3.61 5.32 L3.63 3.29 L3.91 1.24 L3.67 1.20 L3.27 3.24 L2.92 5.29 L2.69 7.36 L2.50 9.41 L2.27 11.41 L2.09 13.37 L1.80 15.35 L1.51 17.41 L1.35 19.54 L1.47 21.71 L1.89 23.83 L2.50 25.88 L3.13 27.88 L3.60 29.86 L3.82 31.85 L3.78 33.87 L3.60 35.91 L3.42 37.96 L3.33 40.04 L3.34 42.11 L3.36 44.14 L3.27 46.11 L3.01 48.03 L2.57 49.97 L2.08 52.01 L1.68 54.13 L1.55 56.31 L1.73 58.46 L2.13 60.54 L2.59 62.56 L2.95 64.55 L3.13 66.56 L3.14 68.59 L3.09 70.64 L3.10 72.71 L3.25 74.80 L3.52 76.89 L3.77 78.93 L3.87 80.90 L3.75 82.82 L3.41 84.74 L2.96 86.73 L2.56 88.82 L2.50 90.98 L2.69 93.10 L3.01 95.16 L3.30 97.19 L3.42 99.22Z", "M7.52 5.78 L9.63 5.19 L11.75 4.72 L13.88 4.50 L16.01 4.54 L18.15 4.70 L20.28 4.80 L22.41 4.72 L24.54 4.46 L26.66 4.15 L28.79 3.97 L30.92 4.07 L33.06 4.42 L35.20 4.91 L37.35 5.31 L39.48 5.49 L41.61 5.40 L43.74 5.16 L45.86 4.94 L47.99 4.90 L50.13 5.04 L52.26 5.27 L54.40 5.40 L56.53 5.27 L58.65 4.87 L60.77 4.30 L62.88 3.75 L65.01 3.42 L67.14 3.35 L69.27 3.45 L71.41 3.57 L73.54 3.53 L75.66 3.30 L77.79 2.95 L79.91 2.66 L82.04 2.61 L84.18 2.85 L86.32 3.29 L88.46 3.75 L90.60 4.03 L92.73 4.05", "M90.84 96.52 L88.78 96.49 L86.72 96.41 L84.67 96.31 L82.61 96.27 L80.55 96.32 L78.49 96.49 L76.43 96.75 L74.37 97.06 L72.31 97.34 L70.25 97.51 L68.20 97.52 L66.14 97.38 L64.09 97.11 L62.03 96.77 L59.98 96.44 L57.92 96.19 L55.87 96.05 L53.81 96.01 L51.75 96.04 L49.70 96.07 L47.64 96.05 L45.58 95.97 L43.53 95.83 L41.47 95.67 L39.42 95.56 L37.36 95.55 L35.30 95.67 L33.24 95.91 L31.18 96.24 L29.12 96.58 L27.06 96.84 L25.00 96.97 L22.94 96.94 L20.88 96.77 L18.83 96.51 L16.78 96.23 L14.72 95.99 L12.67 95.84 L10.61 95.78 L8.55 95.77"]];

  var azHareket = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = PROJELER.length, act = 0;
  var rot = 0;   // ondalıklı dönüş (masaüstünde kaydırmadan: p × (N−1)); act = Math.round(rot)
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var mobil = function () { return innerWidth < 760; };

  /* ---------- sahne ölçeği (1280x800 tasarım) ---------- */
  var kap = $('proje-sahne'), sahne = $('psahne'), iz = $('proje-iz');
  function olc() {
    var w = kap.clientWidth, h = kap.clientHeight, k, x;
    if (mobil()) { k = w / 640; x = (640 - 560) * k; }         // telefonda karusel ortada, panel aşağıda ayrı
    else { k = Math.min(w / 1280, h / 800); x = 0; }
    sahne.style.transform = 'translateX(calc(-50% + ' + x + 'px)) scale(' + k + ')';
    sahne.style.top = mobil() ? (150 - 130 * k) + 'px' : (h - 800 * k) + 'px';
    if (mobil()) kap.style.height = Math.round((720 - 130) * k + 150 + 70) + 'px'; else kap.style.height = '';
    iz.style.height = mobil() ? '' : (N * 100) + 'vh';            // her proje ~1 ekran kaydırma (referansta eksikti)
  }

  /* ---------- kartlar ---------- */
  var kartKap = $('kartlar'), kartlar = [];
  function kalemSvg(p) {
    return '<svg class="kalem" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><g filter="url(#pencil2)">' +
      '<path d="' + p[0] + '" fill="#F9D648"/><path d="' + p[1] + '" fill="#F9D648"/><path d="' + p[2] + '" fill="#F9D648"/><path d="' + p[3] + '" fill="#F9D648"/>' +
      '<path d="' + p[4] + '" fill="none" stroke="#FFF0A8" stroke-width=".9" stroke-opacity=".75" vector-effect="non-scaling-stroke"/>' +
      '<path d="' + p[5] + '" fill="none" stroke="#FFF0A8" stroke-width=".9" stroke-opacity=".75" vector-effect="non-scaling-stroke"/></g></svg>';
  }
  function gorselHtml(p, i) {
    var g = p.gorseller && p.gorseller[i];
    return g ? '<img src="' + esc(g) + '" alt="' + esc(p.ad) + '" loading="lazy">' : '<span class="vt">' + (p.kilitli ? T.kilitli : T.gorsel) + '</span>';
  }
  PROJELER.forEach(function (p, i) {
    var d = document.createElement('div');
    d.className = 'kart';
    // yalnızca öndeki (aktif) kilitsiz kart: tıkla / Enter / Space → detay
    d.addEventListener('click', function () { if (i === act && !p.kilitli) ac(i, d); });
    d.addEventListener('keydown', function (e) {
      if (i !== act || p.kilitli) return;
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); ac(i, d); }
    });
    d.innerHTML = '<div class="kart-ic"><div class="kart-kes" style="clip-path:url(#kc' + (i % 3) + ')">' +
      '<div class="kart-gorsel" style="background:' + p.renk + '">' + gorselHtml(p, 0) + '</div>' +
      '<div class="kart-yazi"><span class="vt kart-no">' + T.numara + String(i + 1).padStart(2, '0') + '</span><span class="px kart-ad">' + esc(p.ad) + '</span></div>' +
      '</div>' + kalemSvg(KALEM[i % 3]) + '</div>';
    kartKap.appendChild(d); kartlar.push(d);
  });

  /* ---------- panel (masaüstü sağda, telefonda aşağıda) ---------- */
  var paneller = [$('panel'), $('panel-mobil')];
  paneller.forEach(function (pn) {
    pn.innerHTML = '<div class="tarama" aria-hidden="true"></div>' +
      '<span class="vt pn-ust"></span><span class="px pn-ad"></span><span class="vt pn-acik"></span>' +
      '<div class="pn-statlar">' + [0, 1, 2].map(function () {
        return '<div class="stat"><div class="vt stat-ust"><span class="stat-ad"></span><span class="stat-deger"></span></div><div class="segler">' +
          '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div></div>';
      }).join('') + '</div>' +
      '<span class="vt pn-imlec"><span class="pn-imlec-yazi"></span><span class="imlec" aria-hidden="true">_</span></span>';
  });
  function statDoldur(kok, araclar) {
    var st = kok.querySelectorAll('.stat');
    st.forEach(function (s, si) {
      var a = araclar[si];
      s.style.display = a ? '' : 'none';
      if (!a) return;
      s.querySelector('.stat-ad').textContent = a[0];
      s.querySelector('.stat-deger').textContent = a[1] + '/10';
      var seg = s.querySelectorAll('.segler span');
      // çubuk her yeni projede baştan dolsun: geçişsiz boşalt → yeniden doldur
      seg.forEach(function (g) { g.style.transition = 'none'; g.classList.remove('dolu'); });
      void s.offsetWidth;
      seg.forEach(function (g, k) {
        g.style.transition = '';
        g.style.transitionDelay = (si * 0.12 + k * 0.04).toFixed(2) + 's';
        g.classList.toggle('dolu', k < a[1]);
      });
    });
  }
  function panelCiz() {
    var p = PROJELER[act];
    paneller.forEach(function (pn) {
      pn.querySelector('.pn-ust').textContent = T.oyuncu + T.numara + String(act + 1).padStart(2, '0');
      pn.querySelector('.pn-ad').textContent = p.ad;
      pn.querySelector('.pn-acik').textContent = p.kisa || '';
      statDoldur(pn, p.araclar || []);
      pn.querySelector('.pn-imlec').classList.toggle('kilitli', !!p.kilitli);
      pn.querySelector('.pn-imlec-yazi').textContent = p.kilitli ? T.imlecKilit : T.imlecSec;
    });
  }

  /* ---------- dijital ses (Web Audio, dosyasız) ----------
     İlk tıklama / dokunma / tuştan önce hiç çalmaz. Hata olursa sessizce geçer. */
  var sesAcik = true, sesCtx = null, sonBip = 0;
  try { sesAcik = localStorage.getItem('sirk-ses') !== '0'; } catch (e) {}
  function sesUyandir() {
    try {
      if (!sesCtx) { var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return; sesCtx = new AC(); }
      if (sesCtx.state === 'suspended') sesCtx.resume();
    } catch (e) {}
  }
  ['pointerdown', 'touchend', 'keydown', 'click'].forEach(function (t) { addEventListener(t, sesUyandir, { capture: true, passive: true }); });
  // square dalga; f1→f2 kayma, hızlı sönüm
  function ton(f1, f2, sure, gecikme) {
    if (!sesAcik || !sesCtx) return;
    try {
      var t = sesCtx.currentTime + (gecikme || 0), o = sesCtx.createOscillator(), g = sesCtx.createGain();
      o.type = 'square';
      o.frequency.setValueAtTime(f1, t);
      if (f2 && f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, t + sure);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.05, t + 0.005);
      g.gain.exponentialRampToValueAtTime(0.0001, t + sure);
      o.connect(g); g.connect(sesCtx.destination);
      o.start(t); o.stop(t + sure + 0.02);
    } catch (e) {}
  }
  function bip() {                     // aktif proje değişti (en fazla 90ms'de bir)
    var s = Date.now(); if (s - sonBip < 90) return; sonBip = s;
    ton(880, 1320, 0.07);
  }
  function sesAcildi() { ton(660, 660, 0.06); ton(880, 880, 0.06, 0.06); ton(1320, 1320, 0.06, 0.12); }
  function sesKapandi() { ton(440, 440, 0.08); }
  var sesDugme = $('ses-dugme');
  function sesDugmeCiz() { sesDugme.setAttribute('aria-pressed', sesAcik ? 'true' : 'false'); sesDugme.textContent = sesAcik ? T.sesAcik : T.sesKapali; }
  sesDugme.addEventListener('click', function () {
    sesAcik = !sesAcik; sesDugmeCiz();
    try { localStorage.setItem('sirk-ses', sesAcik ? '1' : '0'); } catch (e) {}
  });
  sesDugmeCiz();

  /* ---------- yörünge yerleşimi ---------- */
  var disk = $('disk'), sayac = $('sayac');
  // konum / ölçek / parlaklık / disk: ondalıklı rot'tan (kesintisiz)
  function yerlestir() {
    var step = 2 * Math.PI / N;
    kartlar.forEach(function (k, i) {
      var th = (i - rot) * step, x = Math.sin(th) * 265, derin = Math.cos(th);
      var sc = 0.55 + 0.45 * (derin + 1) / 2, y = (1 - derin) * -46;
      k.style.zIndex = Math.round((derin + 1) * 10);
      k.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px) scale(' + sc.toFixed(3) + ')';
      k.style.filter = derin > 0.95 ? 'drop-shadow(0 0 24px rgba(255,200,90,.45)) drop-shadow(0 26px 30px rgba(5,0,20,.7))'
        : 'brightness(' + (0.35 + 0.35 * (derin + 1) / 2).toFixed(2) + ') saturate(.7) blur(' + (derin < -0.5 ? 2 : 0.6) + 'px)';
    });
    disk.style.transform = 'scaleY(.18) rotate(' + (-rot * 360 / N).toFixed(2) + 'deg)';
  }
  // panel / sayaç / aria / tıklanabilirlik: en yakın proje (yalnızca değişince)
  function aktifCiz() {
    var odakKartta = kartlar.indexOf(document.activeElement) !== -1;
    kartlar.forEach(function (k, i) {
      var on = i === act, p = PROJELER[i], tikla = on && !p.kilitli;
      k.setAttribute('aria-hidden', on ? 'false' : 'true');
      k.classList.toggle('tikla', tikla);
      if (tikla) { k.setAttribute('role', 'button'); k.tabIndex = 0; k.setAttribute('aria-label', T.ac(p.ad)); }
      else { k.removeAttribute('role'); k.removeAttribute('tabindex'); k.removeAttribute('aria-label'); }
    });
    if (odakKartta && kartlar[act].classList.contains('tikla')) kartlar[act].focus({ preventScroll: true });
    sayac.textContent = String(act + 1).padStart(2, '0') + '/' + String(N).padStart(2, '0');
    panelCiz();
  }
  function rotAyarla(r) {
    rot = Math.max(0, Math.min(N - 1, r));
    yerlestir();
    var yeni = Math.round(rot);
    if (yeni !== act) { act = yeni; aktifCiz(); bip(); }
  }
  function secAct(i) { i = Math.max(0, Math.min(N - 1, i)); if (i === act && rot === i) return; rotAyarla(i); }

  /* ---------- kaydırma: bölüm sabit, kesintisiz dönüş; son projeden sonra sayfa devam eder ---------- */
  var kare = 0;
  function kaydir() {
    if (mobil()) return;
    var toplam = iz.offsetHeight - innerHeight;
    var p = toplam > 0 ? Math.min(1, Math.max(0, (scrollY - iz.offsetTop) / toplam)) : 0;
    rotAyarla(p * (N - 1));
  }
  function kaydirKare() { if (!kare) kare = requestAnimationFrame(function () { kare = 0; kaydir(); }); }
  function git(i) {
    i = Math.max(0, Math.min(N - 1, i));
    if (mobil()) { secAct(i); return; }
    var toplam = iz.offsetHeight - innerHeight;
    scrollTo({ top: iz.offsetTop + (N > 1 ? i / (N - 1) : 0) * toplam, behavior: azHareket ? 'auto' : 'smooth' });
  }
  addEventListener('keydown', function (e) {
    if (acik) {
      if (e.key === 'Escape') kapat();
      if (e.key === 'Tab') { // aria-modal: odak pencerede kalsın
        var od = [].filter.call(detay.querySelectorAll('button,a[href]'), function (el) { return el.offsetParent !== null; });
        if (!od.length) return;
        var ilk = od[0], son = od[od.length - 1];
        if (!detay.contains(document.activeElement)) { e.preventDefault(); ilk.focus(); }
        else if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
        else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
      }
      return;
    }
    var r = kap.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); git(act + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); git(act - 1); }
  });
  // telefonda sola-sağa kaydırma
  var tx = null;
  kap.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
  kap.addEventListener('touchend', function (e) {
    if (tx === null || !mobil()) return;
    var dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) > 40) secAct(act + (dx < 0 ? 1 : -1));
  });

  /* ---------- detay penceresi ---------- */
  var perde = $('detay-perde'), detay = $('detay'), acik = false, geriOdak = null, gi = 0;
  function detayGorsel() {
    var p = PROJELER[act], gs = p.gorseller || [];
    $('d-ana').style.background = p.renk;
    $('d-ana').innerHTML = gorselHtml(p, gi);
    var th = $('d-kucukler');
    th.style.display = gs.length > 1 ? '' : 'none';
    th.innerHTML = gs.length > 1 ? gs.map(function (g, i) {
      return '<button type="button" class="' + (i === gi ? 'aktif' : '') + '" aria-pressed="' + (i === gi) + '" aria-label="' + T.gorselNo + (i + 1) + '"><img src="' + esc(g) + '" alt=""></button>';
    }).join('') : '';
    [].forEach.call(th.children, function (b, i) { b.addEventListener('click', function () { gi = i; detayGorsel(); }); });
  }
  function ac(i, kaynak) {
    var p = PROJELER[i]; if (p.kilitli) return;
    gi = 0; geriOdak = kaynak || null;
    $('d-no').textContent = T.numara + String(i + 1).padStart(2, '0') + T.profil;
    $('d-ad').textContent = p.ad;
    $('d-rol').textContent = p.rol ? T.rol + p.rol : ''; $('d-rol').style.display = p.rol ? '' : 'none';
    $('d-yil').textContent = p.yil ? T.yil + p.yil : ''; $('d-yil').style.display = p.yil ? '' : 'none';
    $('d-acik').textContent = p.uzun || p.kisa || '';
    statDoldur(detay, p.araclar || []);
    var l = $('d-link'); l.style.display = p.link ? '' : 'none'; if (p.link) l.href = p.link;
    $('d-kalem').innerHTML = kalemSvg(KALEM[i % 3]).replace(/^<svg class="kalem"/, '<svg class="kalem"');
    $('d-kes').style.clipPath = 'url(#kc' + (i % 3) + ')';
    detayGorsel();
    acik = true; document.body.classList.add('detay-acik');
    detay.removeAttribute('hidden'); perde.removeAttribute('hidden');
    requestAnimationFrame(function () { detay.classList.add('acik'); perde.classList.add('acik'); $('d-kapat').focus(); });
    sesAcildi();
  }
  function kapat() {
    if (!acik) return;
    acik = false; detay.classList.remove('acik'); perde.classList.remove('acik'); document.body.classList.remove('detay-acik');
    setTimeout(function () { if (!acik) { detay.setAttribute('hidden', ''); perde.setAttribute('hidden', ''); } }, 700);
    sesKapandi();
    if (geriOdak) geriOdak.focus({ preventScroll: true });
  }
  $('d-kapat').addEventListener('click', kapat);
  perde.addEventListener('click', kapat);

  /* ---------- başlat ---------- */
  function hepsi() { olc(); if (mobil()) { if (rot !== act) rotAyarla(act); } else kaydir(); }
  addEventListener('resize', hepsi);
  addEventListener('scroll', kaydirKare, { passive: true });
  olc(); yerlestir(); aktifCiz(); kaydir();
  var hm = /^#proje-(\d+)$/.exec(location.hash);
  if (hm) {
    var hi = Math.max(0, Math.min(N - 1, parseInt(hm[1], 10) - 1));
    if (mobil()) { secAct(hi); scrollTo(0, iz.offsetTop); }
    else { scrollTo(0, iz.offsetTop + (N > 1 ? hi / (N - 1) : 0) * (iz.offsetHeight - innerHeight)); kaydir(); }
  }
})();
