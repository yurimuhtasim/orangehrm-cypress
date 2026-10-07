# OrangeHRM Automation Testing with Cypress

Proyek akhir **Bootcamp Quality Assurance Sanbercode (Batch 78)**: otomasi pengujian aplikasi web OrangeHRM Demo menggunakan Cypress dengan pendekatan Page Object Model (POM).

## Ruang Lingkup

- **Aplikasi yang diuji:** [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com) (situs demo publik)
- **Proyek akhir (`cypress/e2e/final-project`):** 22 test UI
  - Login: 8 test
  - Directory: 6 test
  - Recruitment: 8 test
- **API testing (`cypress/e2e/api`):** 12 test terhadap [reqres.in](https://reqres.in)
- **Latihan bootcamp:** 28 test login (`login.cy.js`, `login-intercept.cy.js`, `pom/login-pom.cy.js`)

## Teknologi

- Cypress 16
- JavaScript
- Page Object Model (POM)
- `cy.intercept` untuk menunggu dan memvalidasi request jaringan
- Fixture (`loginData.json`) untuk data uji login
- Git dan GitHub

## Struktur Proyek

```
cypress/
├── e2e/
│   ├── api/
│   │   └── reqres-api.cy.js
│   ├── final-project/
│   │   ├── directory-final.cy.js
│   │   ├── login-final.cy.js
│   │   └── recruitment-final.cy.js
│   ├── pom/
│   │   └── login-pom.cy.js
│   ├── login-intercept.cy.js
│   └── login.cy.js
├── fixtures/
│   └── loginData.json
├── pages/
│   ├── DirectoryPages.js
│   ├── LoginPages.js
│   └── RecruitmentPages.js
└── support/
cypress.config.js
```

## Cara Menjalankan

Prasyarat: Node.js 22 atau lebih baru, dan Google Chrome (browser bawaan diatur di `cypress.config.js`).

```bash
# Pasang dependency
npm install

# Mode interaktif
npx cypress open

# Jalankan semua spec tanpa tampilan
npx cypress run

# Jalankan satu spec saja
npx cypress run --spec cypress/e2e/final-project/directory-final.cy.js
```

## Daftar Test Case

### Login (`final-project/login-final.cy.js`)

| ID | Skenario |
|---|---|
| TC-LOGIN-001 | Login valid |
| TC-LOGIN-002 | Username salah |
| TC-LOGIN-003 | Password salah |
| TC-LOGIN-004 | Username kosong |
| TC-LOGIN-005 | Password kosong |
| TC-LOGIN-006 | Username dan password kosong |
| TC-LOGIN-007 | Username dan password salah |
| TC-LOGIN-008 | Forgot password |

### Directory (`final-project/directory-final.cy.js`)

| ID | Skenario |
|---|---|
| TC-DIR-001 | Membuka menu Directory |
| TC-DIR-002 | Mencari karyawan yang ada |
| TC-DIR-005 | Mencari karyawan yang tidak ada |
| TC-DIR-006 | Search tanpa mengisi data |
| TC-DIR-007 | Klik Reset |
| TC-DIR-008 | Membuka ulang Directory |

Catatan: TC-DIR-003 dan TC-DIR-004 sengaja dihapus karena tidak memiliki verifikasi hasil dan tujuannya sama dengan TC-DIR-002.

### Recruitment (`final-project/recruitment-final.cy.js`)

| ID | Skenario |
|---|---|
| TC-REC-001 | Membuka menu Recruitment |
| TC-REC-002 | Klik tombol Add |
| TC-REC-003 | Mengisi First Name |
| TC-REC-004 | Mengisi Last Name |
| TC-REC-005 | Mengisi First Name dan Last Name |
| TC-REC-006 | Klik Save tanpa data |
| TC-REC-007 | Mengisi data dan menyimpan kandidat |
| TC-REC-008 | Membuka ulang Recruitment |

### API (`api/reqres-api.cy.js`)

| ID | Skenario |
|---|---|
| TC-API-001 | Get list users page 1 |
| TC-API-002 | Get list users page 2 |
| TC-API-003 | Get single user |
| TC-API-004 | Get single user not found |
| TC-API-005 | Get list resource |
| TC-API-006 | Get single resource |
| TC-API-007 | Create user |
| TC-API-008 | Update user (PUT) |
| TC-API-009 | Update user (PATCH) |
| TC-API-010 | Delete user |
| TC-API-011 | Register successful |
| TC-API-012 | Login successful |

## Catatan Pengujian

- **Situs demo publik tidak selalu stabil.** Halaman bisa lambat dimuat dan datanya berubah karena dipakai banyak orang. Karena itu `pageLoadTimeout` diatur 120 detik dan `defaultCommandTimeout` 10 detik di `cypress.config.js`.
- **Pencarian karyawan di Directory** memilih nama dari daftar saran (autocomplete), karena input yang tidak cocok dengan karyawan mana pun ditolak aplikasi dengan pesan "Invalid". TC-DIR-005 memverifikasi perilaku itu.
- **TC-REC-007 menambah satu kandidat baru** di situs demo setiap kali dijalankan. Nama dan email dibuat unik dari timestamp supaya tidak bentrok.
- **Setiap test memiliki assertion.** Test yang sebelumnya hanya menjalankan aksi tanpa verifikasi sudah dilengkapi atau dihapus.

## Rencana Pengembangan

- Mengganti `cy.wait(2000)` di `beforeEach` dengan menunggu elemen atau request yang spesifik.
- Memindahkan kredensial login di `beforeEach` Directory dan Recruitment ke fixture, dan memakai `cy.session` supaya login tidak diulang di setiap test.
- Menambah modul lain dan menjalankan test lewat CI.
