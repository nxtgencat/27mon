import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Search, X, Sun, Moon } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useTheme } from '../context/ThemeContext'

interface NavbarProps {
  search: string
  onSearchChange: (value: string) => void
}

export default function Navbar({ search, onSearchChange }: NavbarProps) {
  const { wishlist } = useWishlist()
  const { dark, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-50 bg-paper/85 dark:bg-inkdark/85 backdrop-blur-md border-b border-line dark:border-linedark">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="w-8 h-8 rounded-md bg-ink dark:bg-paperdark text-paper dark:text-inkdark grid place-content-center font-display font-semibold text-sm rotate-[-4deg] group-hover:rotate-0 transition-transform">
            <ShoppingBag className="w-4 h-4" />
          </span>
          <div className="flex flex-col">
            <h1 className="font-display font-bold tracking-tight text-base sm:text-lg leading-none">
              ELECTRONICS
            </h1>
          </div>
        </Link>

        {/* Desktop / Tablet Search */}
        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate dark:text-slatedark" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="field pl-9 pr-16 py-2 rounded-full text-xs sm:text-sm"
            />
            {search ? (
              <button
                onClick={() => onSearchChange('')}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink dark:hover:text-paperdark p-1"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="kbd absolute right-3 top-1/2 -translate-y-1/2 text-[10px] hidden md:inline-flex">
                ⌘K
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            type="button"
            aria-label="Toggle theme"
            className="btn-icon"
          >
            {dark ? <Sun className="w-4 h-4 text-amber-light" /> : <Moon className="w-4 h-4 text-slate" />}
          </button>

          <Link
            to="/wishlist"
            className="btn-icon relative"
            aria-label="View Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.size > 0 ? 'fill-rose text-rose' : ''}`} />
            {wishlist.size > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose text-white text-[10px] font-bold grid place-content-center shadow-xs">
                {wishlist.size}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
