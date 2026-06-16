import { ArrowUp, Sparkles } from 'lucide-react'
import { useState, type FormEvent, type KeyboardEvent } from 'react'

type ChatInputProps = {
  disabled?: boolean
  suggestions: string[]
  onSubmit: (message: string) => void
}

function ChatInput({ disabled = false, suggestions, onSubmit }: ChatInputProps) {
  const [message, setMessage] = useState('')

  const submitMessage = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    const trimmedMessage = message.trim()

    if (!trimmedMessage || disabled) {
      return
    }

    onSubmit(trimmedMessage)
    setMessage('')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      submitMessage()
    }
  }

  const selectSuggestion = (suggestion: string) => {
    setMessage(suggestion)
  }

  return (
    <div className="border-t border-[#d8dfd3] bg-[#f9faf4]/95 px-4 py-4 backdrop-blur dark:border-[#2c382f] dark:bg-[#121916]/95 md:px-6">
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 thin-scrollbar">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => selectSuggestion(suggestion)}
            className="inline-flex shrink-0 items-center gap-2 rounded-md border border-[#d3ddd0] bg-white/75 px-3 py-2 text-left text-xs font-medium text-[#445044] transition hover:border-[#f1593d] hover:bg-[#fff8f1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] dark:border-[#304037] dark:bg-white/7 dark:text-[#d7e1d3] dark:hover:border-[#f1593d] dark:hover:bg-[#261c18]"
          >
            <Sparkles size={14} strokeWidth={1.8} />
            <span>{suggestion}</span>
          </button>
        ))}
      </div>

      <form
        onSubmit={submitMessage}
        className="flex items-end gap-3 rounded-md border border-[#bdc9b8] bg-white p-2 shadow-[0_18px_55px_rgba(36,46,38,0.12)] dark:border-[#3a493d] dark:bg-[#0d1210] dark:shadow-[0_18px_55px_rgba(0,0,0,0.28)]"
      >
        <label htmlFor="chat-message" className="sr-only">
          Message
        </label>
        <textarea
          id="chat-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Ask the chatbot..."
          className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-3 py-3 text-sm leading-6 text-[#191c1a] outline-none placeholder:text-[#858d82] dark:text-[#f4f7ef] dark:placeholder:text-[#7f8e82]"
        />
        <button
          type="submit"
          disabled={disabled || message.trim().length === 0}
          title="Send message"
          aria-label="Send message"
          className="grid size-12 shrink-0 place-items-center rounded-md bg-[#191c1a] text-[#f7f8f2] transition hover:bg-[#26342a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] disabled:bg-[#aab5a8] dark:bg-[#b8f0c3] dark:text-[#101412] dark:hover:bg-[#9ee9ad] dark:disabled:bg-[#3a493d]"
        >
          <ArrowUp size={21} strokeWidth={2} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
