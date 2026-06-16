import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  fetchConversations,
  streamChat,
  type Conversation,
} from '../Services/chatService'

export type ChatMessage = {
  id: string
  role: 'assistant' | 'user'
  content: string
  timestamp: string
  status?: 'error' | 'streaming'
}

const starterMessage: ChatMessage = {
  id: 'welcome-message',
  role: 'assistant',
  content:
    'I am ready. Bring me a bug, a plan, a half-formed idea, or one messy question and I will help shape it.',
  timestamp: new Date().toISOString(),
}

export const starterPrompts = [
  'Turn this idea into a clean implementation plan',
  'Review my backend flow for risks',
  'Draft a friendly answer for a user',
  'Explain this code like I am tired',
]

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const getMessageFromError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'The backend did not respond.'
}

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([starterMessage])
  const [history, setHistory] = useState<Conversation[]>([])
  const [isSending, setIsSending] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    setIsLoadingHistory(true)

    try {
      const conversations = await fetchConversations()
      setHistory(conversations)
    } catch (loadError) {
      setError(getMessageFromError(loadError))
    } finally {
      setIsLoadingHistory(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadHistory])

  const sendQuestion = useCallback(async (question: string) => {
    const trimmedQuestion = question.trim()

    if (!trimmedQuestion || isSending) {
      return
    }

    const assistantMessageId = createId()
    let streamedAnswer = ''

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: createId(),
        role: 'user',
        content: trimmedQuestion,
        timestamp: new Date().toISOString(),
      },
      {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString(),
        status: 'streaming',
      },
    ])
    setIsSending(true)
    setError(null)

    try {
      const conversation = await streamChat(trimmedQuestion, {
        onChunk: (chunk) => {
          streamedAnswer += chunk
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    content: streamedAnswer,
                  }
                : message,
            ),
          )
        },
        onDone: (savedConversation) => {
          setMessages((currentMessages) =>
            currentMessages.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    id: savedConversation._id ?? assistantMessageId,
                    content: savedConversation.answer || streamedAnswer,
                    timestamp:
                      savedConversation.createdAt ?? message.timestamp,
                    status: undefined,
                  }
                : message,
            ),
          )
          setHistory((currentHistory) => [
            savedConversation,
            ...currentHistory.filter(
              (item) => item._id !== savedConversation._id,
            ),
          ])
        },
      })

      if (!conversation) {
        setMessages((currentMessages) =>
          currentMessages.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: streamedAnswer,
                  status: undefined,
                }
              : message,
          ),
        )
      }
    } catch (sendError) {
      const message = getMessageFromError(sendError)

      setError(message)
      setMessages((currentMessages) => {
        const currentWithoutStreaming = currentMessages.filter(
          (chatMessage) => chatMessage.status !== 'streaming',
        )

        return [
          ...currentWithoutStreaming,
          {
            id: createId(),
            role: 'assistant',
            content:
              'I could not reach the backend just now. Check that the server is running and try once more.',
            timestamp: new Date().toISOString(),
            status: 'error',
          },
        ]
      })
    } finally {
      setIsSending(false)
    }
  }, [isSending])

  const resetConversation = useCallback(() => {
    setMessages([
      {
        ...starterMessage,
        timestamp: new Date().toISOString(),
      },
    ])
    setError(null)
  }, [])

  const activeTopics = useMemo(() => {
    const questions = history.slice(0, 4).map((item) => item.question)

    return questions.length > 0
      ? questions
      : ['Backend health', 'UI copy', 'Debugging', 'Planning']
  }, [history])

  return {
    activeTopics,
    error,
    history,
    isLoadingHistory,
    isSending,
    messages,
    resetConversation,
    sendQuestion,
    starterPrompts,
    reloadHistory: loadHistory,
  }
}
