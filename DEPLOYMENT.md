# 🌐 Panduan Deploy MariDocs

Panduan lengkap untuk melakukan *deployment* aplikasi **MariDocs** ke tiga platform populer: **Vercel**, **Netlify**, dan **VPS (Linux Ubuntu/Debian dengan Nginx)**.

---

## 📑 Daftar Isi
- [1. Deploy ke Vercel (Rekomendasi Cepat)](#1-deploy-ke-vercel-rekomendasi-cepat)
- [2. Deploy ke Netlify](#2-deploy-ke-netlify)
- [3. Deploy ke VPS (Nginx + SSL Certbot)](#3-deploy-ke-vps-nginx--ssl-certbot)

---

## 1. Deploy ke Vercel (Rekomendasi Cepat)

Vercel adalah platform terbaik untuk hosting aplikasi berbasis Vite & React dengan proses *deployment* otomatis setiap ada `git push`.

### Cara A: Melalui Dashboard Vercel (GUI)
1. Buka [Vercel Dashboard](https://vercel.com/dashboard) dan login menggunakan akun GitHub Anda.
2. Klik tombol **Add New...** > pilih **Project**.
3. Import repository GitHub `app_mdconvertpdf_react`.
4. Konfigurasi Proyek:
   * **Framework Preset:** `Vite`
   * **Root Directory:** `./`
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Klik **Deploy**. Selesai! Vercel akan otomatis memberikan domain gratis `https://nama-proyek.vercel.app`.

### Cara B: Melalui Vercel CLI
1. Install Vercel CLI secara global:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di direktori proyek:
   ```bash
   vercel
   ```
3. Untuk rilis produksi, jalankan:
   ```bash
   vercel --prod
   ```

---

## 2. Deploy ke Netlify

Netlify menyediakan hosting statis gratis dengan fitur Continuous Integration (CI/CD) dari GitHub.

### Cara A: Melalui Dashboard Netlify (Git Integration)
1. Buka [Netlify App](https://app.netlify.com/) dan login dengan GitHub.
2. Klik **Add new site** > pilih **Import an existing project**.
3. Pilih **GitHub** dan berikan izin ke repo `app_mdconvertpdf_react`.
4. Masukkan Pengaturan Build:
   * **Build command:** `npm run build`
   * **Publish directory:** `dist`
5. Klik **Deploy site**.

### Cara B: Drag & Drop (Manual Upload)
1. Build aplikasi di komputer lokal:
   ```bash
   npm run build
   ```
2. Buka [Netlify Drop](https://app.netlify.com/drop).
3. Drag & drop folder `dist` hasil build ke area upload browser.

---

## 3. Deploy ke VPS (Nginx + SSL Certbot)

Gunakan metode ini jika Anda menggunakan VPS (seperti DigitalOcean, Linode, AWS EC2, Biznet, atau Cloud VPS) dengan OS Linux Ubuntu 20.04 / 22.04 LTS.

### Langkah 1: Update Server & Install Nginx & Node.js
Login ke VPS melalui SSH:
```bash
ssh root@IP_VPS_ANDA
```

Update package & install Nginx:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git -y
```

Install Node.js (v18 atau LTS terbaru):
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
```

---

### Langkah 2: Clone Repo & Build Aplikasi
Masuk ke direktori web server:
```bash
cd /var/www
sudo git clone https://github.com/hndko/app_mdconvertpdf_react.git maridocs
cd maridocs
```

Install dependensi & buat build produksi:
```bash
sudo npm install
sudo npm run build
```

---

### Langkah 3: Konfigurasi Web Server Nginx
Buat file konfigurasi Nginx baru:
```bash
sudo nano /etc/nginx/sites-available/maridocs
```

Paste kode konfigurasi Nginx berikut (sesuaikan `domain-anda.com` dengan domain Anda):
```nginx
server {
    listen 80;
    server_name domain-anda.com www.domain-anda.com;

    root /var/www/maridocs/dist;
    index index.html;

    # Gzip Compression untuk performa cepat
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache file statis
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

Aktifkan konfigurasi Nginx & restart service:
```bash
sudo ln -s /etc/nginx/sites-available/maridocs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

### Langkah 4: Pasang SSL Gratis (HTTPS) dengan Certbot
Pasang Certbot Let's Encrypt untuk mengamankan koneksi domain dengan HTTPS:
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d domain-anda.com -d www.domain-anda.com
```
Ikuti petunjuk di layar, pilih opsi redirect otomatis dari HTTP ke HTTPS.

---

### Langkah 5: Otomasi Deployment Saat Update Kode (Opsional)
Untuk memperbarui versi aplikasi di VPS di kemudian hari, Anda cukup menjalankan skrip ringkas berikut di VPS:
```bash
cd /var/www/maridocs
git pull origin main
npm install
npm run build
```
