# Tugas Pertemuan 8 - Pengembangan Web Service (PWS)
## Implementasi Environment Variables (.env) dan ORM (Sequelize) dengan PostgreSQL

Proyek ini adalah implementasi RESTful API untuk pengelolaan data buku komik (*CRUD - Create, Read, Update, Delete*) menggunakan Node.js, Express.js, Sequelize ORM, dan PostgreSQL sebagai database manajemen sistem. Konfigurasi kredensial database dikelola secara aman menggunakan pustaka `dotenv`.

---

## 📋 Daftar Isi
- [Fitur Utama](#-fitur-utama)
- [Struktur Direktori](#-struktur-direktori)
- [Prasyarat Sistem](#-prasyarat-sistem)
- [Instalasi dan Konfigurasi](#-instalasi-dan-konfigurasi)
- [Migrasi & Seeder Database](#-migrasi--seeder-database)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Dokumentasi Endpoint API](#-dokumentasi-endpoint-api)
- [Keamanan & Best Practices](#-keamanan--best-practices)

---

## 🚀 Fitur Utama
1. **RESTful API CRUD Komik**:
   - `POST /komik` : Menambahkan data komik baru
   - `GET /komik` : Mengambil daftar semua komik
   - `GET /komik/:id` : Mengambil rincian komik berdasarkan ID
   - `PUT /komik/:id` : Memperbarui data komik berdasarkan ID
   - `DELETE /komik/:id` : Menghapus data komik berdasarkan ID
2. **Sequelize ORM**: Pemodelan data relasional, sinkronisasi skema otomatis, migrasi, dan seeding data awal.
3. **Manajemen Environment**: Menggunakan `.env` untuk memisahkan kredensial sensitif dari repositori publik.
4. **Validasi & Penanganan Error**: Respon HTTP status code terstandarisasi (200, 201, 400, 404, 500).

---

## 📁 Struktur Direktori
```text
.
├── config/
│   └── config.js            # Konfigurasi koneksi database (development & production)
├── migrations/
│   └── 20261102000001-create-komik.js # Skrip migrasi pembuatan tabel Komiks
├── models/
│   ├── index.js             # Loader model dan inisialisasi koneksi Sequelize
│   └── komik.js             # Definisi skema dan model Komik
├── seeders/
│   └── 20261102000001-demo-komik.js   # Skrip seeding data awal
├── .env.example             # Template konfigurasi environment
├── .gitignore               # Konfigurasi file yang diabaikan oleh Git
├── .sequelizerc             # Konfigurasi path Sequelize CLI
├── index.js                 # Entry point server Express dan routing API
├── package.json             # Manifes proyek dan daftar dependensi
├── package-lock.json        # Penguncian versi dependensi
└── README.md                # Dokumentasi proyek
```

---

## ⚙️ Prasyarat Sistem
- **Node.js**: v16.x atau lebih baru (direkomendasikan v20+)
- **PostgreSQL**: v13 atau lebih baru
- **NPM**: v8 atau lebih baru

---

## 🛠️ Instalasi dan Konfigurasi

1. **Clone Repositori**:
   ```bash
   git clone https://github.com/RafiiArifNugroho/-007_EnvORM.git
   cd -007_EnvORM
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
   Buka file `.env` dan sesuaikan kredensial PostgreSQL lokal Anda:
   ```env
   DB_USER=postgres
   DB_PASS=password_anda
   DB_DATABASE=perpustakaan
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_DIALECT=postgres
   PORT=3000
   NODE_ENV=development
   ```

4. **Siapkan Database**:
   Pastikan PostgreSQL service telah berjalan dan buat database bernama `perpustakaan` melalui `psql` atau pgAdmin:
   ```sql
   CREATE DATABASE perpustakaan;
   ```

---

## 🗄️ Migrasi & Seeder Database

Aplikasi mendukung migrasi dan seeder menggunakan `sequelize-cli`:

- **Menjalankan Migrasi (Membuat tabel)**:
  ```bash
  npx sequelize-cli db:migrate
  ```

- **Membatalkan Migrasi Terakhir**:
  ```bash
  npx sequelize-cli db:migrate:undo
  ```

- **Menjalankan Seeder (Mengisi data dummy)**:
  ```bash
  npx sequelize-cli db:seed:all
  ```

- **Membatalkan Seeder**:
  ```bash
  npx sequelize-cli db:seed:undo:all
  ```

---

## ▶️ Menjalankan Aplikasi

- **Mode Pengembangan (dengan Nodemon auto-reload)**:
  ```bash
  npm start
  ```
- **Mode Standar Node.js**:
  ```bash
  node index.js
  ```

Server akan aktif pada: `http://localhost:3000`

---

## 📡 Dokumentasi Endpoint API

### 1. Root / Health Check
- **URL**: `/`
- **Method**: `GET`
- **Response** (200 OK):
  ```json
  {
    "message": "Selamat datang di API Perpustakaan Komik",
    "status": "Server berjalan dengan baik"
  }
  ```

---

### 2. Tambah Data Komik Baru
- **URL**: `/komik`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "title": "Bleach",
    "description": "Petualangan Ichigo Kurosaki sebagai Shinigami Pengganti.",
    "author": "Tite Kubo"
  }
  ```
- **Response** (201 Created):
  ```json
  {
    "id": 4,
    "title": "Bleach",
    "description": "Petualangan Ichigo Kurosaki sebagai Shinigami Pengganti.",
    "author": "Tite Kubo",
    "createdAt": "2026-11-02T04:30:00.000Z",
    "updatedAt": "2026-11-02T04:30:00.000Z"
  }
  ```

---

### 3. Ambil Semua Data Komik
- **URL**: `/komik`
- **Method**: `GET`
- **Response** (200 OK):
  ```json
  [
    {
      "id": 1,
      "title": "Naruto Shippuden",
      "description": "Perjalanan ninja Uzumaki Naruto dalam menggapai impian menjadi Hokage.",
      "author": "Masashi Kishimoto",
      "createdAt": "2026-11-02T04:00:00.000Z",
      "updatedAt": "2026-11-02T04:00:00.000Z"
    }
  ]
  ```

---

### 4. Ambil Detail Komik Berdasarkan ID
- **URL**: `/komik/:id`
- **Method**: `GET`
- **Contoh**: `/komik/1`
- **Response** (200 OK):
  ```json
  {
    "id": 1,
    "title": "Naruto Shippuden",
    "description": "Perjalanan ninja Uzumaki Naruto dalam menggapai impian menjadi Hokage.",
    "author": "Masashi Kishimoto",
    "createdAt": "2026-11-02T04:00:00.000Z",
    "updatedAt": "2026-11-02T04:00:00.000Z"
  }
  ```
- **Response Error** (404 Not Found):
  ```json
  {
    "message": "Komik tidak ditemukan"
  }
  ```

---

### 5. Perbarui Data Komik
- **URL**: `/komik/:id`
- **Method**: `PUT`
- **Contoh**: `/komik/1`
- **Body**:
  ```json
  {
    "title": "Naruto Shippuden (Updated)",
    "description": "Kisah perjuangan ninja konoha yang telah diupdate.",
    "author": "Masashi Kishimoto"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "message": "Komik berhasil diupdate",
    "komik": {
      "id": 1,
      "title": "Naruto Shippuden (Updated)",
      "description": "Kisah perjuangan ninja konoha yang telah diupdate.",
      "author": "Masashi Kishimoto",
      "createdAt": "2026-11-02T04:00:00.000Z",
      "updatedAt": "2026-11-02T04:35:00.000Z"
    }
  }
  ```

---

### 6. Hapus Data Komik
- **URL**: `/komik/:id`
- **Method**: `DELETE`
- **Contoh**: `/komik/1`
- **Response** (200 OK):
  ```json
  {
    "message": "Komik berhasil dihapus"
  }
  ```

---

## 🔒 Keamanan & Best Practices
- **File `.env`**: Tidak pernah di-push ke repositori Git demi menjaga kerahasiaan kredensial database.
- **Folder `node_modules`**: Diabaikan dalam repositori Git via `.gitignore`.
- **Gunakan `.env.example`**: Sebagai panduan bagi kolaborator untuk mengonfigurasi variabel environment lokal.
