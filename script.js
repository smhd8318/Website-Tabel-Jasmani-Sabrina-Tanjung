// ----------------- LOOKUP NILAI -------------------
const lookup = {
  // contoh nilai pria
  lari_pria: [
    {min:3200, max:9999, skor:100},
    {min:3000, max:3199, skor:95},
    {min:2800, max:2999, skor:85},
    {min:2600, max:2799, skor:75},
    {min:2400, max:2599, skor:65},
    {min:0, max:2399, skor:50}
  ],
  pull_pria: [
    {min:15, max:999, skor:100},
    {min:12, max:14, skor:90},
    {min:9, max:11, skor:80},
    {min:6, max:8, skor:70},
    {min:3, max:5, skor:60},
    {min:0, max:2, skor:50}
  ],
  sit_pria: [
    {min:50, max:999, skor:100},
    {min:45, max:49, skor:90},
    {min:40, max:44, skor:80},
    {min:35, max:39, skor:70},
    {min:30, max:34, skor:60},
    {min:0, max:29, skor:50}
  ],
  push_pria: [
    {min:50, max:999, skor:100},
    {min:45, max:49, skor:90},
    {min:40, max:44, skor:80},
    {min:35, max:39, skor:70},
    {min:30, max:34, skor:60},
    {min:0, max:29, skor:50}
  ],
  shuttle_pria: [
    {min:0, max:13.0, skor:100},
    {min:13.1, max:13.9, skor:90},
    {min:14.0, max:14.9, skor:80},
    {min:15.0, max:15.9, skor:70},
    {min:16.0, max:16.9, skor:60},
    {min:17.0, max:99, skor:50}
  ],

  // contoh nilai wanita (isi sesuai data real)
  lari_wanita: [
    {min:2700, max:9999, skor:100},
    {min:2500, max:2699, skor:95},
    {min:2300, max:2499, skor:85},
    {min:2100, max:2299, skor:75},
    {min:1900, max:2099, skor:65},
    {min:0, max:1899, skor:50}
  ],
  pull_wanita: [ // chinning
    {min:12, max:999, skor:100},
    {min:10, max:11, skor:90},
    {min:8, max:9, skor:80},
    {min:6, max:7, skor:70},
    {min:4, max:5, skor:60},
    {min:0, max:3, skor:50}
  ],
  sit_wanita: [
    {min:45, max:999, skor:100},
    {min:40, max:44, skor:90},
    {min:35, max:39, skor:80},
    {min:30, max:34, skor:70},
    {min:25, max:29, skor:60},
    {min:0, max:24, skor:50}
  ],
  push_wanita: [
    {min:45, max:999, skor:100},
    {min:40, max:44, skor:90},
    {min:35, max:39, skor:80},
    {min:30, max:34, skor:70},
    {min:25, max:29, skor:60},
    {min:0, max:24, skor:50}
  ],
  shuttle_wanita: [
    {min:0, max:14.0, skor:100},
    {min:14.1, max:14.9, skor:90},
    {min:15.0, max:15.9, skor:80},
    {min:16.0, max:16.9, skor:70},
    {min:17.0, max:17.9, skor:60},
    {min:18.0, max:99, skor:50}
  ]
};

// ----------------- FUNGSI PENCARI NILAI -------------------
function cariSkor(value, tabel){
  for(let row of tabel){
    if(value >= row.min && value <= row.max) return row.skor;
  }
  return 0;
}

// ----------------- EVENT HITUNG -------------------
document.getElementById("btnHitung").addEventListener("click", () => {
  const gender = document.getElementById("gender").value;
  const nilai = {
    lari: Number(document.getElementById("lari").value),
    pull: Number(document.getElementById("pull").value),
    sit: Number(document.getElementById("sit").value),
    push: Number(document.getElementById("push").value),
    shuttle: Number(document.getElementById("shuttle").value)
  };

  const skor = {
    lari: cariSkor(nilai.lari, lookup["lari_"+gender]),
    pull: cariSkor(nilai.pull, lookup["pull_"+gender]),
    sit: cariSkor(nilai.sit, lookup["sit_"+gender]),
    push: cariSkor(nilai.push, lookup["push_"+gender]),
    shuttle: cariSkor(nilai.shuttle, lookup["shuttle_"+gender])
  };

  const total = Math.round(
    (skor.lari + skor.pull + skor.sit + skor.push + skor.shuttle) / 5
  );

  const grade = total >= 90 ? "A" : total >= 80 ? "B" :
                total >= 70 ? "C" : total >= 60 ? "D" : "E";

  // tampilkan hasil
  const tabelHasil = document.getElementById("tabelHasil");
  tabelHasil.innerHTML = `
    <tr><th>Jenis Tes</th><th>Hasil</th><th>Nilai</th></tr>
    <tr><td>Lari</td><td>${nilai.lari}</td><td>${skor.lari}</td></tr>
    <tr><td>Pull/Chinning</td><td>${nilai.pull}</td><td>${skor.pull}</td></tr>
    <tr><td>Sit Up</td><td>${nilai.sit}</td><td>${skor.sit}</td></tr>
    <tr><td>Push Up</td><td>${nilai.push}</td><td>${skor.push}</td></tr>
    <tr><td>Shuttle Run</td><td>${nilai.shuttle}</td><td>${skor.shuttle}</td></tr>
  `;

  document.getElementById("totalSkor").innerHTML =
    `<strong>Total Skor: ${total}</strong> (Grade ${grade})`;

  document.getElementById("hasil").classList.remove("hidden");
});
