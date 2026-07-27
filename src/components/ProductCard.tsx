import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import type { Product } from '../types'
import { useWishlist } from '../context/WishlistContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const liked = isInWishlist(product.id)

  return (
    <div className="card group relative">
      <button
        onClick={(e) => { e.preventDefault(); toggleWishlist(product.id) }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-surface/80 dark:bg-surfacedark/80 backdrop-blur-sm grid place-content-center hover:scale-110 transition-transform"
      >
        <Heart
          className={`w-4 h-4 ${liked ? 'fill-rose text-rose' : 'text-slate'}`}
        />
      </button>

      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square rounded-lg overflow-hidden bg-ink/5 dark:bg-white/5 mb-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>

        <p className="mini-tag mb-1">{product.brand || product.category}</p>
        <h3 className="font-display font-semibold text-sm truncate">{product.title}</h3>

        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-sm">${product.price.toFixed(2)}</span>
          <div className="flex items-center gap-1">
            <svg className="w-3 h-3 text-amber fill-amber" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs text-slate dark:text-slatedark">
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {product.stock > 0 ? (
            <span className="px-2 py-0.5 rounded-full bg-mint/15 text-mint text-[10px] font-medium">
              In stock ({product.stock})
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full bg-rose/15 text-rose text-[10px] font-medium">
              Out of stock
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-amber/15 text-amber text-[10px] font-medium">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>
      </Link>
    </div>
  )
}
