/* iletisim.js — tr/contact.html bilet formu (referans/iletisim.html'den BİREBİR) */
(function () {
  /* Formspree adresi (formspree.io'dan alınan). Boşsa form gerçek gönderim yapmaz, sadece animasyonu gösterir. */
  var FORMSPREE = ''; // content/ICERIK.md'de Formspree adresi yok → gösterim modu
  var $ = function (id) { return document.getElementById(id); };
  var form = $('bilet-form'), durum = $('form-durum'), bilet = $('bilet'), yeni = $('yeni-bilet');
  // en/contact.html: iletisim.en.js yüklüyse uyarılar İngilizce
  var T = window.ILETISIM_EN || {
    ad: 'Adını yaz (en az 2 harf).', eposta: 'Geçerli bir e-posta adresi yaz (ör. ad@mail.com).',
    konu: 'Bir konu yaz.', mesaj: 'Mesajın en az 10 karakter olsun.',
    basari: 'Biletin gişeye ulaştı. En kısa sürede dönüş yapacağım.', eksik: 'Bilet eksik: işaretli alanları düzelt.',
    gonderiliyor: 'Bilet gönderiliyor…', hata: 'Bilet gönderilemedi. Bağlantını kontrol et ya da doğrudan e-posta gönder.',
    bilgi: 'Bütün alanlar zorunlu. Bilgilerin sadece bana ulaşır.'
  };
  var KURAL = {
    ad: function (v) { return v.trim().length >= 2 ? '' : T.ad; },
    eposta: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : T.eposta; },
    konu: function (v) { return v.trim().length >= 2 ? '' : T.konu; },
    mesaj: function (v) { return v.trim().length >= 10 ? '' : T.mesaj; }
  };
  function denetle(alan) {
    var h = KURAL[alan.name](alan.value), k = $('hata-' + alan.name);
    k.textContent = h; alan.setAttribute('aria-invalid', h ? 'true' : 'false');
    alan.parentNode.classList.toggle('hatali', !!h);
    return !h;
  }
  [].forEach.call(form.elements, function (a) {
    if (!KURAL[a.name]) return;
    a.addEventListener('blur', function () { if (a.value) denetle(a); });
    a.addEventListener('input', function () { if (a.getAttribute('aria-invalid') === 'true') denetle(a); });
  });
  function basari() {
    bilet.classList.add('gonderildi');
    durum.textContent = T.basari;
    durum.className = 'form-durum iyi';
    yeni.hidden = false; form.querySelector('button[type=submit]').disabled = true;
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var alanlar = ['ad', 'eposta', 'konu', 'mesaj'].map(function (n) { return form.elements[n]; });
    var ilkHata = null;
    alanlar.forEach(function (a) { if (!denetle(a) && !ilkHata) ilkHata = a; });
    if (ilkHata) { ilkHata.focus(); durum.textContent = T.eksik; durum.className = 'form-durum kotu'; return; }
    if (!FORMSPREE) { basari(); return; } // gösterim modu
    durum.textContent = T.gonderiliyor; durum.className = 'form-durum';
    fetch(FORMSPREE, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      .then(function (r) { if (r.ok) basari(); else throw new Error(r.status); })
      .catch(function () { durum.textContent = T.hata; durum.className = 'form-durum kotu'; });
  });
  yeni.addEventListener('click', function () {
    form.reset(); bilet.classList.remove('gonderildi'); yeni.hidden = true;
    form.querySelector('button[type=submit]').disabled = false;
    durum.textContent = T.bilgi; durum.className = 'form-durum';
    $('bilet-no').textContent = String(Math.floor(1000 + Math.random() * 9000));
    form.elements.ad.focus();
  });
  $('bilet-no').textContent = String(Math.floor(1000 + Math.random() * 9000));
})();
