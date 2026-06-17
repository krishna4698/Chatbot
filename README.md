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
