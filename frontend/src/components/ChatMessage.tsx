import { Bot, Check, Clipboard, UserRound } from 'lucide-react'
import { useState } from 'react'
import type { ChatMessage as ChatMessageType } from '../hooks/useChat'

type ChatMessageProps = {
  message: ChatMessageType
}

const formatTime = (timestamp: string) =>
  new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))

function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'
  const isStreaming = message.status === 'streaming'

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message.content)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <article
      className={[
        'group flex gap-3',
        isUser ? 'justify-end' : 'justify-start',
      ].join(' ')}
    >
      {!isUser ? (
        <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-md bg-[#b8f0c3] text-[#17351e] dark:bg-[#203326] dark:text-[#b8f0c3]">
          <Bot size={18} strokeWidth={1.9} />
        </div>
      ) : null}

      <div
        className={[
          'max-w-[min(86%,720px)] rounded-md border p-4 shadow-sm',
          isUser
            ? 'border-[#191c1a] bg-[#191c1a] text-[#f7f8f2]'
            : message.status === 'error'
              ? 'border-[#f1593d]/55 bg-[#fff3ec] text-[#3b211b] dark:bg-[#281914] dark:text-[#ffc7b7]'
              : 'border-[#d9e1d5] bg-white/88 text-[#1f2622] dark:border-[#334137] dark:bg-[#151c18]/92 dark:text-[#eef5eb]',
        ].join(' ')}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold uppercase text-current opacity-70">
            {isUser ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-current opacity-55">
            {formatTime(message.timestamp)}
          </span>
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6">
          {message.content || (isStreaming ? 'Starting...' : '')}
          {isStreaming ? (
            <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-pulse rounded-sm bg-[#f1593d]" />
          ) : null}
        </p>
        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={copyMessage}
            title="Copy"
            aria-label="Copy message"
            className={[
              'grid size-8 place-items-center rounded-md border transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d]',
              isUser
                ? 'border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                : 'border-[#d7dfd2] text-[#586358] hover:border-[#191c1a] hover:text-[#191c1a] dark:border-[#344238] dark:text-[#a2b09e] dark:hover:border-[#b8f0c3] dark:hover:text-[#b8f0c3]',
            ].join(' ')}
          >
            {copied ? (
              <Check size={15} strokeWidth={2} />
            ) : (
              <Clipboard size={15} strokeWidth={1.8} />
            )}
          </button>
        </div>
      </div>

      {isUser ? (
        <div className="mt-1 grid size-9 shrink-0 place-items-center rounded-md bg-[#f1593d] text-white">
          <UserRound size={18} strokeWidth={1.9} />
        </div>
      ) : null}
    </article>
  )
}

export default ChatMessage
