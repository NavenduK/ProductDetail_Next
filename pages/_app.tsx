import CartProvider from '../components/cartProvider'
import Footer from '../components/footer'
import Header from '../components/nav'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <html>
      <body>
      <CartProvider>
          <div className="container">
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}

export default MyApp
