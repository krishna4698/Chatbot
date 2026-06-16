import { FileClock, Gauge, PanelLeftClose, Plus, Wifi } from 'lucide-react'
import ChatInput from '../components/ChatInput'
import ChatWindow from '../components/ChatWindow'
import Navbar from '../components/Navbar'
import { getApiBaseUrl } from '../Services/chatService'
import { useChat } from '../hooks/useChat'

function ChatPage() {
  const {
    activeTopics,
    error,
    history,
    isLoadingHistory,
    isSending,
    messages,
    reloadHistory,
    resetConversation,
    sendQuestion,
    starterPrompts,
  } = useChat()

  return (
    <main className="min-h-svh app-grid">
      <Navbar onRefresh={reloadHistory} isRefreshing={isLoadingHistory} />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-0 px-0 md:px-4 lg:grid-cols-[244px_minmax(0,1fr)] xl:grid-cols-[244px_minmax(0,1fr)_292px]">
        <aside className="hidden border-x border-[#263229] bg-[#191c1a] text-[#f7f8f2] dark:border-[#314039] dark:bg-[#0b0f0d] lg:flex lg:min-h-[calc(100svh-64px)] lg:flex-col">
          <div className="border-b border-white/10 p-5">
            <p className="text-xs font-semibold uppercase text-[#b8f0c3]">
              Session board
            </p>
            <p className="mt-3 font-serif text-3xl leading-tight">
              Focused answers, saved history.
            </p>
          </div>

          <div className="space-y-3 p-5">
            <button
              type="button"
              onClick={resetConversation}
              className="flex w-full items-center justify-between rounded-md bg-[#f1593d] px-4 py-3 text-left text-sm font-semibold text-white transition hover:bg-[#dc442a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b8f0c3]"
            >
              <span>New thread</span>
              <Plus size={17} strokeWidth={2} />
            </button>

            <div className="rounded-md border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Wifi size={16} strokeWidth={1.8} className="text-[#b8f0c3]" />
                <span>API</span>
              </div>
              <p className="mt-2 break-all font-mono text-xs leading-5 text-white/62">
                {getApiBaseUrl()}
              </p>
            </div>
          </div>

          <div className="mt-auto border-t border-white/10 p-5">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-md border border-white/10 p-3">
                <p className="text-2xl font-semibold">{history.length}</p>
                <p className="mt-1 text-xs text-white/58">Saved</p>
              </div>
              <div className="rounded-md border border-white/10 p-3">
                <p className="text-2xl font-semibold">{messages.length}</p>
                <p className="mt-1 text-xs text-white/58">Messages</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="flex min-h-[calc(100svh-64px)] flex-col">
          <ChatWindow messages={messages} isSending={isSending} error={error} />
          <ChatInput
            disabled={isSending}
            suggestions={starterPrompts}
            onSubmit={(message) => void sendQuestion(message)}
          />
        </section>

        <aside className="hidden min-h-[calc(100svh-64px)] border-r border-[#d8dfd3] bg-[#eef6ea]/78 dark:border-[#2c382f] dark:bg-[#111815]/86 xl:flex xl:flex-col">
          <div className="border-b border-[#d1decc] p-5 dark:border-[#2c382f]">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[#191c1a] dark:text-[#f7f8f2]">
                Memory
              </h2>
              <Gauge
                size={18}
                strokeWidth={1.8}
                className="text-[#2b6a44] dark:text-[#b8f0c3]"
              />
            </div>
            <p className="mt-2 text-sm leading-6 text-[#5d685c] dark:text-[#9ca99a]">
              Recent questions stay close so the next one has context.
            </p>
          </div>

          <div className="space-y-3 p-5">
            {activeTopics.map((topic, index) => (
              <button
                key={`${topic}-${index.toString()}`}
                type="button"
                onClick={() => void sendQuestion(topic)}
                className="w-full rounded-md border border-[#c6d4c1] bg-white/70 p-3 text-left text-sm leading-5 text-[#283229] transition hover:border-[#f1593d] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] dark:border-[#334137] dark:bg-white/7 dark:text-[#e0eadc] dark:hover:border-[#f1593d] dark:hover:bg-[#201a16]"
              >
                {topic}
              </button>
            ))}
          </div>

          <div className="mt-auto border-t border-[#d1decc] p-5 dark:border-[#2c382f]">
            <div className="rounded-md border border-[#c6d4c1] bg-[#fbfcf7] p-4 dark:border-[#334137] dark:bg-[#151c18]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#283229] dark:text-[#eef5eb]">
                <FileClock size={16} strokeWidth={1.8} />
                <span>Last save</span>
              </div>
              <p className="mt-2 text-sm text-[#667164] dark:text-[#9ca99a]">
                {history[0]?.createdAt
                  ? new Date(history[0].createdAt).toLocaleString()
                  : 'No conversations yet'}
              </p>
            </div>
          </div>
        </aside>
      </div>

      <button
        type="button"
        onClick={resetConversation}
        title="New thread"
        aria-label="New thread"
        className="fixed bottom-5 right-5 grid size-12 place-items-center rounded-md bg-[#f1593d] text-white shadow-[0_14px_30px_rgba(241,89,61,0.35)] transition hover:bg-[#dc442a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191c1a] lg:hidden"
      >
        <PanelLeftClose size={20} strokeWidth={1.9} />
      </button>
    </main>
  )
}

export default ChatPage
