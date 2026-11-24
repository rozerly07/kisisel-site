// Sahne 1280x800 tasarlandı; ekrana birebir oranla ölçeklenir.
// (referans/giris-sahnesi.html'deki script — değerler aynen; kök index ve tr/index ortak)
(function(){
  var kap=document.getElementById('sahne-kap'), s=document.getElementById('sahne');
  if(!kap||!s) return;
  var bas=s.querySelector('h1');
  function olc(){
    var w=kap.clientWidth, h=kap.clientHeight;
    var k = Math.min(w/1280, h/800);   // sahnenin tamamı görünür, yanları zemin+gök doldurur
    if (w < 760) {
      k = w/740;                       // telefon: başlık sığsın, kenarlar kırpılır
      // başlık + iki yandan 24px taşan ampul sırası ekrana tam sığsın (kenarlarda 12px pay)
      if (bas) k = Math.min(k, (w - 24) / (bas.offsetWidth + 48));
    }
    s.style.transform='translateX(-50%) scale('+k+')';
    s.style.top = (h - 800*k) + 'px';  // zemin hep altta
  }
  addEventListener('resize', olc); olc();
  // font geç yüklenirse başlık genişliği değişir: yeniden ölç
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(olc);
})();
