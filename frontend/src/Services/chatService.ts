import axios from 'axios'

export type Conversation = {
  _id: string
  question: string
  answer: string
  createdAt?: string
  updatedAt?: string
}

type ApiResponse<T> = {
  success?: boolean
  message?: string
  data: T
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000,
})

export const getApiBaseUrl = () => api.defaults.baseURL ?? ''

const getEndpoint = (path: string) =>
  `${getApiBaseUrl().replace(/\/$/, '')}${path}`

export const askChat = async (question: string) => {
  const response = await api.post<ApiResponse<Conversation>>('/chat', {
    question,
  })

  return response.data.data
}

export const fetchConversations = async () => {
  const response = await api.get<ApiResponse<Conversation[]>>('/chat/history')

  return response.data.data ?? []
}

type StreamChatHandlers = {
  onChunk: (chunk: string) => void
  onDone?: (conversation: Conversation) => void
}

const parseStreamBlock = (block: string) => {
  let event = 'message'
  let data = ''

  for (const line of block.split(/\r?\n/)) {
    if (line.startsWith('event:')) {
      event = line.slice(6).trim()
    }

    if (line.startsWith('data:')) {
      data += line.slice(5).trim()
    }
  }

  return {
    event,
    data,
  }
}

export const streamChat = async (
  question: string,
  handlers: StreamChatHandlers,
) => {
  const response = await fetch(getEndpoint('/chat/stream'), {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      question,
    }),
  })

  if (!response.ok || !response.body) {
    throw new Error('Streaming request failed')
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let completedConversation: Conversation | null = null

  while (true) {
    const { value, done } = await reader.read()

    if (done) {
      break
    }

    buffer += decoder.decode(value, { stream: true })
    const blocks = buffer.split(/\n\n/)
    buffer = blocks.pop() ?? ''

    for (const block of blocks) {
      const parsedBlock = parseStreamBlock(block)

      if (!parsedBlock.data) {
        continue
      }

      const payload = JSON.parse(parsedBlock.data) as {
        text?: string
        message?: string
        conversation?: Conversation
      }

      if (parsedBlock.event === 'chunk' && payload.text) {
        handlers.onChunk(payload.text)
      }

      if (parsedBlock.event === 'done' && payload.conversation) {
        completedConversation = payload.conversation
        handlers.onDone?.(payload.conversation)
      }

      if (parsedBlock.event === 'error') {
        throw new Error(payload.message ?? 'Streaming failed')
      }
    }
  }

  return completedConversation
}
