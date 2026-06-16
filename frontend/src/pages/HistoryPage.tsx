import { CalendarClock, MessageCircle, RefreshCw } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import {
  fetchConversations,
  type Conversation,
} from '../Services/chatService'

const formatDate = (timestamp?: string) => {
  if (!timestamp) {
    return 'Unknown time'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function HistoryPage() {
  const [history, setHistory] = useState<Conversation[]>([])
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadHistory = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const conversations = await fetchConversations()
      setHistory(conversations)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Could not load history',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadHistory()
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [loadHistory])

  const filteredHistory = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return history
    }

    return history.filter((conversation) =>
      [conversation.question, conversation.answer].some((value) =>
        value.toLowerCase().includes(normalizedQuery),
      ),
    )
  }, [history, query])

  return (
    <main className="min-h-svh app-grid">
      <Navbar onRefresh={() => void loadHistory()} isRefreshing={isLoading} />

      <section className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:py-10">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="border border-[#d5dfd0] bg-[#fbfcf7]/90 paper-noise dark:border-[#2c382f]">
            <div className="border-b border-[#d5dfd0] p-5 dark:border-[#2c382f] md:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase text-[#2b6a44] dark:text-[#b8f0c3]">
                    Archive
                  </p>
                  <h1 className="mt-2 font-serif text-3xl text-[#191c1a] dark:text-[#f7f8f2] md:text-4xl">
                    Conversation history
                  </h1>
                </div>
                <div className="w-full md:w-80">
                  <SearchBar value={query} onChange={setQuery} />
                </div>
              </div>
            </div>

            {error ? (
              <div className="m-5 rounded-md border border-[#f1593d]/45 bg-[#fff1ea] p-4 text-sm text-[#6a2a1b] dark:bg-[#281914] dark:text-[#ffc7b7] md:m-6">
                {error}
              </div>
            ) : null}

            <div className="divide-y divide-[#dfe7db] dark:divide-[#2c382f]">
              {isLoading ? (
                <div className="flex items-center gap-3 p-6 text-sm font-medium text-[#566257] dark:text-[#a5b4a2]">
                  <RefreshCw size={17} strokeWidth={1.8} className="animate-spin" />
                  <span>Loading history</span>
                </div>
              ) : null}

              {!isLoading && filteredHistory.length === 0 ? (
                <div className="p-6 text-sm text-[#687266] dark:text-[#a5b4a2]">
                  No conversations match this search.
                </div>
              ) : null}

              {filteredHistory.map((conversation) => (
                <article
                  key={conversation._id}
                  className="grid gap-3 p-5 transition hover:bg-white/65 dark:hover:bg-white/5 md:grid-cols-[160px_minmax(0,1fr)] md:p-6"
                >
                  <div className="flex items-center gap-2 text-sm font-medium text-[#627063] dark:text-[#9aa899]">
                    <CalendarClock size={16} strokeWidth={1.8} />
                    <span>{formatDate(conversation.createdAt)}</span>
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-[#191c1a] dark:text-[#f7f8f2]">
                      {conversation.question}
                    </h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#5b665c] dark:text-[#b2beb0]">
                      {conversation.answer}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-[#263229] bg-[#191c1a] p-5 text-[#f7f8f2] dark:border-[#314039] dark:bg-[#0b0f0d]">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-md bg-[#b8f0c3] text-[#17351e]">
                <MessageCircle size={20} strokeWidth={1.8} />
              </span>
              <div>
                <p className="text-3xl font-semibold">{history.length}</p>
                <p className="text-xs uppercase text-white/55">Total saved</p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-6 text-white/68">
              Every backend response is stored here by MongoDB and pulled back
              through the chat history endpoint.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default HistoryPage
