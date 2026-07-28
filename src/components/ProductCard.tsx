import { Link } from 'react-router-dom'
import { Heart, Pencil, Trash2, Star } from 'lucide-react'
import type { Product } from '../types'
import { useWishlist } from '../context/WishlistContext'

interface ProductCardProps {
  product: Product
  onEdit?: (p: Product) => void
  onDelete?: (p: Product) => void
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist()
  const liked = isInWishlist(product.id)

  return (
    <div className="card p-4 sm:p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative border border-line/40 dark:border-linedark/40 flex flex-col justify-between">
      {/* Quick Action Overlay Buttons */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5">
        {onEdit && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(product) }}
            type="button"
            title="Edit product"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass shadow-xs grid place-content-center hover:scale-110 active:scale-95 transition-transform opacity-100 sm:opacity-0 group-hover:opacity-100 text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        )}
        {onDelete && (
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(product) }}
            type="button"
            title="Delete product"
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass shadow-xs grid place-content-center hover:scale-110 active:scale-95 transition-transform text-rose opacity-100 sm:opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(product.id) }}
          type="button"
          title={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full glass shadow-xs grid place-content-center hover:scale-110 active:scale-95 transition-transform"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${liked ? 'fill-rose text-rose' : 'text-slate dark:text-slatedark'}`} />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="block flex-1 flex flex-col">
        <div className="aspect-square rounded-lg overflow-hidden bg-ink/5 dark:bg-white/5 mb-3.5 relative">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-amber text-white text-[10px] font-mono font-semibold tracking-wider shadow-xs">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span className="mini-tag block mb-1 uppercase truncate">
              {product.brand || product.category.replace('-', ' ')}
            </span>
            <h3 className="font-display font-semibold text-xs sm:text-sm text-ink dark:text-paperdark line-clamp-2 leading-snug">
              {product.title}
            </h3>
          </div>

          <div className="mt-3 pt-3 border-t border-line/50 dark:border-linedark/50">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-display font-bold text-sm sm:text-base text-ink dark:text-paperdark">
                ${product.price.toFixed(2)}
              </span>
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber text-amber shrink-0" />
                <span className="font-mono text-xs text-slate dark:text-slatedark font-medium">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-medium">
              {product.stock > 0 ? (
                <span className="px-2 py-0.5 rounded-full bg-mint/15 text-mint">
                  In stock ({product.stock})
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-rose/15 text-rose">
                  Out of stock
                </span>
              )}
              <span className="font-mono text-slate/70 dark:text-slatedark/70 text-[9px]">
                SKU-{product.id.toString().padStart(4, '0')}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
