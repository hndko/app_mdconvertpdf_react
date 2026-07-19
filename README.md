# MD Convert PDF — Konversi Markdown ke PDF Instan 📄

Website konversi Markdown ke PDF berkualitas cetak — **gratis, tanpa login, langsung di browser**. Semua proses berjalan 100% di client-side sehingga privasi data Anda terjamin.

---

## Daftar Isi

- [Deskripsi Proyek](#deskripsi-proyek)
- [Fitur Utama](#fitur-utama)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Penggunaan](#penggunaan)
- [Struktur Proyek](#struktur-proyek)
- [Deploy](#deploy)
  - [Vercel](#1-vercel-rekomendasi)
  - [Netlify](#2-netlify)
  - [VPS Sendiri (Nginx)](#3-vps-sendiri-nginx)
- [Tech Stack](#tech-stack)
- [Kontribusi](#kontribusi)
- [Lisensi](#lisensi)

---

## Deskripsi Proyek

**MD Convert PDF** memecahkan masalah umum bagi developer, penulis teknis, dan profesional yang menggunakan Markdown sebagai format penulisan sehari-hari namun membutuhkan output PDF yang rapi untuk dibagikan ke pihak non-teknis.

**Masalah yang diselesaikan:**
- Tools konversi Markdown ke PDF yang ada umumnya membutuhkan instalasi lokal (Pandoc, VS Code extension)
- Layanan online yang ada umumnya berbayar, memiliki watermark, atau mewajibkan login
- Hasil PDF sering tidak rapi secara tipografi

**Solusi:** Website berbasis browser yang menghasilkan PDF vektor berkualitas cetak — teks tajam, bisa di-search & di-copy, dengan pagination otomatis.

---

## Fitur Utama

- ✅ **Editor Markdown** — CodeMirror 6 dengan syntax highlighting
- ✅ **Preview Real-Time** — render otomatis saat mengetik (debounce 300ms)
- ✅ **Ekspor PDF Vektor** — output PDF native browser, teks tajam di segala resolusi
- ✅ **Upload File .md** — drag & drop atau browse file dari komputer
- ✅ **Split View** — editor (kiri) dan preview (kanan) di layar lebar
- ✅ **Responsive Mobile** — tab switch (Editor / Preview) di layar kecil
- ✅ **Kustomisasi PDF:**
  - Ukuran kertas: A4 / Letter
  - Tema cetak: Default / GitHub Style / Minimal
  - Toggle nomor halaman
- ✅ **GFM Support** — tabel, strikethrough, task list, dan fitur GitHub Flavored Markdown lainnya
- ✅ **Code Highlighting** — syntax highlighting untuk 100+ bahasa pemrograman
- ✅ **Dark Mode** — tampilan elegan dengan desain modern
- ✅ **100% Client-Side** — tidak ada data yang dikirim ke server
- ✅ **Nama File Otomatis** — nama file PDF diambil dari heading H1 pertama

---

## Prasyarat

Pastikan Anda sudah menginstal:

| Software | Versi Minimum | Cara Cek |
|---|---|---|
| **Node.js** | 18.0.0 | `node --version` |
| **npm** | 9.0.0 | `npm --version` |

---

## Instalasi

1. **Clone repository:**

```bash
git clone https://github.com/username/md-convert-pdf.git
cd md-convert-pdf
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

## Penggunaan

### Menjalankan Development Server

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5173` dengan Hot Module Replacement (HMR).

### Build untuk Production

```bash
npm run build
```

Output akan tersedia di folder `dist/`.

### Preview Build Production

```bash
npm run preview
```

### Cara Menggunakan Aplikasi

1. **Ketik** teks Markdown di panel editor (kiri)
2. **Preview** akan diperbarui secara otomatis di panel kanan
3. **Upload** file `.md` dengan drag & drop atau klik tombol "Upload .md"
4. Klik **⚙️ Settings** untuk mengatur ukuran kertas, tema cetak, dan nomor halaman
5. Klik **📥 Unduh PDF** untuk mengekspor dokumen ke PDF

> **Tips:** Gunakan heading H1 (`# Judul`) di awal dokumen — nama file PDF akan otomatis mengikuti heading H1 pertama.

---

## Struktur Proyek

```
md-convert-pdf/
├── public/
│   └── favicon.svg               # Ikon favicon
├── src/
│   ├── components/
│   │   ├── Editor.tsx             # Editor CodeMirror 6
│   │   ├── Editor.css
│   │   ├── Header.tsx             # Header dengan logo
│   │   ├── Header.css
│   │   ├── MobileTabSwitch.tsx    # Tab Editor/Preview (mobile)
│   │   ├── MobileTabSwitch.css
│   │   ├── Preview.tsx            # Preview Markdown real-time
│   │   ├── Preview.css
│   │   ├── SettingsPanel.tsx      # Panel pengaturan PDF
│   │   ├── SettingsPanel.css
│   │   ├── Toolbar.tsx            # Toolbar aksi
│   │   └── Toolbar.css
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
│   ├── App.css                    # Layout styles
│   ├── index.css                  # Design system & tokens
│   └── main.tsx                   # Entry point
├── index.html                     # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json                    # Konfigurasi Vercel
├── netlify.toml                   # Konfigurasi Netlify
├── PRD_markdown-to-pdf.md         # Product Requirements Document
└── README.md                      # Dokumentasi ini
```

---

## Deploy

### 1. Vercel (Rekomendasi)

Cara paling mudah untuk deploy aplikasi Vite.

**Opsi A — Via Dashboard:**

1. Push repository ke GitHub/GitLab/Bitbucket
2. Buka [vercel.com](https://vercel.com) dan login
3. Klik **"New Project"** → Import repository
4. Vercel akan auto-detect Vite — klik **"Deploy"**
5. Selesai! URL akan diberikan otomatis

**Opsi B — Via CLI:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

**Konfigurasi** sudah tersedia di `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

---

### 2. Netlify

**Opsi A — Via Dashboard:**

1. Push repository ke GitHub/GitLab/Bitbucket
2. Buka [netlify.com](https://netlify.com) dan login
3. Klik **"Add new site"** → **"Import an existing project"**
4. Pilih repository, pastikan konfigurasi:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Klik **"Deploy site"**

**Opsi B — Via CLI:**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy (preview)
netlify deploy

# Deploy ke production
netlify deploy --prod
```

**Konfigurasi** sudah tersedia di `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. VPS Sendiri (Nginx)

Untuk deploy di VPS (Ubuntu/Debian) dengan Nginx sebagai web server.

**Langkah 1 — Build di lokal atau CI:**

```bash
npm run build
```

**Langkah 2 — Upload folder `dist/` ke server:**

```bash
# Via SCP
scp -r dist/* user@your-server-ip:/var/www/md-convert-pdf/

# Atau via rsync (lebih efisien)
rsync -avz --delete dist/ user@your-server-ip:/var/www/md-convert-pdf/
```

**Langkah 3 — Konfigurasi Nginx:**

Buat file konfigurasi di `/etc/nginx/sites-available/md-convert-pdf`:

```nginx
server {
    listen 80;
    server_name your-domain.com;  # Ganti dengan domain Anda

    root /var/www/md-convert-pdf;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;
    gzip_min_length 256;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback — semua route diarahkan ke index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

**Langkah 4 — Aktifkan site dan restart Nginx:**

```bash
# Buat symlink
sudo ln -s /etc/nginx/sites-available/md-convert-pdf /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

**Langkah 5 — (Opsional) HTTPS dengan Let's Encrypt:**

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal sudah dikonfigurasi otomatis oleh Certbot
```

---

## Tech Stack

| Lapisan | Teknologi | Keterangan |
|---|---|---|
| **Build Tool** | Vite 6 | Build cepat, HMR instan |
| **Framework** | React 19 | Komponen-based, TypeScript |
| **Bahasa** | TypeScript | Type safety |
| **Styling** | Vanilla CSS | Custom properties, dark mode |
| **Markdown Parser** | react-markdown + remark-gfm | Render aman tanpa dangerouslySetInnerHTML |
| **Syntax Highlighting** | react-syntax-highlighter (Prism) | 100+ bahasa pemrograman |
| **Editor** | CodeMirror 6 (@uiw/react-codemirror) | Editor kaya fitur dengan markdown mode |
| **PDF Generator** | window.print() + iframe + Print CSS | PDF vektor native, teks tajam |
| **Icons** | Lucide React | Ikon SVG yang konsisten |
| **Font** | Inter + JetBrains Mono | Google Fonts |

---

## Kontribusi

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

- Gunakan format [Conventional Commits](https://www.conventionalcommits.org/) untuk pesan commit
- Pastikan kode lolos TypeScript type check (`npx tsc --noEmit`)
- Pastikan build berhasil (`npm run build`)
- Sertakan deskripsi yang jelas di Pull Request

---

## Lisensi

Proyek ini dilisensikan di bawah **MIT License**.

```
MIT License

Copyright (c) 2026 MD Convert PDF

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
