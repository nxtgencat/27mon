import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { ProductProvider } from './context/ProductContext'
import { WishlistProvider } from './context/WishlistContext'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import Wishlist from './pages/Wishlist'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ProductProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
            </Routes>
          </WishlistProvider>
        </ProductProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
