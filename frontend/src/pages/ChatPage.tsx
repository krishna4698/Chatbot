import { Plus } from 'lucide-react'
import ChatInput from '../components/ChatInput'
import ChatWindow from '../components/ChatWindow'
import Navbar from '../components/Navbar'
import { useChat } from '../hooks/useChat'

function ChatPage() {
  const {
    error,
    isLoadingHistory,
    isSending,
    messages,
    reloadHistory,
    resetConversation,
    sendQuestion,
  } = useChat()

  return (
    <main className="min-h-svh app-grid">
      <Navbar onRefresh={reloadHistory} isRefreshing={isLoadingHistory} />

      <div className="mx-auto flex h-[calc(100svh-64px)] w-full max-w-7xl flex-col overflow-hidden px-0 md:px-4">
        <div className="flex h-14 shrink-0 items-center justify-start px-3 sm:px-0">
          <button
            type="button"
            onClick={resetConversation}
            className="inline-flex h-10 items-center gap-2 rounded-md border border-[#cbd8c7] bg-white/80 px-4 text-sm font-semibold text-[#1d241f] shadow-sm transition hover:border-[#191c1a] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] dark:border-[#334137] dark:bg-[#151c18] dark:text-[#f7f8f2] dark:hover:border-[#b8f0c3]"
          >
            <Plus size={17} strokeWidth={2} />
            <span>New thread</span>
          </button>
        </div>

        <section className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-t-lg border-x border-[#d8dfd3] bg-[#f8faf4]/70 shadow-[0_24px_70px_rgba(31,39,33,0.12)] dark:border-[#2c382f] dark:bg-[#121916]/88 dark:shadow-none">
          <ChatWindow messages={messages} isSending={isSending} error={error} />
          <ChatInput
            disabled={isSending}
            onSubmit={(message) => void sendQuestion(message)}
          />
        </section>
      </div>
    </main>
  )
}

export default ChatPage
