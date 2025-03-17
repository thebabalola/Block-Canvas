"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { formatEther } from "ethers"
import { truncateString } from "../../utils"

const NFTCard = ({ metadata, mintPrice, tokenId, nextTokenId, mintNFT }) => {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-card-darker border border-custom hover:shadow-custom-lg transition-all hover:transform hover:scale-[1.02]">
      <div className="relative">
        <img
          src={metadata.image || "/placeholder.svg"}
          alt={`${metadata.name} image`}
          className="w-full h-64 object-cover"
        />
        {Number(nextTokenId) > tokenId && (
          <div className="absolute top-3 right-3 bg-primary-gradient text-[var(--text-primary)] text-xs font-bold px-2 py-1 rounded-full">
            Owned
          </div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <h2 className="font-bold text-lg text-[var(--text-primary)]">{metadata.name}</h2>
        <p className="text-sm text-[var(--text-secondary)]">{truncateString(metadata.description, 100)}</p>

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-1 text-[var(--text-secondary)]">
            <Icon icon="ri:file-list-3-line" className="w-5 h-5" />
            <span className="text-sm">{metadata.attributes.length} Attributes</span>
          </div>

          <div className="flex items-center gap-1 text-[#00d2ff] font-medium">
            <Icon icon="ri:eth-line" className="w-5 h-5" />
            <span>{`${formatEther(mintPrice)} ETH`}</span>
          </div>
        </div>

        <button
          disabled={Number(nextTokenId) !== tokenId}
          onClick={mintNFT}
          className={`w-full p-3 mt-2 text-[var(--text-primary)] font-bold rounded-md transition-all ${
            Number(nextTokenId) <= tokenId
              ? "bg-primary-gradient hover:opacity-90"
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

