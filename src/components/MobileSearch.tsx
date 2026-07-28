import { Search, X } from 'lucide-react'

interface MobileSearchProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function MobileSearch({ search, onSearchChange }: MobileSearchProps) {
  return (
    <div className="sm:hidden px-4 pt-3 pb-2">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate dark:text-slatedark" />
        <input
          type="text"
          placeholder="Search catalog..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="field pl-9 pr-9 py-2.5 rounded-full text-xs"
        />
        {search && (
          <button
            onClick={() => onSearchChange('')}
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink dark:hover:text-paperdark p-1"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}
