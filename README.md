# 🚗 Car Manager - Advanced React Native Application

A performance-oriented vehicle management application built with modern mobile development practices. This project focuses on high user experience by leveraging the advanced features of **Redux Toolkit Query**.

## 🛠 Technical Stack & Architecture
* **React Native & TypeScript:** Ensuring type safety and a robust code structure.
* **Redux Toolkit Query (RTK Query):** Advanced data fetching, automated caching, and state synchronization.
* **Optimistic Updates:** Enhances UX by updating the UI immediately before the server responds, with a built-in **Undo/Rollback** mechanism in case of server errors.
* **Advanced State Management:** Efficient management of both global UI state and asynchronous server state.

## ✨ Key Features
* **High Performance:** Minimized API calls through efficient local caching and cache invalidation strategies.
* **Robust Error Handling:** Custom error transformation and centralized error handling to provide meaningful user feedback.
* **Modern & Dynamic UI:** A seamless profile and vehicle management system designed for responsiveness.
* **Manual Cache Manipulation:** Professional use of `api.util.updateQueryData` for real-time UI consistency.

## 📸 Screenshots
| Profile Management | Vehicle List | Update Logic |
|---|---|---|
| (Add screenshot) | (Add screenshot) | (Add screenshot) |

## 🚀 Getting Started

### Prerequisites
* Node.js & npm/yarn
* React Native Development Environment
* [JSON-Server](https://www.npmjs.com/package/json-server) (for mock backend)

### Installation
1. Clone the repository:
   ```sh
   git clone [https://github.com/fatmaresuloglu/cars.git](https://github.com/fatmaresuloglu/cars.git)

# 🚗 Car Manager - Advanced React Native Application

Bu proje, modern mobil uygulama geliştirme pratiklerini içeren, performans odaklı bir araç yönetim uygulamasıdır. **Redux Toolkit Query**'nin ileri seviye özelliklerini kullanarak yüksek kullanıcı deneyimi hedeflenmiştir.

## 🛠 Teknik Yetkinlikler & Mimari
* **React Native & TypeScript:** Tip güvenliği ve sağlam kod yapısı.
* **Redux Toolkit Query (RTK Query):** Veri çekme, önbellekleme (caching) ve senkronizasyon yönetimi.
* **Optimistic Updates:** Kullanıcı bir veriyi güncellediğinde, sunucu yanıtını beklemeden arayüzün güncellenmesi ve hata durumunda otomatik geri sarma (Undo) mekanizması.
* **Advanced State Management:** Global state ve server state'in verimli yönetimi.

## ✨ Öne Çıkan Özellikler
* **Hızlı Performans:** Veriler yerel önbellekte tutularak gereksiz API istekleri engellendi.
* **Hata Yönetimi:** API seviyesinde hata yakalama ve kullanıcıya anlamlı geri bildirimler (Custom Error Transformation).
* **Modern UI:** Kullanıcı dostu ve dinamik bir profil/araç yönetim sistemi.

## 📸 Uygulama Görüntüleri
(Buraya uygulamanın ekran görüntülerini yan yana ekle!)

## 🚀 Kurulum
1. `npm install`
2. `npm start`
3. Backend için JSON-Server kullanılmıştır.
