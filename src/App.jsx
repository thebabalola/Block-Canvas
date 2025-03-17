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

  // const scrollToFooter = () => {
  //   const footer = document.querySelector("footer")
  //   if (footer) {
  //     footer.scrollIntoView({ behavior: "smooth" })
  //   }
  // }

  return (
    <div className="app-container">
      <Hero />
      <main className="flex-1 pt-24 p-4 max-w-7xl mx-auto w-full">
      <div className="text-center mt-1 mb-16"> 
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Explore NFTs</h1>
        <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto">
          Discover unique digital collectibles and the stories behind them
        </p>
      </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 mb-30">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <Palette className="feature-icon" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Mint NFT</h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Create your own digital masterpiece and make it available for collectors
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <LayoutGrid className="feature-icon" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Manage NFTs</h2>
            <p className="text-[var(--text-secondary)] mt-2">View and manage your collection of minted NFTs</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <ShoppingBag className="feature-icon" />
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">Marketplace</h2>
            <p className="text-[var(--text-secondary)] mt-2">
              Buy and sell NFTs on our secure and user-friendly marketplace
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-8">Featured Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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

