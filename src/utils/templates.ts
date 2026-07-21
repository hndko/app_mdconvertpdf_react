import type { DocumentTemplate } from '../types';

export const DOCUMENT_TEMPLATES: DocumentTemplate[] = [
  {
    id: 'readme',
    title: '📄 README Repository',
    category: 'Developer',
    description: 'Template dokumentasi proyek open-source lengkap dengan badge, fitur, instalasi, dan lisensi.',
    markdown: `# Nama Proyek 🚀

Aplikasi web modern untuk memecahkan masalah X dengan cara yang cepat, aman, dan efisien.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)

---

## 📌 Deskripsi Singkat

**NamaProyek** adalah solusi terbaik bagi developer yang membutuhkan utilitas cepat tanpa konfigurasi rumit.

### 🌟 Fitur Utama

- ✅ **Cepat & Ringan:** Tanpa beban backend berat.
- ✅ **100% Client-Side:** Privasi data aman di perangkat pengguna.
- ✅ **Desain Modern:** Menggunakan sistem desain terkini.

---

## 📋 Prasyarat

* **Node.js**: v18.0.0 atau lebih baru
* **npm**: v9.0.0 atau lebih baru

---

## ⚙️ Instalasi & Penggunaan

1. Clone repository:
\`\`\`bash
git clone https://github.com/username/nama-proyek.git
cd nama-proyek
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Jalankan server pengembangan:
\`\`\`bash
npm run dev
\`\`\`

---

## 📜 Lisensi

Proyek ini dilisensikan di bawah **MIT License**.
`,
  },
  {
    id: 'resume',
    title: '💼 CV / Resume Professional',
    category: 'Karir',
    description: 'Format resume profesional yang rapi, mudah dibaca, dan cocok untuk lamaran kerja teknis.',
    markdown: `# Nama Lengkap 💼
**Senior Software Engineer | Full-Stack Developer**

📧 email@example.com | 📱 +62 812 3456 7890 | 🌐 [LinkedIn](https://linkedin.com) | 🐙 [GitHub](https://github.com)

---

## 📌 Profil Profesional

Pengembang perangkat lunak berpengalaman lebih dari **5 tahun** dalam membangun aplikasi web bertrafik tinggi menggunakan React, TypeScript, dan Node.js. Berdedikasi tinggi terhadap *clean code* dan performa tinggi.

---

## 🛠️ Keahlian Utama

* **Bahasa Pemrograman:** JavaScript (ES6+), TypeScript, HTML5, CSS3, SQL
* **Framework & Library:** React.js, Next.js, Node.js, Express, Tailwind CSS
* **Database & Tools:** PostgreSQL, MongoDB, Git, Docker, Vite, Jest

---

## 💼 Pengalaman Kerja

### Senior Frontend Engineer — **PT Teknologi Utama** *(2022 — Sekarang)*
- Memimpin tim frontend dalam merancang ulang arsitektur dashboard utama menggunakan React & TypeScript.
- Meningkatkan kecepatan muat halaman (*load speed*) sebesar **40%**.
- Mengimplementasikan sistem desain internal yang digunakan oleh 15+ pengembang.

### Full-Stack Developer — **Starlight Studio** *(2019 — 2022)*
- Membangun API RESTful berbasis Node.js yang melayani lebih dari 100.000 pengguna aktif bulanan.
- Mengintegrasikan gateway pembayaran dan otomasi sistem laporan bulanan.

---

## 🎓 Pendidikan

**Sarjana Ilmu Komputer (S.Kom)** — Universitas Indonesia *(2015 — 2019)*
- IPK: **3.85 / 4.00** (Cum Laude)
`,
  },
  {
    id: 'meeting-notes',
    title: '📝 Catatan Rapat (Meeting Notes)',
    category: 'Bisnis',
    description: 'Format ringkas untuk mencatat agenda, peserta, poin diskusi, dan rencana tindakan (action items).',
    markdown: `# 📝 Catatan Rapat: Perancangan Fitur V2.0

**Tanggal:** 22 Juli 2026  
**Waktu:** 10.00 — 11.30 WIB  
**Fasilitator:** Andi Wijaya  
**Notulis:** Budi Santoso  

---

## 👥 Peserta Rapat

- [x] Andi Wijaya (Product Manager)
- [x] Budi Santoso (Tech Lead)
- [x] Citra Dewi (UI/UX Designer)
- [ ] Dedi Kurnia (QA Lead - *Izin*)

---

## 🎯 Agenda Rapat

1. Review performa aplikasi versi V1.5
2. Demonstrasi maket desain fitur V2.0
3. Pembagian tugas sprint minggu depan

---

## 💬 Poin Diskusi Utama

### 1. Evaluasi Versi V1.5
- Aplikasi berjalan stabil dengan *uptime* 99.9%.
- Masalah kecepatan konversi PDF telah berhasil diperbaiki.

### 2. Fitur V2.0
- Citra menyajikan mockup baru untuk fitur *Dark Mode* dan ekspor multi-format.
- Tim menyetujui penambahan fitur simpan otomatis (*auto-save*).

---

## 📌 Action Items (Rencana Tindakan)

| Tugas | Penanggung Jawab | Tenggat Waktu | Status |
|---|---|---|---|
| Implementasi Auto-Save | Budi | 25 Juli 2026 | ⏳ Proses |
| Finalisasi Asset Desain | Citra | 24 Juli 2026 | ✅ Selesai |
| Pembuatan Test Case V2.0 | Dedi | 26 Juli 2026 | ⏳ Belum |
`,
  },
  {
    id: 'api-docs',
    title: '🔌 Dokumentasi API',
    category: 'Developer',
    description: 'Format dokumentasi endpoint REST API lengkap dengan parameter, contoh request, dan response JSON.',
    markdown: `# 🔌 Dokumentasi REST API — Service Pengguna

Versi API: **v1.0.0**  
Base URL: \`https://api.example.com/v1\`

---

## 🔑 Autentikasi

Semua request membutuhkan header Authorization:
\`\`\`http
Authorization: Bearer <TOKEN_JWT_ANDA>
\`\`\`

---

## 📌 Endpoint: Ambil Profil Pengguna

### \`GET /users/me\`

Mengembalikan informasi rinci tentang pengguna yang sedang login.

#### Request Headers

| Header | Tipe | Wajib | Keterangan |
|---|---|---|---|
| Authorization | String | Ya | Bearer token |
| Content-Type | String | Ya | \`application/json\` |

#### Contoh Response Success (200 OK)

\`\`\`json
{
  "status": "success",
  "data": {
    "id": "usr_99812",
    "name": "Budi Santoso",
    "email": "budi@example.com",
    "role": "admin",
    "created_at": "2026-01-15T08:30:00Z"
  }
}
\`\`\`

#### Contoh Response Error (401 Unauthorized)

\`\`\`json
{
  "status": "error",
  "message": "Token JWT tidak valid atau telah kadaluwarsa."
}
\`\`\`
`,
  },
  {
    id: 'contract',
    title: '📜 Surat Perjanjian Kerja / Kontrak',
    category: 'Hukum',
    description: 'Draft surat kesepakatan kerja antar pihak dengan klausa hak, kewajiban, dan tanda tangan.',
    markdown: `# SURAT PERJANJIAN KERJA (KONTRAK) 📜

Pada hari ini, **Selasa, 22 Juli 2026**, telah dibuat kesepakatan antara:

1. **Nama:** PT Teknologi Masa Depan  
   **Alamat:** Jl. Sudirman No. 45, Jakarta  
   *(Selanjutnya disebut sebagai **PIHAK PERTAMA**)*

2. **Nama:** Budi Santoso  
   **Alamat:** Jl. Mawar No. 12, Bandung  
   *(Selanjutnya disebut sebagai **PIHAK KEDUA**)*

---

## PASAL 1: LINGKUP PEKERJAAN

PIHAK KEDUA sepakat untuk melaksanakan pekerjaan pengembangan aplikasi web sesuai dengan spesifikasi yang telah disetujui bersama oleh PIHAK PERTAMA.

## PASAL 2: JANGKA WAKTU

Pekerjaan ini dilaksanakan dalam jangka waktu **3 (tiga) bulan**, terhitung sejak tanggal **1 Agustus 2026** hingga **31 Oktober 2026**.

## PASAL 3: IMBALAN & PEMBAYARAN

1. Total biaya pekerjaan adalah sebesar **Rp 15.000.000,- (Lima Belas Juta Rupiah)**.
2. Pembayaran dilakukan secara bertahap dalam 3 (tiga) termin.

---

**PIHAK PERTAMA**  
*(PT Teknologi Masa Depan)*  

*( Tanda Tangan )*  
**Andi Wijaya**  

---

**PIHAK KEDUA**  
*(Pengembang)*  

*( Tanda Tangan )*  
**Budi Santoso**  
`,
  },
];
