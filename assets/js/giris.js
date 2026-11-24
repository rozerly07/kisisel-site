// Sahne 1280x800 tasarlandı; ekrana birebir oranla ölçeklenir.
// (referans/giris-sahnesi.html'deki script — değerler aynen)
(function(){
  var kap=document.getElementById('sahne-kap'), s=document.getElementById('sahne');
  if(!kap||!s) return;
  function olc(){
    var w=kap.clientWidth, h=kap.clientHeight;
    var k = Math.min(w/1280, h/800);   // sahnenin tamamı görünür, yanları zemin+gök doldurur
    if (w < 760) k = w/740;            // telefon: başlık sığsın, kenarlar kırpılır
    s.style.transform='translateX(-50%) scale('+k+')';
    s.style.top = (h - 800*k) + 'px';  // zemin hep altta
  }
  addEventListener('resize', olc); olc();
})();
