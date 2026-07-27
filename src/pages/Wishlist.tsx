import { Link } from 'react-router-dom'
import { Heart, ArrowLeft } from 'lucide-react'
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
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
      <Navbar search="" onSearchChange={() => {}} />
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-5 h-5 text-rose" />
          <h1 className="font-display font-semibold text-2xl tracking-tight">
            Your Wishlist
          </h1>
          <span className="text-sm text-slate dark:text-slatedark">
            ({wishlist.size} item{wishlist.size !== 1 ? 's' : ''})
          </span>
        </div>

        {loading ? (
          <Spinner />
        ) : wishlistProducts.length === 0 ? (
          <div className="p-12 rounded-xl border border-dashed border-line dark:border-linedark text-center max-w-md mx-auto">
            <div className="w-10 h-10 rounded-full bg-ink/5 dark:bg-white/5 grid place-content-center mx-auto mb-3">
              <Heart className="w-4 h-4 text-slate dark:text-slatedark" />
            </div>
            <p className="text-sm font-medium">Your wishlist is empty</p>
            <p className="text-xs text-slate dark:text-slatedark mt-1 mb-4">
              Start adding items you love!
            </p>
            <Link to="/" className="btn-secondary px-4 py-1.5 text-xs">
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
