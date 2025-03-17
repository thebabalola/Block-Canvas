"use client"
import { Link } from "react-router-dom"

const Hero = () => {
  const scrollToFooter = () => {
    const footer = document.querySelector("footer")
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="hero-banner">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover, Collect, and Sell <span className="text-[#00d2ff]">Extraordinary NFTs</span>
        </h1>
        <p className="hero-subtitle">
          BlockCanvas is the world's first and largest NFT marketplace where you can buy, sell, and discover exclusive
          digital items.
        </p>
        <div className="hero-buttons">
          <Link to="/account" className="hero-button-primary">
            My Collection
          </Link>
          <button onClick={scrollToFooter} className="hero-button-secondary">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero

