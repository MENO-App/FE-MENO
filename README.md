# 🍽️ MENO – Frontend

Frontend client for **MENO**, a modern school meal management application where students can:

- 📅 View the weekly menu  
- 🥗 Filter meals based on allergies and dietary preferences  
- 🍲 View detailed information about each dish  
- 👤 Manage their profile  
- ⚙️ (Admin) Create and manage dishes  

The application is built using **React + Vite** and communicates with a **.NET 8 Web API** following Clean Architecture principles.

---

## 🚀 Project Status

- 🔧 Currently under active development  
- 🌍 Deployment to Azure planned  
- 🔁 CI/CD configured via GitHub Actions  

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|----------|
| React 18 | UI & component structure |
| Vite | Fast development environment |
| React Router | Client-side routing |
| Fetch API | Communication with backend |
| Environment Variables | API base URL configuration |
| GitHub Actions | CI/CD pipeline |

---

## 📌 Features

- Display weekly menu  
- Dynamic rendering of dishes  
- Allergy-based filtering  
- Dish details page  
- Profile management  
- CRUD functionality (Admin)  
- Loading states  
- Error handling  
- Environment-based API configuration  

---

## 📂 Project Structure

```bash
src
├── pages
│   ├── HomePage.jsx
│   ├── MenuPage.jsx
│   ├── DishDetailsPage.jsx
│   ├── ProfilePage.jsx
│   └── AdminPage.jsx
│
├── components
│   ├── Navbar.jsx
│   ├── DishCard.jsx
│   ├── AllergyChip.jsx
│   └── Loader.jsx
│
├── services
│   └── api.js
│
├── context
│
└── main.jsx
```


The structure follows **Separation of Concerns**:

- Pages handle views  
- Components are reusable UI elements  
- Services handle API communication  
- Context manages global state  

---

## ⚙️ Local Development

### 1. Clone the repository

```bash
git clone <repository-url>
cd meno-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run dev
```

---

## 🏗 Production Build

```bash
npm run build
```


---

## 🔄 CI/CD

The project uses GitHub Actions to:

- Install dependencies  
- Build the project  
- Run quality checks  
- Prepare for deployment  

Deployment to Azure Static Web Apps is planned.

---

## 🎯 Architectural Principles

The frontend is designed according to the following principles:

- Single Responsibility Principle  
- Modular component architecture  
- Centralized API management  
- Environment-based configuration  
- Clear separation between UI and data layer  

These principles ensure scalability, maintainability, and clean separation of concerns.

---

## 👥 Team

This project is developed as part of a fullstack group assignment within a .NET System Developer program.

### Roles

- Backend Lead  
- Frontend Lead  
- DevOps / CI/CD Responsible  
- Project Lead  


