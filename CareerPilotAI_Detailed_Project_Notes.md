# CareerPilotAI — Project Notes

## 1. Project Overview

**CareerPilotAI** is an AI-powered career preparation web application for students, freshers, and job seekers.

### Main Purpose

- Help users prepare for interviews using Generative AI.
- Analyze resumes.
- Generate personalized mock-interview questions.
- Evaluate interview answers.
- Provide scores, feedback, and reports.
- Use a credit-based system for AI features.

### Main User Flow

User → Google Login → Interview Setup → Resume Analysis → AI Questions → Mock Interview → AI Evaluation → Report → Interview History

---

## 2. Features

### Authentication

- Google authentication using Firebase.
- Backend identifies/creates the user.
- JWT-based authentication.
- JWT stored in an HTTP-only cookie.

### Resume Analysis

- Upload resume PDF.
- Multer handles file upload.
- PDF text is extracted.
- Extracted text is sent to OpenRouter/LLM.
- AI returns structured resume analysis.
- Temporary uploaded files can be deleted after processing.

### AI Mock Interview

- User provides role, experience, mode, resume, projects, and skills.
- AI generates interview questions.
- Questions can have different difficulty levels and time limits.
- Interview data is stored in MongoDB.

### AI Answer Evaluation

- User submits an answer.
- Backend checks the interview/question and time.
- AI evaluates the answer.
- Evaluation includes:
    - Correctness
    - Confidence
    - Communication
    - Score
    - Feedback

### Interview Reports

- Calculates final/average scores.
- Shows question-wise results.
- Marks the interview as completed.

### Interview History

- Stores previous interviews so users can review them later.

### Credit System

- AI operations consume credits.
- Backend checks credits before performing paid AI operations.
- Credits are deducted after successful operations.

### Payments

- Razorpay is used to purchase credits.
- Backend handles order creation and payment verification.
- Verified payments can add credits to the user account.

### Speech/Video Interview UI

- Browser Speech Synthesis is used for AI voice.
- Interviewer configuration can control voice/video.
- React refs and video source switching are used in the interview UI.

---

## 3. Tech Stack

### Frontend

- React
- Vite
- React Router
- Redux Toolkit
- Tailwind CSS
- Axios
- Firebase Authentication
- Motion
- React Icons / Lucide React

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cookie Parser
- CORS
- Multer

### External Services

- OpenRouter → AI/LLM API
- Firebase → Google authentication
- Razorpay → Payments

### Database

- MongoDB Atlas

### Deployment

- Render
- Separate frontend and backend services

Production:

- Client: `https://careerpilot-ai-client.onrender.com`
- Server: `https://careerpilot-ai-server-i70n.onrender.com`

---

## 4. Architecture & Data Flow

### Overall Architecture

React → Axios → Express → Controllers/Services → MongoDB

External integrations:

Express → OpenRouter
Express → Razorpay
Frontend/Firebase → Authentication → Express

### Main Architecture

Browser
→ React Frontend
→ Axios
→ Express Backend
→ Middleware
→ Controller
→ Service/Model
→ MongoDB / OpenRouter / Razorpay

### Authentication Flow

Google
→ Firebase
→ Frontend
→ Backend
→ Find/Create User
→ Generate JWT
→ HTTP-only Cookie
→ Future Requests
→ JWT Verification
→ `req.userId`

### Resume Analysis Flow

PDF
→ FormData
→ Express
→ Multer
→ PDF Text Extraction
→ AI Prompt
→ OpenRouter
→ LLM
→ Parse Response
→ Frontend

### Interview Generation Flow

Role + Experience + Mode + Resume + Projects + Skills
→ Backend
→ Credit Check
→ OpenRouter
→ Questions
→ Interview Document
→ Frontend

### Answer Evaluation Flow

Question + Answer + Time
→ Backend
→ Validation
→ OpenRouter
→ AI Evaluation
→ Parse JSON
→ Update Interview
→ Feedback

### Payment Flow

Frontend
→ Backend
→ Razorpay Order
→ Payment
→ Backend Verification
→ Add Credits

---

## 5. Project Structure

### Client

```text
client/
├── src/
│   ├── components/
│   │   ├── AuthModel.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── Auth.jsx
│   │   ├── Home.jsx
│   │   └── ...
│   ├── redux/
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── services/
│   ├── utils/
│   │   └── firebase.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── vite.config.js
```

### Server

```text
server/
├── config/
├── controllers/
│   └── interview.controller.js
├── middlewares/
│   └── multer.js
├── models/
├── routes/
│   └── interview.route.js
├── services/
├── public/
├── index.js
└── package.json
```

### Folder Responsibilities

- `components/` → Reusable UI components.
- `pages/` → Page-level components.
- `redux/` → Global state management.
- `services/` → External/API communication.
- `utils/` → Reusable helper/configuration logic.
- `controllers/` → Backend application/business logic.
- `routes/` → API endpoint definitions.
- `middlewares/` → Request processing such as auth and file upload.
- `models/` → MongoDB/Mongoose schemas and models.
- `config/` → Backend configuration.
- `public/` → Static/temporary files where applicable.

---

## 6. Database Design

### User Collection

Important fields:

- `name`
- `email`
- `credits`
- User/authentication information

### Interview Collection

Important fields:

- `userId`
- `role`
- `experience`
- `mode`
- `resumeText`
- `questions`
- `finalScore`
- `status`

### Question Data

Each question can contain:

- Question text
- Difficulty
- Time limit
- Answer
- Feedback
- Score
- Confidence
- Communication
- Correctness

### Relationship

One User → Many Interviews

```text
User
├── Interview 1
├── Interview 2
├── Interview 3
└── Interview 4
```

`Interview.userId` connects the interview to the user.

---

## 7. Authentication & Authorization

### Authentication

Authentication answers:

> Who is the user?

CareerPilotAI uses:

Google → Firebase → Backend → JWT

### JWT

After successful authentication:

Backend → JWT → HTTP-only Cookie

The JWT is used to identify the authenticated user on later requests.

### Cookie Configuration

Important options:

- `httpOnly: true` → JavaScript cannot directly access the cookie.
- `secure: true` → Cookie is sent over HTTPS.
- `sameSite: "none"` → Supports the cross-site frontend/backend deployment setup.
- `maxAge` → Controls cookie lifetime.

### Authentication Middleware

Request
→ Read Cookie
→ Verify JWT
→ Extract User ID
→ `req.userId`
→ Controller

### Authorization Principle

Do not blindly trust a user ID sent from the frontend.

Protected operations should:

1. Authenticate the request.
2. Identify the logged-in user.
3. Verify that the resource belongs to that user.
4. Perform the operation.

---

## 8. API / Server Actions

### Authentication APIs

#### `POST /api/auth/google`

- Receives Google authentication information.
- Finds/creates user.
- Generates JWT.
- Sets authentication cookie.

#### `POST /api/auth/logout`

- Clears authentication cookie.
- Ends the session.

#### `GET /api/user/current-user`

- Gets the currently authenticated user.

### Interview APIs

#### Generate Interview

- Receives role, experience, mode, resume, projects, and skills.
- Checks authentication and credits.
- Calls AI.
- Generates questions.
- Creates interview document.
- Returns interview information.

#### Submit Answer

- Receives:
    - `interviewId`
    - `questionIndex`
    - `answer`
    - `timeTaken`
- Validates input.
- Checks time.
- Sends answer to AI.
- Stores evaluation.
- Returns feedback.

#### Finish Interview

- Finds interview.
- Calculates final/average scores.
- Updates interview status.
- Returns report data.

### Payment APIs

Typical flow:

- Create Razorpay order.
- Complete payment.
- Verify payment on backend.
- Add credits.

---

## 9. Important Concepts

### React

- Components
- Props
- State
- `useState`
- `useEffect`
- `useRef`
- Conditional rendering
- Component composition

### React Router

URL → Router → Page Component

### Redux Toolkit

- Store
- Slice
- Reducer
- Dispatch
- Selector

Used mainly for global user/application state.

### REST API

- `GET` → Retrieve
- `POST` → Create/perform operation
- `PUT` → Replace/update
- `PATCH` → Partial update
- `DELETE` → Delete

### Express Middleware

Request → Middleware → Controller → Response

Examples:

- CORS
- Authentication
- Cookie parsing
- Multer

### MongoDB + Mongoose

Schema → Model → MongoDB Collection

MongoDB stores documents; Mongoose provides schemas, models, validation, and database operations.

### JWT + Cookies

Login → JWT → Cookie → Future Request → Verification → User ID

### CORS

Important because frontend and backend are deployed on different origins.

Production:

```text
Client: https://careerpilot-ai-client.onrender.com
Server: https://careerpilot-ai-server-i70n.onrender.com
```

Credentialed requests/cookies require correct CORS configuration.

### Environment Variables

Keep secrets/configuration outside source code.

Examples:

- `MONGODB_URI`
- `JWT_SECRET`
- `OPENROUTER_API_KEY`
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
- `CLIENT_URL`
- `VITE_SERVER_URL`

### File Uploads

Normal JSON:
`application/json`

File upload:
`multipart/form-data`

Multer processes the multipart request.

### PDF Processing

PDF → Text Extraction → Prompt → LLM

The AI receives extracted text rather than directly understanding the uploaded file.

### Prompt Engineering

AI prompts should clearly specify:

- User context
- Task
- Required output
- Constraints
- Expected format

### Structured AI Output

AI → JSON → `JSON.parse()` → JavaScript Object → Database

Structured output makes AI responses easier to process programmatically.

### AI API Security

Do not expose secret AI API keys in the frontend.

Correct:

React → Backend → OpenRouter

Not:

React → OpenRouter using a secret API key

### Credit System

Check credits before expensive AI operations.

Example:

```text
100 credits
   ↓
Operation costs 50
   ↓
50 credits remaining
```

Credit management should be controlled by the backend.

### Payment Verification

Frontend should not decide that a payment succeeded.

Correct:

Payment → Backend Verification → Credits Added

### Speech Synthesis

Text → Browser Speech Synthesis → Voice

Available voices depend on the browser/operating system.

### Video Source Switching

Interviewer → `male` / `female` → Video Source

Using `key={videoSource}` can force the video element to recreate when the source changes.

### Services vs Utils

**Services**

- API calls
- External integrations
- Business integrations

**Utils**

- Reusable helper logic
- Small utility functions
- Configuration/helper code

Simple rule:

> Service = communicates with something.  
> Utility = performs a reusable local task.

### Development vs Production

Development:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:5000
```

Production:

```text
Frontend: https://careerpilot-ai-client.onrender.com
Backend:  https://careerpilot-ai-server-i70n.onrender.com
```

Use environment variables so the frontend can switch between them.

### Deployment

GitHub → Render → Build → Deploy

Client and server are deployed separately.

---

## 10. Future Improvements

### Features

- More interview modes:
    - Technical
    - HR
    - Behavioral
    - System Design
    - Coding
- Personalized interview questions.
- Job recommendations.
- Career roadmaps.
- Skill-gap analysis.
- More detailed AI feedback.

### AI Improvements

- Better structured output validation.
- Retry/repair invalid AI JSON.
- More personalized prompts.
- Better answer evaluation.
- Prompt-injection protection.

### Security

- Strong input validation.
- Rate limiting.
- Authorization checks.
- Secure file validation.
- File-type validation.
- Upload size restrictions.
- Strong payment verification.
- Secure secret management.

### Performance

- Reduce unnecessary API calls.
- Optimize React renders.
- Lazy-load pages.
- Optimize assets.
- Optimize MongoDB queries.
- Add appropriate database indexes.
- Cache suitable data.

### UI/UX

- Better loading states.
- Skeleton loaders.
- Better error handling.
- Interview progress indicator.
- Better report visualization.
- Responsive design.
- Accessibility improvements.
- Improved animations.

### Production

- Error monitoring.
- Logging.
- Performance monitoring.
- Alerts.
- CI/CD improvements.

---

# Quick Mental Map

```text
                    CAREERPILOTAI
                          │
        ┌─────────────────┼─────────────────┐
        ↓                 ↓                 ↓
    FRONTEND            BACKEND          DATABASE
     React              Node              MongoDB
     Vite               Express           Mongoose
     Router             Routes
     Redux              Controllers
     Tailwind           Middleware
        │                 │
        └──────────┬──────┘
                   ↓
            EXTERNAL SERVICES
                   │
       ┌───────────┼───────────┐
       ↓           ↓           ↓
   OpenRouter   Firebase    Razorpay
       ↓           ↓           ↓
      AI        Google Auth  Payments
```

## Core Backend Architecture

```text
React
 ↓
Axios
 ↓
Express Route
 ↓
Middleware
 ↓
Controller
 ↓
Service / Model
 ↓
MongoDB / OpenRouter / Razorpay
```

## Core AI Architecture

```text
User Input
 ↓
Backend
 ↓
Prompt Engineering
 ↓
OpenRouter
 ↓
LLM
 ↓
Structured Response
 ↓
Validation / Parsing
 ↓
MongoDB
 ↓
Frontend
```

## Core Interview Architecture

```text
Interview Setup
 ↓
Credit Check
 ↓
AI Question Generation
 ↓
Interview Document
 ↓
Question
 ↓
User Answer
 ↓
AI Evaluation
 ↓
Question Score
 ↓
Final Score
 ↓
Interview Report
```
