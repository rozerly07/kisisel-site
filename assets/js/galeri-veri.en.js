/* galeri-veri.en.js — galeri-veri.js'in İngilizce kopyası (en/ sayfaları bunu yükler).
   Yollar ve renkler aynı; yalnızca alt / aciklama çevrildi. */
window.GALERI = [
  { src: '../assets/img/gallery/galeripic1.webp', alt: 'out and about with one of my tiny friends', aciklama: 'out and about with one of my tiny friends', renk: 'linear-gradient(150deg,#3A1260,#C6306E)' },
  { src: '../assets/img/gallery/galeripic2.webp', alt: 'quality time with friends', aciklama: 'quality time with friends', renk: 'linear-gradient(150deg,#FFC66B,#FF5A6E)' },
  { src: '../assets/img/gallery/galeripic3.webp', alt: 'a great day to get ready and go out', aciklama: 'a great day to get ready and go out', renk: 'linear-gradient(150deg,#2A0D57,#7FA8FF)' },
  { src: '../assets/img/gallery/galeripic4.webp', alt: 'back to childhood', aciklama: 'back to childhood', renk: 'linear-gradient(150deg,#FF8A3D,#6A1B7A)' },
  { src: '../assets/img/gallery/galeripic5.webp', alt: 'a teeny-tiny, super-soft friend', aciklama: 'a teeny-tiny, super-soft friend', renk: 'linear-gradient(150deg,#5B1E6E,#FFB0C8)' },
  { src: '../assets/img/gallery/galeripic6.webp', alt: 'in awe of the sky', aciklama: 'in awe of the sky', renk: 'linear-gradient(150deg,#1E0838,#FF8A3D)' },
  { src: '../assets/img/gallery/galeripic7.webp', alt: 'a walk on a rainy day', aciklama: 'a walk on a rainy day', renk: 'linear-gradient(150deg,#C6306E,#FFC66B)' },
  { src: '../assets/img/gallery/galeripic8.webp', alt: 'a view is there to be enjoyed', aciklama: 'a view is there to be enjoyed', renk: 'linear-gradient(150deg,#0E3A6E,#FF5A8A)' },
  { src: '../assets/img/gallery/galeripic9.webp', alt: 'the quiet of the classroom while waiting for friends', aciklama: 'the quiet of the classroom while waiting for friends', renk: 'linear-gradient(150deg,#6A1B7A,#FFC66B)' }
];

/* Arayüz metinleri. karo-duvar.js değiştirilmeyen bir kopya olduğu için onun Türkçe
   aria-label'larını sayfa scripti etiketle() ile İngilizceye çevirir. */
window.GALERI_METIN = {
  foto: 'Photo',
  buyut: 'enlarge',
  etiketle: function (kutu) {
    if (!kutu) return;
    [].forEach.call(kutu.querySelectorAll('.kd-karo'), function (b) {
      b.setAttribute('aria-label', (b.getAttribute('aria-label') || '')
        .replace(/^Fotoğraf /, 'Photo ').replace(/ — büyüt$/, ' — enlarge'));
    });
  }
};
