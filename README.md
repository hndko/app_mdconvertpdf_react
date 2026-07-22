# MariDocs 📄 - Konversi Markdown ke PDF Instan
Website konversi teks Markdown menjadi dokumen PDF berkualitas cetak secara instan, 100% aman di browser tanpa login.

## 📑 Daftar Isi
- [Deskripsi Proyek](#-deskripsi-proyek)
- [Fitur Utama](#-fitur-utama)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Deployment (Vercel, Netlify, VPS)](#-deployment)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## 📌 Deskripsi Proyek
**MariDocs** adalah aplikasi web modern yang ditujukan bagi developer, penulis teknis, dan profesional untuk mengubah tulisan berformat Markdown menjadi dokumen PDF yang rapi, indah, dan tajam. 

## ✨ Fitur Utama

1. **📊 Diagram & Notasi Matematika:**
   - Dukungan diagram **Mermaid.js** (flowchart, sequence, class diagram).
   - Rendering rumus matematika LaTeX menggunakan **KaTeX** (`$E = mc^2$`).
2. **💾 Penyimpanan Otomatis & Riwayat Lokal:**
   - *Auto-save* draf otomatis ke `localStorage` tanpa takut kehilangan tulisan.
   - Fitur **Riwayat Dokumen** untuk menyimpan hingga 10 draf dokumen lokal.
3. **🎨 Kustomisasi PDF Tingkat Lanjut:**
   - Pilihan Font Family (Inter, Merriweather, JetBrains Mono).
   - Kontrol ukuran margin kertas (Compact, Normal, Spacious).
   - Penambahan Teks Header & Footer custom pada dokumen PDF.
4. **📄 Ekspor Multi-Format & Impor URL:**
   - Unduh dokumen sebagai **PDF Vektor**, **Raw Markdown (.md)**, atau **HTML Webpage (.html)**.
   - Fitur impor dokumen dari URL publik (misal Raw GitHub / Gist).
5. **📑 Preset Template Ready-to-Use:**
   - 5 pilihan template siap pakai: README Proyek, CV/Resume Professional, Catatan Rapat, Dokumentasi API, dan Surat Perjanjian.
6. **📱 PWA & Offline Mode:**
   - Dapat diinstal sebagai aplikasi desktop/HP (**Progressive Web App**).
   - 100% berjalan secara *offline* melalui Service Worker.

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
git clone https://github.com/hndko/app_mdconvertpdf_react.git
cd app_mdconvertpdf_react
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
  # Judul Dokumen 📄
  
  Rumus matematika: $E = mc^2$
  
  ```mermaid
  graph TD;
      A-->B;
      A-->C;
  ```
  ```
* **Menggunakan Template:**
  Klik tombol **Template** di toolbar untuk memilih format awal dokumen.
* **Melihat Preview:**
  Panel sebelah kanan akan langsung memperbarui hasil *render* Markdown Anda secara *real-time*.
* **Mengunduh PDF / Markdown / HTML:**
  Klik tombol **Unduh PDF** atau pilih opsi ekspor lainnya melalui tombol dropdown.

## 🌐 Deployment
Panduan langkah demi langkah untuk melakukan *deployment* ke **Vercel**, **Netlify**, maupun **VPS Linux (Nginx + SSL)** dapat dilihat secara lengkap di dokumen [DEPLOYMENT.md](file:///d:/laragon\www\app_mdconvertpdf_react\DEPLOYMENT.md).

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
