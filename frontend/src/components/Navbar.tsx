import {
  BrainCircuit,
  History,
  MessageSquareText,
  Moon,
  RotateCw,
  Sun,
} from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

type NavbarProps = {
  onRefresh?: () => void
  isRefreshing?: boolean
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition',
    isActive
      ? 'border-[#191c1a] bg-[#191c1a] text-[#f7f8f2] dark:border-[#b8f0c3] dark:bg-[#b8f0c3] dark:text-[#101412]'
      : 'border-transparent text-[#4c554d] hover:border-[#b7c4b3] hover:bg-white/70 hover:text-[#191c1a] dark:text-[#c4cec1] dark:hover:border-[#3a483d] dark:hover:bg-white/8 dark:hover:text-[#f7f8f2]',
  ].join(' ')

function Navbar({ onRefresh, isRefreshing = false }: NavbarProps) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-[#cbd6c7]/80 bg-[#eef2eb]/85 backdrop-blur-xl dark:border-[#2a362e] dark:bg-[#101412]/86">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-[#191c1a] text-[#b8f0c3] shadow-[6px_6px_0_#f1593d] dark:bg-[#b8f0c3] dark:text-[#101412]">
            <BrainCircuit size={22} strokeWidth={1.8} />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl text-[#191c1a] dark:text-[#f7f8f2]">
              Chatbot
            </span>
            <span className="hidden text-xs font-medium text-[#6b746b] dark:text-[#94a391] sm:block">
              Gemini conversation desk
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={navLinkClass} end>
            <MessageSquareText size={17} strokeWidth={1.8} />
            <span className="hidden sm:inline">Chat</span>
          </NavLink>
          <NavLink to="/history" className={navLinkClass}>
            <History size={17} strokeWidth={1.8} />
            <span className="hidden sm:inline">History</span>
          </NavLink>
          {onRefresh ? (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh"
              aria-label="Refresh"
              className="grid size-10 place-items-center rounded-md border border-[#b7c4b3] bg-white/70 text-[#354238] transition hover:border-[#191c1a] hover:text-[#191c1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] disabled:opacity-50 dark:border-[#3a483d] dark:bg-white/7 dark:text-[#dfe8da] dark:hover:border-[#b8f0c3] dark:hover:text-[#b8f0c3]"
            >
              <RotateCw
                size={17}
                strokeWidth={1.9}
                className={isRefreshing ? 'animate-spin' : ''}
              />
            </button>
          ) : null}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Light mode' : 'Dark mode'}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid size-10 place-items-center rounded-md border border-[#b7c4b3] bg-white/70 text-[#354238] transition hover:border-[#191c1a] hover:text-[#191c1a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f1593d] dark:border-[#3a483d] dark:bg-white/7 dark:text-[#dfe8da] dark:hover:border-[#b8f0c3] dark:hover:text-[#b8f0c3]"
          >
            {isDark ? (
              <Sun size={17} strokeWidth={1.9} />
            ) : (
              <Moon size={17} strokeWidth={1.9} />
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
