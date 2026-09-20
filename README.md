# CareerPilotAI 🚀

CareerPilotAI is an AI-powered career preparation platform that helps users prepare for interviews, analyze resumes, track interview performance, and improve their career readiness.

## ✨ Features

- 🔐 Google Authentication
- 📄 AI-powered Resume Analysis
- 🎤 AI Mock Interviews
- 🗣️ Speech Recognition & Speech Synthesis
- 📊 Interview History & Reports
- 💳 Razorpay Payment Integration
- 👤 User & Credit Management
- 📥 Interview Report PDF Download

## 🛠️ Tech Stack

### Frontend

- React.js
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Firebase Authentication
- Motion

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- OpenRouter AI
- Razorpay

### Deployment

- Frontend: Render
- Backend: Render
- Database: MongoDB Atlas
- Authentication: Firebase

## 📁 Project Structure

careerpilot-ai/
├── client/       # React frontend
└── server/       # Express backend

## ⚙️ Environment Variables

### Client

VITE_SERVER_URL=
VITE_FIREBASE_APIKEY=
VITE_RAZORPAY_KEY_ID=

### Server

CLIENT_URL=
JWT_SECRET=
MONGODB_URL=
OPENROUTER_API_KEY=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
PORT=

## 🚀 Run Locally

### 1. Clone the repository

git clone <repository-url>
cd careerpilot-ai

### 2. Install dependencies

cd client
npm install

cd ../server
npm install

### 3. Start the backend

cd server
npm run dev

### 4. Start the frontend

cd client
npm run dev

## 🌐 Deployment

The application is deployed as separate frontend and backend services.

- Frontend → Render Static Site
- Backend → Render Web Service
- MongoDB → MongoDB Atlas

Make sure the production frontend URL is configured as CLIENT_URL on the backend and the production backend URL is configured as VITE_SERVER_URL on the frontend.

