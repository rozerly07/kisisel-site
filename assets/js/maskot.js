// maskot.js — kök index.html + tr/index.html ortak
// (referans/anasayfa.html "3. Maskot" bölümü; değerler aynen)
// Ekrana sabit, kendi dolaşır, imleç dokununca kaçar; hareket ederken yan görünüm, durunca önden.
(function () {
  var azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mk = document.getElementById('maskot');
  if (!mk) return;
  var yon = mk.querySelector('.maskot-yon');
  // görsel yolları sayfa derinliğinden bağımsız: ön görselin kendi adresinden
  var mkImg = mk.querySelector('.maskot-gorsel'), MK_ON = mkImg.src, MK_YAN = MK_ON.replace(/on\.webp$/, 'yan-sag.webp'), mkt;
  new Image().src = MK_YAN; // yan görünümü önceden yükle
  var m = { x: 12, y: 85 }, kaciyor = false, kt;
  function git(x, y, sure) {
    yon.style.transform = 'scaleX(' + (x < m.x ? -1 : 1) + ')';
    mk.style.transition = 'left ' + sure + ' cubic-bezier(.3,.8,.3,1),top ' + sure + ' cubic-bezier(.3,.8,.3,1)';
    mk.style.left = x + 'vw'; mk.style.top = y + 'vh'; m = { x: x, y: y };
    mkImg.src = MK_YAN; clearTimeout(mkt); mkt = setTimeout(function () { mkImg.src = MK_ON; }, parseFloat(sure) * 1000);
  }
  if (!azHareket) {
    setInterval(function () { if (!kaciyor) git(8 + Math.random() * 84, 72 + Math.random() * 18, '2.8s'); }, 4200);
    mk.addEventListener('mouseenter', function () {
      var x = m.x < 50 ? 55 + Math.random() * 35 : 8 + Math.random() * 35;
      kaciyor = true; git(x, 20 + Math.random() * 65, '.45s');
      clearTimeout(kt); kt = setTimeout(function () { kaciyor = false; }, 1500);
    });
  }
})();
