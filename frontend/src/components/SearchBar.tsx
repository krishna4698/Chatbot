import { Search, X } from 'lucide-react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function SearchBar({
  value,
  onChange,
  placeholder = 'Search history',
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        aria-hidden="true"
        size={18}
        strokeWidth={1.8}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6b746b]"
      />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-[#becbb9] bg-white/80 pl-10 pr-11 text-sm text-[#191c1a] outline-none transition placeholder:text-[#778276] focus:border-[#191c1a] focus:bg-white focus:ring-2 focus:ring-[#f1593d]/30 dark:border-[#334137] dark:bg-[#111815] dark:text-[#f4f7ef] dark:placeholder:text-[#7f8e82] dark:focus:border-[#b8f0c3] dark:focus:bg-[#0d1210]"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          title="Clear"
          aria-label="Clear search"
          className="absolute right-2 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-[#667164] transition hover:bg-[#eef2eb] hover:text-[#191c1a] dark:text-[#9ca99a] dark:hover:bg-white/8 dark:hover:text-[#f7f8f2]"
        >
          <X size={16} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  )
}

export default SearchBar
