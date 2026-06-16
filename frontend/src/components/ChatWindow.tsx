import { AlertCircle, Loader2 } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { ChatMessage as ChatMessageType } from '../hooks/useChat'
import ChatMessage from './ChatMessage'

type ChatWindowProps = {
  messages: ChatMessageType[]
  isSending: boolean
  error: string | null
}

function ChatWindow({ messages, isSending, error }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  return (
    <section className="flex min-h-[480px] flex-1 flex-col overflow-hidden border-x border-[#d8dfd3] bg-[#f8faf4]/70 paper-noise dark:border-[#2c382f]">
      <div className="flex items-center justify-between border-b border-[#d8dfd3] bg-[#fbfcf7]/88 px-4 py-3 backdrop-blur dark:border-[#2c382f] dark:bg-[#121916]/88 md:px-6">
        <div>
          <h1 className="font-serif text-2xl text-[#191c1a] dark:text-[#f7f8f2] md:text-3xl">
            Conversation
          </h1>
          <p className="text-sm text-[#687266] dark:text-[#99a795]">
            Ask, refine, and keep the useful parts.
          </p>
        </div>
        <div className="hidden rounded-md border border-[#bfd0bd] bg-[#eef6ea] px-3 py-2 text-xs font-semibold text-[#315f3a] dark:border-[#35513c] dark:bg-[#122019] dark:text-[#b8f0c3] sm:block">
          Streaming
        </div>
      </div>

      {error ? (
        <div className="mx-4 mt-4 flex items-start gap-3 rounded-md border border-[#f1593d]/45 bg-[#fff1ea] p-3 text-sm text-[#6a2a1b] dark:bg-[#281914] dark:text-[#ffc7b7] md:mx-6">
          <AlertCircle size={18} strokeWidth={1.9} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 thin-scrollbar md:px-6">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isSending ? (
          <div className="flex items-center gap-3 text-sm font-medium text-[#566257] dark:text-[#a5b4a2]">
            <span className="grid size-9 place-items-center rounded-md bg-[#b8f0c3] text-[#17351e] dark:bg-[#203326] dark:text-[#b8f0c3]">
              <Loader2 size={18} strokeWidth={1.9} className="animate-spin" />
            </span>
            <span>Streaming response</span>
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>
    </section>
  )
}

export default ChatWindow
