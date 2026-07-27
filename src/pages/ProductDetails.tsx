import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Heart, Star, Truck, Shield, RotateCcw } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useWishlist } from '../context/WishlistContext'
import Navbar from '../components/Navbar'
import Spinner from '../components/Spinner'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const { products, loading } = useProducts()
  const { isInWishlist, toggleWishlist } = useWishlist()

  const product = products.find((p) => p.id === Number(id))

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
        <Navbar search="" onSearchChange={() => {}} />
        <Spinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
        <Navbar search="" onSearchChange={() => {}} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <p className="text-lg font-medium mb-2">Product not found</p>
          <Link to="/" className="text-sm text-cobalt hover:underline">Back to store</Link>
        </div>
      </div>
    )
  }

  const liked = isInWishlist(product.id)

  return (
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark">
      <Navbar search="" onSearchChange={() => {}} />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to store
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-ink/5 dark:bg-white/5 mb-4">
              <img
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-ink/5 dark:bg-white/5"
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="mini-tag mb-2 capitalize">{product.category.replace('-', ' ')}</p>
            <h1 className="font-display font-semibold text-2xl sm:text-3xl tracking-tight mb-2">
              {product.title}
            </h1>
            {product.brand && (
              <p className="text-sm text-slate dark:text-slatedark mb-4">{product.brand}</p>
            )}

            <div className="flex items-center gap-4 mb-6">
              <span className="font-display font-semibold text-3xl">
                ${product.price.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="px-2.5 py-1 rounded-full bg-amber/15 text-amber text-xs font-medium">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(product.rating)
                      ? 'fill-amber text-amber'
                      : 'text-line dark:text-linedark'
                  }`}
                />
              ))}
              <span className="text-sm text-slate dark:text-slatedark ml-2">
                {product.rating.toFixed(1)} ({product.reviews.length} reviews)
              </span>
            </div>

            <p className="text-sm text-slate dark:text-slatedark leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex items-center gap-3 mb-8">
              {product.stock > 0 ? (
                <span className="px-3 py-1.5 rounded-full bg-mint/15 text-mint text-xs font-medium">
                  In Stock — {product.stock} units
                </span>
              ) : (
                <span className="px-3 py-1.5 rounded-full bg-rose/15 text-rose text-xs font-medium">
                  Out of Stock
                </span>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`btn-primary inline-flex items-center gap-2 ${
                liked ? 'bg-rose hover:bg-rose/90' : ''
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
              {liked ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-line dark:border-linedark">
              <div className="text-center">
                <Truck className="w-5 h-5 mx-auto mb-1.5 text-slate dark:text-slatedark" />
                <p className="text-xs font-medium">{product.shippingInformation || 'Free shipping'}</p>
              </div>
              <div className="text-center">
                <Shield className="w-5 h-5 mx-auto mb-1.5 text-slate dark:text-slatedark" />
                <p className="text-xs font-medium">{product.warrantyInformation || '1 year warranty'}</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-5 h-5 mx-auto mb-1.5 text-slate dark:text-slatedark" />
                <p className="text-xs font-medium">{product.returnPolicy || '30 days return'}</p>
              </div>
            </div>

            {product.reviews.length > 0 && (
              <div className="mt-8 pt-8 border-t border-line dark:border-linedark">
                <h2 className="font-display font-semibold text-lg mb-4">Reviews</h2>
                <div className="space-y-4">
                  {product.reviews.slice(0, 3).map((review, i) => (
                    <div key={i} className="p-4 rounded-lg bg-surface dark:bg-surfacedark">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">{review.reviewerName}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3 h-3 ${
                                j < review.rating
                                  ? 'fill-amber text-amber'
                                  : 'text-line dark:text-linedark'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate dark:text-slatedark">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
