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
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-8 h-8 rounded-md bg-ink dark:bg-paperdark text-paper dark:text-inkdark grid place-content-center font-display font-semibold text-sm rotate-[-4deg]">
            <ShoppingBag className="w-4 h-4" />
          </span>
          <span className="font-display font-semibold tracking-tight hidden sm:block">
            Electronix
          </span>
        </Link>

        <div className="hidden sm:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate dark:text-slatedark" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 rounded-full bg-surface dark:bg-surfacedark border border-line dark:border-linedark text-sm placeholder:text-slate/60 focus:border-cobalt focus:shadow-glow outline-none transition-all"
            />
            {search && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-ink dark:hover:text-paperdark"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-line dark:border-linedark grid place-content-center hover:border-ink dark:hover:border-paperdark transition-colors"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Link
            to="/wishlist"
            className="relative w-9 h-9 rounded-full border border-line dark:border-linedark grid place-content-center hover:border-ink dark:hover:border-paperdark transition-colors"
          >
            <Heart className="w-4 h-4" />
            {wishlist.size > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose text-white text-[10px] font-medium grid place-content-center">
                {wishlist.size}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}
