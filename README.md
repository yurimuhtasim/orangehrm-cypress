# OrangeHRM Automation Testing with Cypress

Project akhir automation testing menggunakan Cypress pada website OrangeHRM Demo.

## Website
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

## Tools
- Cypress
- JavaScript
- Visual Studio Code
- GitHub

## Framework
- Page Object Model (POM)
- Intercept API

## Fitur yang diuji

### 1. Login Module
- TC-LOGIN-001 Login valid
- TC-LOGIN-002 Username salah
- TC-LOGIN-003 Password salah
- TC-LOGIN-004 Username kosong
- TC-LOGIN-005 Password kosong
- TC-LOGIN-006 Username dan Password kosong
- TC-LOGIN-007 Username dan Password salah
- TC-LOGIN-008 Forgot Password

### 2. Directory Module
- TC-DIR-001 Open Directory
- TC-DIR-002 Search Liana
- TC-DIR-003 Search Abi
- TC-DIR-004 Search Admin
- TC-DIR-005 Search Employee Tidak Ada
- TC-DIR-006 Search Tanpa Isi Data
- TC-DIR-007 Klik Reset
- TC-DIR-008 Buka Ulang Directory

### 3. Recruitment Module
- TC-REC-001 Open Recruitment
- TC-REC-002 Klik Add
- TC-REC-003 Isi First Name
- TC-REC-004 Isi Last Name
- TC-REC-005 Isi First dan Last Name
- TC-REC-006 Klik Save Tanpa Isi Data
- TC-REC-007 Isi Data lalu Save
- TC-REC-008 Buka Recruitment Kembali

## Struktur Folder

```text
cypress
│
├── e2e
│   └── final-project
│       ├── login-final.cy.js
│       ├── directory-final.cy.js
│       └── recruitment-final.cy.js
│
├── pages
│   ├── LoginPages.js
│   ├── DirectoryPages.js
│   └── RecruitmentPages.js
│
├── fixtures
│
└── support
