import Footer from "./components/Footer"
import { useAppContext } from "./contexts/appContext"
import NFTCard from "./components/NFTCard"
import useMintToken from "./hooks/useMintToken"
import Hero from "./components/Hero"
import { Palette, LayoutGrid, ShoppingBag } from "lucide-react"

function App() {
  const { nextTokenId, tokenMetaData, mintPrice } = useAppContext()

  console.log("nextTokenId: ", nextTokenId)

  const tokenMetaDataArray = Array.from(tokenMetaData.values())
  const mintToken = useMintToken()

  return (
    <div className="app-container">
      <Hero />
      <main className="flex-1 pt-24 p-4 max-w-7xl mx-auto w-full">
      <section className="relative bg-[var(--bg-card-darker)] p-12 rounded-2xl shadow-custom-lg">
          {/* Section Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[var(--text-primary)]">Explore NFTs</h1>
            <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
              Discover unique digital collectibles and the stories behind them
            </p>
          </div>

          {/* NFT Feature Cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">
            <div className="feature-card group hover:scale-105 transition-transform duration-300">
              <div className="feature-icon-wrapper group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <Palette className="feature-icon" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Mint NFT</h2>
              <p className="text-[var(--text-secondary)] mt-2">
                Create your own digital masterpiece and make it available for collectors
              </p>
            </div>
            <div className="feature-card group hover:scale-105 transition-transform duration-300">
              <div className="feature-icon-wrapper group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <LayoutGrid className="feature-icon" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Manage NFTs</h2>
              <p className="text-[var(--text-secondary)] mt-2">View and manage your collection of minted NFTs</p>
            </div>
            <div className="feature-card group hover:scale-105 transition-transform duration-300">
              <div className="feature-icon-wrapper group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                <ShoppingBag className="feature-icon" />
              </div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">Marketplace</h2>
              <p className="text-[var(--text-secondary)] mt-2">
                Buy and sell NFTs on our secure and user-friendly marketplace
              </p>
            </div>
          </div>

          {/* Decorative Background Element */}
          <div className="absolute inset-0 bg-[var(--primary-gradient)] opacity-10 blur-3xl rounded-full"></div>
        </section>


        <h2 className="text-3xl font-bold text-[var(--text-primary)] mt-12 mb-8">Featured Collection</h2>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {tokenMetaDataArray.map((token, i) => (
            <NFTCard
              key={token.name.split(" ").join("")}
              metadata={token}
              mintPrice={mintPrice}
              tokenId={i}
              nextTokenId={nextTokenId}
              mintNFT={mintToken}
            />
          ))}
        </div>

      </main>
      <Footer />
    </div>
  )
}

export default App

