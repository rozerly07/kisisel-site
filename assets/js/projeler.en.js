/* projeler.en.js — projeler.js'teki proje listesinin ve arayüz metinlerinin İngilizce kopyası
   (en/projects.html bunu projeler.js'ten önce yükler). Görseller, renkler ve seviyeler aynı. */
window.PROJELER_EN = {
  liste: [
    { ad: 'Animate Project', kisa: 'A web interface project with interactive menu buttons, scene transitions and layered timeline animations. The aim was for the visuals and the timing to work together as one harmonious whole.', uzun: '', rol: '', yil: '', link: '',
      gorseller: ['../assets/img/projects/gaproje.webp'], araclar: [['Adobe Animate', 8], ['Timeline', 8], ['Layers', 8], ['Button and Text Tools', 7], ['Frame / Keyframe Management', 7]], renk: 'linear-gradient(160deg,#2A0D57,#C6306E 70%,#FF8A3D)' },
    { ad: 'Photoshop product promo', kisa: 'A promotional visual for MAC Matte Maximal Lipstick, designed with an emphasis on its matte texture and a reflection effect. The typography and colour balance are meant to bring the brand identity to the fore.', uzun: '', rol: '', yil: '', link: '',
      gorseller: ['../assets/img/projects/resim3.webp'], araclar: [['Adobe Photoshop', 8], ['Type Tool', 8], ['Layer Masks', 7], ['Gradient and Reflection Effects', 7], ['Colour and Tone Adjustments', 7], ['Selection Tools', 6]], renk: 'linear-gradient(160deg,#0E3A6E,#6A1B7A 60%,#FF5A8A)' },
    { ad: 'Photoshop image editing', kisa: 'A dramatic scene edit in which selected characters keep their colour against a black-and-white atmosphere. The History Brush and tone adjustments strengthen the focal point.', uzun: '', rol: '', yil: '', link: '',
      gorseller: ['../assets/img/projects/pic15.webp'], araclar: [['Adobe Photoshop', 8], ['History Brush', 9], ['Black & White / Toning', 8], ['Brush Tool', 8], ['Layers and Masks', 7], ['Zoom Tool', 7]], renk: 'linear-gradient(160deg,#6A1B7A,#FF8A3D 70%,#FFC66B)' },
    { ad: 'Web interface', kisa: 'A mockup of a website\'s interface, built in Photoshop and split into sections, with saved variations showing how the site could look on request.', uzun: '', rol: '', yil: '', link: '',
      gorseller: ['../assets/img/projects/pic12.webp'], araclar: [], renk: 'linear-gradient(160deg,#2A0D57,#C6306E 70%,#FF8A3D)' },
    { ad: '??? COMING SOON', kisa: 'This act is still in rehearsal. It will be unlocked soon.', kilitli: true,
      gorseller: [], araclar: [['???', 0], ['???', 0], ['???', 0]], renk: 'linear-gradient(160deg,#1E0838,#3A1260)' }
  ],
  metin: {
    kilitli: 'LOCKED',
    gorsel: '[PROJECT IMAGE]',
    numara: 'ACT_',
    oyuncu: 'PLAYER 1 · ',
    imlecKilit: '> THIS ACT IS LOCKED',
    imlecSec: '> CLICK THE PROJECT TO SELECT',
    sesAcik: 'SOUND: ON',
    sesKapali: 'SOUND: OFF',
    ac: function (ad) { return 'Open details for ' + ad; },
    gorselNo: 'Image ',
    profil: ' · PROFILE',
    rol: 'ROLE: ',
    yil: 'DATE: '
  }
};
