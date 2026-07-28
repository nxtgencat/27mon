import { Link } from 'react-router-dom'
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useWishlist } from '../context/WishlistContext'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Spinner from '../components/Spinner'

export default function Wishlist() {
  const { products, loading } = useProducts()
  const { wishlist } = useWishlist()

  const wishlistProducts = products.filter((p) => wishlist.has(p.id))

  return (
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans transition-colors duration-300">
      <Navbar search="" onSearchChange={() => {}} />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store catalog
        </Link>

        {/* Page Title Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-line dark:border-linedark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose/15 text-rose grid place-content-center">
              <Heart className="w-5 h-5 fill-rose" />
            </div>
            <div>
              <span className="ticket-tag mb-0.5">SAVED ITEMS</span>
              <h1 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight">
                Your Wishlist
              </h1>
            </div>
          </div>
          <span className="font-mono text-xs text-slate dark:text-slatedark font-semibold">
            {wishlist.size} item{wishlist.size !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Wishlist Content */}
        {loading ? (
          <Spinner />
        ) : wishlistProducts.length === 0 ? (
          <div className="p-10 sm:p-14 rounded-xl border border-dashed border-line dark:border-linedark text-center max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-rose/10 text-rose grid place-content-center mx-auto mb-3">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-semibold text-base sm:text-lg mb-1">Your wishlist is empty</h3>
            <p className="text-xs sm:text-sm text-slate dark:text-slatedark mb-6 leading-relaxed">
              Click the heart icon on any product card to save items for later viewing.
            </p>
            <Link to="/" className="btn-secondary px-5 py-2.5 text-xs inline-flex items-center gap-2">
              <ShoppingBag className="w-3.5 h-3.5" /> Browse Store Catalog
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
