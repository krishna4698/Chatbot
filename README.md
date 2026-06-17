# AI Chatbot

AI Chatbot is a full-stack conversational web app built with React, TypeScript, Express, MongoDB, and Google Gemini. It supports real-time streamed AI responses, saves every conversation to the database, and provides a clean ChatGPT-style interface with dark mode and conversation history.

## What This Project Does

- Lets users ask questions through a modern chat interface.
- Streams AI responses token-by-token so answers appear live.
- Stores each question and answer in MongoDB.
- Shows previous conversations in a searchable history page.
- Supports light and dark mode.
- Keeps the chat input fixed at the bottom while messages scroll inside the conversation area.

## Tech Stack

**Frontend**

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React icons

**Backend**

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Google Gemini API
- Server-sent event style streaming

## Project Structure

```text
AiChatbot/
  backend/
    src/
      config/
      controllers/
      models/
      routes/
      services/
    package.json
  frontend/
    src/
      components/
      hooks/
      pages/
      Services/
    package.json
```

## Key Features

### 1. ChatGPT-Style Chat UI

The frontend uses a fixed-height chat layout. The message area scrolls independently, while the input bar stays fixed at the bottom of the chat window. This makes long AI responses easy to read without losing the input box.

### 2. Streaming AI Responses

The backend exposes a streaming endpoint:

```text
POST /api/chat/stream
```

The frontend reads chunks from this endpoint and updates the assistant message live as the answer is generated.

### 3. Conversation History

Every completed AI response is saved in MongoDB with:

- User question
- AI answer
- Created timestamp

The history page fetches saved conversations from:

```text
GET /api/chat/history
```

### 4. Dark Mode

The app includes a theme toggle. The selected theme is saved in local storage, so the user keeps the same mode after refreshing the page.

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
DATABASE_URL=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Optional frontend environment variable:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

If `VITE_API_BASE_URL` is not set, the frontend uses:

```text
http://localhost:5000/api
```

## How To Run Locally

### Backend

```powershell
cd backend
npm install
npm run build
npm start
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## API Routes

### Ask Question

```http
POST /api/chat
```

Request body:

```json
{
  "question": "Explain merge sort"
}
```

### Stream Question

```http
POST /api/chat/stream
```

Request body:

```json
{
  "question": "Explain merge sort"
}
```

Events returned:

```text
event: chunk
data: {"text":"partial answer"}

event: done
data: {"conversation": {...}}
```

### Get Conversation History

```http
GET /api/chat/history
```

## Demo Video Script

Use this flow for a 4-5 minute demo video.

### 0:00 - 0:30: Introduction

"This is my AI Chatbot project. It is a full-stack chatbot built using React, TypeScript, Tailwind CSS, Express, MongoDB, and Google Gemini. The goal is to create a clean ChatGPT-like experience where users can ask questions, receive streamed AI responses, and view previous conversations."

Show:

- App home page
- Chat layout
- Dark mode toggle

### 0:30 - 1:20: Frontend UI Walkthrough

"The frontend is built with React and Tailwind CSS. The design has a sidebar, a central chat window, and a fixed input bar at the bottom. The important part is that the response scrolls inside the chat window, while the input stays available just like modern AI chat tools."

Show:

- Fixed input bar
- Message window
- Responsive layout if possible
- Dark mode switch

### 1:20 - 2:20: Asking A Question

"Now I will ask a question. When I send the message, the backend calls the Gemini API and streams the response back to the frontend. Instead of waiting for the full answer, the UI updates as chunks arrive."

Demo question:

```text
Give me code to sort an array using merge sort in C++
```

Show:

- User message appears
- Assistant response streams live
- Input bar remains fixed
- Message window can scroll

### 2:20 - 3:10: Backend Explanation

"The backend is built with Express and TypeScript. It has a chat route for normal responses, a stream route for live responses, and a history route for saved conversations. Gemini generates the answer, and after streaming is complete, the question and answer are saved in MongoDB."

Show code briefly:

- `backend/src/routes/chat.route.ts`
- `backend/src/controllers/chat.controller.ts`
- `backend/src/services/ai.service.ts`
- `backend/src/models/conversation.model.ts`

### 3:10 - 3:50: Conversation History

"After the response is completed, the conversation is stored in the database. On the history page, users can view previous questions and answers. There is also a search bar to quickly find old conversations."

Show:

- History page
- Search bar
- Saved conversations

### 3:50 - 4:30: Future Improvements

"There are several improvements I can add next. I can add user authentication, separate chat sessions, delete and rename conversations, better markdown rendering for code blocks, file uploads, voice input, deployment, and rate limiting for production safety."

Show:

- App final screen
- Mention future scope

### 4:30 - 5:00: Closing

"So overall, this project demonstrates a full-stack AI chatbot with a modern UI, streaming AI responses, MongoDB history, dark mode, and a ChatGPT-style user experience."

## Future Improvements

- Add user authentication and personal chat history.
- Add multiple chat sessions instead of one continuous conversation.
- Add rename, delete, and pin options for conversations.
- Render markdown properly for code blocks, tables, and lists.
- Add copy buttons for code blocks specifically.
- Add loading skeletons for history and chat pages.
- Add voice input and text-to-speech output.
- Add file upload support for document-based questions.
- Add backend rate limiting and request validation.
- Add production deployment with environment-specific configuration.
- Add tests for backend routes and frontend chat behavior.
- Add better error messages for missing API keys or database connection issues.

## Build Checks

Frontend:

```powershell
cd frontend
npm run lint
npm run build
```

Backend:

```powershell
cd backend
npm run build
```

## Current Status

The app currently includes:

- Full-stack chat flow
- Streaming AI response route
- MongoDB conversation storage
- Searchable history page
- Tailwind-based frontend
- Dark mode
- Fixed bottom chat input
