"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { formatEther } from "ethers"
import { truncateString } from "../../utils"

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
  return (
    <div className="w-full max-w-[270px] overflow-hidden rounded-2xl bg-card-darker border border-custom shadow-lg transition-all duration-300 hover:scale-105 hover:border-primary-glow hover:shadow-primary-glow">
      {/* Image Section */}
      <div className="relative">
        <img
          src={metadata.image || "/placeholder.svg"}
          alt={`${metadata.name} image`}
          className="w-full h-55 object-cover rounded-t-2xl"
        />
        {Number(nextTokenId) > tokenId && (
          <div className="absolute top-3 right-3 bg-primary-gradient text-[var(--text-primary)] text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Owned
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 space-y-4">
      <h3 className="font-extrabold text-l text-[var(--text-primary)]">{metadata.name}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-3 cursor-pointer">
          {truncateString(metadata.description, 120)}
        </p>

        {/* Attributes & Price */}
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2 text-[var(--text-secondary)]">
            <Icon icon="ri:file-list-3-line" className="w-5 h-5 text-[var(--text-primary)]" />
            <span className="text-sm font-medium">{metadata.attributes.length} Attributes</span>
          </div>

          <div className="flex items-center gap-2 text-[#00d2ff] font-semibold">
            <Icon icon="ri:eth-line" className="w-5 h-5" />
            <span>{`${formatEther(mintPrice)} ETH`}</span>
          </div>
        </div>

        {/* Mint Button */}
        <button
          disabled={Number(nextTokenId) !== tokenId}
          onClick={mintNFT}
          className={`w-full p-3 mt-3 text-[var(--text-primary)] font-bold rounded-lg transition-all duration-300 ${
            Number(nextTokenId) <= tokenId
              ? "bg-primary-gradient hover:opacity-90 shadow-lg hover:shadow-xl"
              : "bg-card opacity-70 cursor-not-allowed"
          }`}
        >
          {Number(nextTokenId) <= tokenId ? "Mint NFT" : "Owned"}
        </button>
      </div>
    </div>
  )
}

export default NFTCard
