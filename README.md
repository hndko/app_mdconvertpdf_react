# MariDocs — Konversi Markdown ke PDF Instan 📄

📄 Website konversi Markdown ke PDF berkualitas cetak — gratis, tanpa login, langsung di browser, dengan privasi data 100% terjamin.

---

## 📑 Daftar Isi

- [Deskripsi Proyek](#-deskripsi-proyek)
- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Penggunaan](#-penggunaan)
- [Struktur Proyek](#-struktur-proyek)
- [Model Data & Peran](#-model-data--peran)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

---

## 📌 Deskripsi Proyek

**MariDocs** adalah aplikasi web yang memecahkan masalah umum bagi developer, penulis teknis, dan profesional yang menulis dalam Markdown namun membutuhkan output PDF yang rapi untuk dibagikan ke pihak non-teknis.

**Masalah yang diselesaikan:**
- 🔧 Tools konversi umumnya butuh instalasi lokal (Pandoc, VS Code extension)
- 💰 Layanan online sering berbayar, ber-watermark, atau wajib login
- 🎨 Hasil PDF sering kurang rapi secara tipografi

**Solusi:** Aplikasi berbasis browser yang menghasilkan PDF vektor berkualitas cetak — teks tajam, bisa di-search & di-copy, dengan pagination otomatis.

**Ciri utama:**
- ✅ Berjalan **100% di sisi klien** (client-side) — tidak ada server, tidak ada data yang dikirim keluar
- ✅ Tanpa login, tanpa batasan, gratis digunakan

---

## ✨ Fitur Utama

- ✅ **Editor Markdown** — CodeMirror 6 dengan syntax highlighting
- ✅ **Preview Real-Time** — render otomatis saat mengetik (debounce 300ms)
- ✅ **Ekspor PDF Vektor** — output PDF native browser, teks tajam di segala resolusi
- ✅ **Upload File .md** — drag & drop atau browse file dari komputer
- ✅ **Split View** — editor (kiri) dan preview (kanan) di layar lebar
- ✅ **Responsive Mobile** — tab switch (Editor / Preview) di layar kecil
- ✅ **Kustomisasi PDF:**
  - 📏 Ukuran kertas: A4 / Letter
  - 🎨 Tema cetak: Default / GitHub Style / Minimal
  - 🔢 Toggle nomor halaman di footer
- ✅ **GFM Support** — tabel, strikethrough, task list, dan fitur GitHub Flavored Markdown
- ✅ **Code Highlighting** — syntax highlighting untuk 100+ bahasa pemrograman
- ✅ **Dark Mode** — tampilan elegan dengan desain modern
- ✅ **Nama File Otomatis** — nama file PDF diambil dari heading H1 pertama

---

## 🛠️ Tech Stack

| Lapisan | Teknologi | Keterangan |
|---|---|---|
| **Build Tool** | Vite 8 | Build cepat, HMR instan |
| **Framework** | React 19 | Komponen-based, TypeScript |
| **Bahasa** | TypeScript ~6 | Type safety |
| **Styling** | Vanilla CSS | Custom properties, dark mode |
| **Markdown Parser** | react-markdown + remark-gfm | Render aman tanpa `dangerouslySetInnerHTML` |
| **Syntax Highlighting** | react-syntax-highlighter (Prism) | 100+ bahasa pemrograman |
| **Editor** | CodeMirror 6 (`@uiw/react-codemirror`) | Editor kaya fitur dengan markdown mode |
| **PDF Generator** | `window.print()` + iframe + Print CSS | PDF vektor native, teks tajam |
| **Icons** | Lucide React | Ikon SVG yang konsisten |
| **Font** | Inter + JetBrains Mono | Google Fonts |

---

## 📋 Prasyarat

Pastikan perangkat Anda memenuhi versi minimum berikut:

| Software | Versi Minimum | Cara Cek |
|---|---|---|
| **Node.js** | 18.0.0 | `node --version` |
| **npm** | 9.0.0 | `npm --version` |

---

## ⚙️ Instalasi

1. **Clone repository:**

```bash
git clone https://github.com/username/maridocs.git
cd maridocs
```

2. **Install dependencies:**

```bash
npm install
```

3. **Jalankan development server:**

```bash
npm run dev
```

4. **Buka browser:** Akses `http://localhost:5173`

---

## 🚀 Penggunaan

### Menjalankan Development Server

```bash
npm run dev
```

Server berjalan di `http://localhost:5173` dengan Hot Module Replacement (HMR).

### Build untuk Production

```bash
npm run build
```

Output tersedia di folder `dist/`.

### Preview Build Production

```bash
npm run preview
```

### Cara Menggunakan Aplikasi

1. **Ketik** teks Markdown di panel editor (kiri)
2. **Preview** diperbarui otomatis di panel kanan
3. **Upload** file `.md` dengan drag & drop atau tombol "Upload .md"
4. Klik **⚙️ Settings** untuk mengatur ukuran kertas, tema cetak, dan nomor halaman
5. Klik **📥 Unduh PDF** untuk mengekspor dokumen

> 💡 **Tips:** Gunakan heading H1 (`# Judul`) di awal dokumen — nama file PDF otomatis mengikuti heading H1 pertama.

---

## 📁 Struktur Proyek

```
maridocs/
├── public/
│   └── favicon.svg               # Ikon favicon
├── src/
│   ├── components/
│   │   ├── Editor.tsx             # Editor CodeMirror 6
│   │   ├── Header.tsx             # Header dengan logo
│   │   ├── MobileTabSwitch.tsx    # Tab Editor/Preview (mobile)
│   │   ├── Preview.tsx            # Preview Markdown real-time
│   │   ├── SettingsPanel.tsx      # Panel pengaturan PDF
│   │   └── Toolbar.tsx            # Toolbar aksi
│   ├── hooks/
│   │   ├── useDebounce.ts         # Hook debounce
│   │   ├── useFileUpload.ts       # Hook upload file
│   │   └── usePdfExport.ts        # Hook ekspor PDF
│   ├── types/
│   │   └── index.ts               # TypeScript types
│   ├── utils/
│   │   ├── defaultMarkdown.ts     # Konten default editor
│   │   └── printStyles.ts         # CSS generator untuk PDF
│   ├── App.tsx                    # Komponen utama
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Design system & tokens
├── index.html                     # HTML template
├── package.json
├── vite.config.ts
├── vercel.json                    # Konfigurasi Vercel
└── netlify.toml                   # Konfigurasi Netlify
```

---

## 🗄️ Model Data & Peran

### Struktur Data

Aplikasi ini **tidak menggunakan database**. Seluruh proses berjalan di sisi klien (browser) dan tidak ada penyimpanan persisten di server. Satu-satunya struktur data terdefinisi adalah tipe pengaturan PDF (`src/types/index.ts`):

```ts
interface AppSettings {
  paperSize: 'A4' | 'Letter';
  printTheme: 'default' | 'github' | 'minimal';
  showPageNumbers: boolean;
}

type MobileTab = 'editor' | 'preview';
```

Data lain (teks Markdown, file yang di-upload) hanya disimpan sementara di memori React state selama sesi berlangsung.

### Peran Pengguna

| Peran | Keterangan |
|---|---|
| 👤 **Pengguna (Guest)** | Satu-satunya tipe pengguna. Tidak ada login, autentikasi, atau otorisasi. Semua fitur tersedia secara bebas untuk setiap pengunjung. |

> 🔒 Karena tidak ada backend, tidak ada pembagian hak akses (role-based access control). Semua pengguna memiliki akses penuh ke seluruh fitur.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Untuk berkontribusi:

1. **Fork** repository ini
2. **Buat branch** fitur baru:
   ```bash
   git checkout -b fitur/nama-fitur
   ```
3. **Commit** perubahan Anda:
   ```bash
   git commit -m "feat: tambah fitur baru"
   ```
4. **Push** ke branch:
   ```bash
   git push origin fitur/nama-fitur
   ```
5. Buat **Pull Request** di GitHub

### Aturan Kontribusi

- 📝 Gunakan format [Conventional Commits](https://www.conventionalcommits.org/)
- ✅ Pastikan lolos TypeScript type check: `npx tsc --noEmit`
- ✅ Pastikan build berhasil: `npm run build`
- 📋 Sertakan deskripsi yang jelas di Pull Request

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

```
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
