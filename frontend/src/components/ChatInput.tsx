import { ArrowUp } from 'lucide-react'
import { useState, type FormEvent, type KeyboardEvent } from 'react'

type ChatInputProps = {
  disabled?: boolean
  onSubmit: (message: string) => void
}

function ChatInput({ disabled = false, onSubmit }: ChatInputProps) {
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

  return (
    <div className="shrink-0 border-t border-[#d8dfd3] bg-[#f4f7ef]/95 px-3 py-3 backdrop-blur dark:border-[#2c382f] dark:bg-[#121916]/95 sm:px-5 md:px-6">
      <form
        onSubmit={submitMessage}
        className="mx-auto flex min-h-[78px] w-full max-w-5xl items-center gap-3 rounded-lg border border-[#b9c6b4] bg-white px-4 py-2 shadow-[0_10px_30px_rgba(36,46,38,0.08)] transition focus-within:border-[#8fa18b] focus-within:shadow-[0_14px_42px_rgba(36,46,38,0.12)] dark:border-[#465648] dark:bg-[#0d1210] dark:shadow-[0_18px_55px_rgba(0,0,0,0.28)] dark:focus-within:border-[#b8f0c3]"
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
          className="max-h-40 min-h-[58px] flex-1 resize-none bg-transparent px-2 py-4 text-lg leading-7 text-[#191c1a] outline-none placeholder:text-[#879086] dark:text-[#f4f7ef] dark:placeholder:text-[#7f8e82] sm:px-3 sm:text-xl"
        />
        <button
          type="submit"
          disabled={disabled || message.trim().length === 0}
          title="Send message"
          aria-label="Send message"
          className="grid size-[60px] shrink-0 place-items-center rounded-lg bg-[#a7b1a3] text-white transition hover:bg-[#8d9a89] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] disabled:bg-[#a7b1a3] disabled:opacity-75 dark:bg-[#b8f0c3] dark:text-[#101412] dark:hover:bg-[#9ee9ad] dark:disabled:bg-[#4a5a4d] dark:disabled:text-[#9faf9b]"
        >
          <ArrowUp size={28} strokeWidth={1.9} />
        </button>
      </form>
    </div>
  )
}

export default ChatInput
