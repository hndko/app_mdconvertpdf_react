# MariDocs 📄 - Konversi Markdown ke PDF Instan
Website konversi teks Markdown menjadi dokumen PDF berkualitas cetak secara instan, 100% aman di browser tanpa login.

## 📑 Daftar Isi
- [Deskripsi Proyek](#-deskripsi-proyek)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## 📌 Deskripsi Proyek
**MariDocs** adalah aplikasi web yang ditujukan bagi developer dan penulis teknis untuk mengubah tulisan berformat Markdown menjadi dokumen PDF yang rapi. 

**Masalah yang Diselesaikan:**
* Alat konversi biasa memerlukan instalasi lokal (seperti Pandoc) yang merepotkan.
* Layanan online sering kali berbayar, memberikan watermark, atau mengharuskan pendaftaran akun.
* Hasil cetak ke PDF sering kali memiliki tipografi yang kurang rapi atau resolusi yang rendah.

**Fitur Utama:**
* **100% Client-Side:** Proses konversi berjalan sepenuhnya di browser sehingga privasi data Anda terjamin.
* **Tanpa Login:** Aplikasi dapat diakses secara gratis tanpa batasan penggunaan.
* **Editor Real-Time:** Dilengkapi CodeMirror 6 dengan fitur *syntax highlighting*.
* **Ekspor Vektor PDF:** Menghasilkan dokumen dengan teks yang tajam, dapat disalin, dan dicari.
* **Kustomisasi Cetak:** Mendukung pilihan ukuran kertas (A4/Letter), tema cetak, dan penomoran halaman.

## 📋 Prasyarat
Pastikan perangkat Anda sudah terpasang perangkat lunak dengan versi minimum berikut:
* **Node.js**: v18.0.0 atau lebih baru
* **npm**: v9.0.0 atau lebih baru
* **React**: v19.2.7
* **TypeScript**: v6.0.3
* **Vite**: v8.1.5

## ⚙️ Instalasi
Ikuti langkah-langkah perintah terminal di bawah ini untuk memasang proyek secara lokal:

1. Clone repository ke dalam perangkat lokal:
```bash
git clone https://github.com/username/maridocs.git
cd maridocs
```

2. Pasang semua dependensi yang dibutuhkan:
```bash
npm install
```

3. Jalankan server pengembangan (*development server*):
```bash
npm run dev
```

## 🚀 Penggunaan
Setelah server pengembangan berjalan, Anda dapat mengakses aplikasi pada browser di `http://localhost:5173`. Berikut adalah contoh penggunaan aplikasi:

* **Menulis Markdown:**
  Ketik format Markdown langsung pada panel editor di sebelah kiri.
  ```markdown
  # Judul Dokumen
  Ini adalah contoh paragraf di dalam aplikasi **MariDocs**.
  ```
* **Melihat Preview:**
  Panel sebelah kanan akan langsung memperbarui hasil *render* Markdown Anda secara *real-time*.
* **Mengunggah File:**
  Gunakan fitur *drag & drop* atau klik tombol unggah untuk memasukkan file `.md` dari komputer Anda.
* **Mengunduh PDF:**
  Klik tombol unduh untuk menyimpan hasil dokumen dalam bentuk PDF (nama file akan otomatis mengikuti *heading* H1 pertama dokumen Anda).

## 🤝 Kontribusi
Pengembang luar sangat diizinkan untuk ikut memperbarui kode proyek ini. Silakan ikuti aturan berikut:
* Lakukan *Fork* pada *repository* ini.
* Buat *branch* baru untuk fitur atau perbaikan Anda:
  ```bash
  git checkout -b fitur/nama-fitur-baru
  ```
* Gunakan gaya penulisan *Conventional Commits* untuk pesan *commit* Anda.
* Pastikan kode lulus pengecekan tipe data TypeScript:
  ```bash
  npx tsc --noEmit
  ```
* Kirim *Pull Request* dengan deskripsi perubahan yang jelas dan rinci.

## 📜 Lisensi
Proyek ini didistribusikan di bawah lisensi **MIT**.

```text
MIT License
Copyright (c) 2026 MariDocs

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
