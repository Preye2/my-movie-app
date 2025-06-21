# 🎬 Movie Recommendation App

An AI-powered full-stack Movie Recommendation Web App built with **React**, **Node.js**, **Express**, and **MongoDB**, integrated with **TMDB API** and **Google Gemini** for smart movie suggestions. Users can sign up, log in, explore trending movies, view detailed movie pages, save their favorites, and get personalized recommendations.

---

## 🚀 Features

✅ User authentication (JWT-based Login/Signup)  
✅ Browse trending movies (from TMDB API)  
✅ View detailed movie information  
✅ AI-powered movie recommendation using Google Gemini  
✅ Save & manage favorite movies  
✅ Protected routes (favorites/profile)  
✅ Fully responsive UI with styled-components  
✅ Deployment-ready (Vercel for frontend, Render/Heroku for backend)

---

## 🧠 Tech Stack

### 🔹 Frontend
- React.js + Vite
- React Router DOM
- Axios
- Styled-Components
- React Slick (carousel)

### 🔹 Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- dotenv for config management
- TMDB API (for movie data)
- Google Gemini API (for AI recommendations)

---

## 🧾 Folder Structure

movie-recommendation-app/
├── frontend/ # React app
│ ├── src/
│ │ ├── pages/ # Home, Login, Signup, Favorites, Recommend, etc.
│ │ ├── components/ # Navbar, MovieCard, Carousel, ProtectedRoute
│ │ ├── services/ # Axios instance & API functions
│ │ ├── context/ # AuthContext provider
│ │ ├── styles/ # Global styles
│ │ └── App.jsx # Main app routes
├── backend/
│ ├── controllers/ # Auth, Favorites, GPT, Movie controllers
│ ├── models/ # User, Favorite schemas
│ ├── routes/ # Express routes
│ ├── middleware/ # Auth middleware
│ ├── server.js # Express entry point
├── .env # Environment variables
└── README.md


---

## 🔐 Environment Variables

### Frontend (`frontend/.env`)



### Backend (`backend/.env`)

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
TMDB_API_KEY=your_tmdb_key
GEMINI_API_KEY=your_google_gemini_api_key


---

## 📦 Installation

### 1. Clone the repo

```bash
git clone https://github.com/your-username/movie-recommendation-app.git
cd movie-recommendation-app

# backend & frontend setup $
cd backend
npm install
npm run dev

Visit http://localhost:3000

Sign up or log in

Browse trending movies

View a movie detail and click "❤️ Favorite"

View saved favorites via the profile or favorites page

Try the AI-powered recommendation feature





This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
