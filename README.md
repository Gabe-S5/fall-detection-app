## Project Objective
Build a lightweight incident logging and summarization tool for a fictional senior
care home. The goal is to evaluate your backend design, API skills, use of
TypeScript, and ability to work with the tools we use at Fallyx.

# Prerequisites
- Node.js
- PostgreSQL
- Firebase project set up
- OpenAI account

# Installation Instructions

```bash
# Clone repo
git clone <url-here>
cd fall-detection-app

# Install dependencies for frontend and backend separately
cd backend
npm install

cd ../frontend
npm install
```

# Environment Variables Setup
Example .env file for both backend and frontend:

```bash
# backend/.env
DATABASE_URL=postgres://user:password@localhost:5432/dbname
FIREBASE_SERVICE_ACCOUNT_PATH=/path/to/serviceAccountKey.json
OPENAI_API_KEY=your-openai-api-key
PORT=5000

# frontend/.env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Running The App
- Setup PostgreSQL database
- Run backend server
```bash
cd backend
npm run dev
```
- Run frontend server
```bash
cd frontend
npm run dev
```
- Run tests
```bash
cd backend
npm run test
```
- Open http://localhost:3000 to see the app
