import { createContext, useContext, useState, type ReactNode } from 'react'

interface WishlistContextValue {
  wishlist: Set<number>
  addToWishlist: (id: number) => void
  removeFromWishlist: (id: number) => void
  toggleWishlist: (id: number) => void
  isInWishlist: (id: number) => boolean
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<number>>(new Set())

  function addToWishlist(id: number) {
    setWishlist((prev) => new Set(prev).add(id))
  }

  function removeFromWishlist(id: number) {
    setWishlist((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  function toggleWishlist(id: number) {
    if (wishlist.has(id)) removeFromWishlist(id)
    else addToWishlist(id)
  }

  function isInWishlist(id: number) {
    return wishlist.has(id)
  }

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
