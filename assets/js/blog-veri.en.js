/* blog-veri.en.js — blog-veri.js'in İngilizce kopyası (en/ sayfaları bunu yükler).
   Dosya adları, renkler, kapaklar ve süreler aynı; metinler çevrildi. */
window.YAZILAR = [
  { dosya: 'blog-1.html', baslik: 'How Light Transforms a Space in Blender and Interior Design', ozet: 'Light is one of the most important things that shapes the atmosphere of a space. Used well, it can turn even an ordinary scene into a striking visual story.', kategori: '3D & Interiors', renk: '#C6306E', tarih: '25 Nov 2026', sure: 2, etiketler: ['blender', '3d', 'interior design', 'light'], kapak: '../assets/img/blog/blog-1-kapak.webp', yedek: 'linear-gradient(150deg,#2A0D57,#C6306E 70%,#FF8A3D)' },
  { dosya: 'blog-2.html', baslik: 'The Small Details You Miss When Designing Fast in Canva', ozet: 'Ready-made templates give you a quick start, but the secret of good design lies in the small details. Layout, typography and colour harmony change the whole design.', kategori: 'Design Tips', renk: '#2340C8', tarih: '25 Nov 2026', sure: 2, etiketler: ['canva', 'design', 'typography', 'layout'], kapak: '../assets/img/blog/blog-2-kapak.webp', yedek: 'linear-gradient(150deg,#0E3A6E,#6A1B7A 60%,#FF5A8A)' },
  { dosya: 'blog-3.html', baslik: 'Why Do Moving Visuals Grab Our Attention?', ozet: 'Even small movements can change how a website tells its story. The power of animation lies not in complex effects, but in using it at the right time and in the right place.', kategori: 'Graphics & Animation', renk: '#6A1B7A', tarih: '25 Nov 2026', sure: 2, etiketler: ['animation', 'graphic design', 'motion', 'visual communication'], kapak: '../assets/img/blog/blog-3-kapak.webp', yedek: 'linear-gradient(150deg,#6A1B7A,#FF8A3D 70%,#FFC66B)' }
];

/* Pano ve yazı sayfalarının arayüz metinleri */
window.BLOG_METIN = {
  tumu: 'ALL',
  dk: 'min',
  dkOkuma: 'min read',
  oku: 'READ →',
  hepsi: function (n) { return 'Showing ' + n + (n === 1 ? ' post' : ' posts'); },
  sayi: function (n) { return n + (n === 1 ? ' post' : ' posts'); }
};
