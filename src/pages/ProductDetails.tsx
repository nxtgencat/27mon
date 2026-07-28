import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Star, Truck, Shield, RotateCcw, Pencil, Trash2 } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useWishlist } from '../context/WishlistContext'
import Navbar from '../components/Navbar'
import ProductForm from '../components/ProductForm'
import ConfirmDelete from '../components/ConfirmDelete'
import Spinner from '../components/Spinner'
import type { ProductFormData } from '../types'

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { products, loading, editProduct, removeProduct } = useProducts()
  const { isInWishlist, toggleWishlist } = useWishlist()
  
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const product = products.find((p) => p.id === Number(id))

  if (loading) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans">
        <Navbar search="" onSearchChange={() => {}} />
        <Spinner />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans">
        <Navbar search="" onSearchChange={() => {}} />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 py-20 text-center">
          <span className="mini-tag block mb-2">ERROR 404</span>
          <p className="font-display font-semibold text-xl mb-3">Product Specimen Not Found</p>
          <Link to="/" className="btn-secondary px-5 py-2 text-xs inline-flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Catalog
          </Link>
        </div>
      </div>
    )
  }

  const liked = isInWishlist(product.id)
  const displayImages = product.images.length > 0 ? product.images : [product.thumbnail]

  function handleEdit(data: ProductFormData) {
    editProduct(product!.id, data)
    setEditing(false)
  }

  function handleDelete() {
    removeProduct(product!.id)
    setDeleting(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-paper dark:bg-inkdark text-ink dark:text-paperdark font-sans transition-colors duration-300">
      <Navbar search="" onSearchChange={() => {}} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
        {/* Navigation & Header Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-line dark:border-linedark">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate dark:text-slatedark hover:text-ink dark:hover:text-paperdark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to store
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditing(true)}
              type="button"
              className="btn-outline inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => setDeleting(true)}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-rose/40 text-rose text-xs font-medium hover:bg-rose/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        </div>

        {/* Responsive Product Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-xl overflow-hidden bg-surface dark:bg-surfacedark border border-line/60 dark:border-linedark/60 shadow-xs relative">
              <img
                src={displayImages[activeImgIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.discountPercentage > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber text-white text-xs font-mono font-bold shadow-xs">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {displayImages.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIndex(i)}
                    type="button"
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImgIndex === i
                        ? 'border-cobalt dark:border-cobalt-light scale-95 shadow-sm'
                        : 'border-line dark:border-linedark opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specimen Details & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="ticket-tag text-[10px]">
                  SKU-{product.id.toString().padStart(4, '0')}
                </span>
                <span className="mini-tag uppercase">
                  {product.category.replace('-', ' ')}
                </span>
              </div>

              <h1 className="font-display font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-tight mb-2 text-ink dark:text-paperdark">
                {product.title}
              </h1>

              {product.brand && (
                <p className="text-sm text-slate dark:text-slatedark mb-4 font-medium">
                  Brand: <span className="text-ink dark:text-paperdark">{product.brand}</span>
                </p>
              )}

              {/* Price & Rating Row */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-line dark:border-linedark">
                <span className="font-display font-bold text-3xl sm:text-4xl text-ink dark:text-paperdark">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="px-3 py-1 rounded-full bg-amber/15 text-amber text-xs font-semibold">
                    Save {Math.round(product.discountPercentage)}%
                  </span>
                )}
                <div className="ml-auto flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
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
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate dark:text-slatedark">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              {/* Stock Status & Description */}
              <div className="mb-6 space-y-4">
                <div>
                  {product.stock > 0 ? (
                    <span className="px-3 py-1.5 rounded-full bg-mint/15 text-mint text-xs font-medium inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-mint" />
                      In Stock — {product.stock} units available
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-rose/15 text-rose text-xs font-medium inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                      Currently Out of Stock
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate dark:text-slatedark leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Wishlist CTA */}
              <div className="mb-8">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  type="button"
                  className={`btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 text-sm ${
                    liked ? 'bg-rose hover:bg-rose/90' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
                  <span>{liked ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>

              {/* Shipping / Warranty Perks */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-surface dark:bg-surfacedark border border-line/60 dark:border-linedark/60 text-center shadow-xs">
                <div className="space-y-1">
                  <Truck className="w-5 h-5 mx-auto text-cobalt dark:text-cobalt-light" />
                  <p className="text-[11px] font-medium leading-tight">
                    {product.shippingInformation || 'Free shipping'}
                  </p>
                </div>
                <div className="space-y-1 border-x border-line dark:border-linedark px-2">
                  <Shield className="w-5 h-5 mx-auto text-mint" />
                  <p className="text-[11px] font-medium leading-tight">
                    {product.warrantyInformation || '1 year warranty'}
                  </p>
                </div>
                <div className="space-y-1">
                  <RotateCcw className="w-5 h-5 mx-auto text-amber" />
                  <p className="text-[11px] font-medium leading-tight">
                    {product.returnPolicy || '30 days return'}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Reviews Section */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-8 pt-8 border-t border-line dark:border-linedark">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display font-semibold text-lg">Customer Reviews</h2>
                  <span className="mini-tag">{product.reviews.length} REVIEWS</span>
                </div>
                <div className="space-y-3">
                  {product.reviews.slice(0, 3).map((review, i) => (
                    <div key={i} className="p-4 rounded-xl bg-surface dark:bg-surfacedark border border-line/40 dark:border-linedark/40">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-xs sm:text-sm font-semibold">{review.reviewerName}</p>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3 h-3 ${
                                j < review.rating ? 'fill-amber text-amber' : 'text-line dark:text-linedark'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-slate dark:text-slatedark leading-relaxed">
                        &ldquo;{review.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      {editing && (
        <ProductForm product={product} onSubmit={handleEdit} onClose={() => setEditing(false)} />
      )}

      {/* Delete Dialog */}
      {deleting && (
        <ConfirmDelete
          title={product.title}
          onConfirm={handleDelete}
          onCancel={() => setDeleting(false)}
        />
      )}
    </div>
  )
}
