"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "../../contexts/appContext"
import { useAccount, useWalletClient } from "wagmi"
import NFTCard from "../NFTCard/index"
import { ethers } from "ethers"

const Account = () => {
  const { userNFTs, tokenMetaData = new Map(), mintPrice, nextTokenId, transferNFT } = useAppContext()
  const { address: userAddress, isConnected } = useAccount()
  const { data: walletClient } = useWalletClient()
  const [recipientMap, setRecipientMap] = useState({})
  const [transactionLog, setTransactionLog] = useState([])

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactionLog")) || []
    setTransactionLog(storedTransactions)
  }, [])

  useEffect(() => {
    localStorage.setItem("transactionLog", JSON.stringify(transactionLog))
  }, [transactionLog])

  const handleInputChange = (tokenId, value) => {
    setRecipientMap((prev) => ({
      ...prev,
      [tokenId]: value,
    }))
  }

  const handleTransfer = async (tokenId) => {
    const recipient = recipientMap[tokenId]
    if (!recipient) {
      console.error("Please enter a recipient address.")
      return
    }

    if (!walletClient) {
      console.error("No wallet client available. Please connect your wallet.")
      return
    }

    const timestamp = new Date().toLocaleString()
    try {
      const provider = new ethers.BrowserProvider(walletClient)
      const signer = await provider.getSigner()
      await transferNFT(tokenId, recipient, signer)

      setTransactionLog((prev) => [
        ...prev,
        { tokenId, from: userAddress, to: recipient, status: "Success", timestamp },
      ])

      setRecipientMap((prev) => ({
        ...prev,
        [tokenId]: "",
      }))
    } catch (error) {
      console.error("Transfer failed:", error)
      setTransactionLog((prev) => [...prev, { tokenId, from: userAddress, to: recipient, status: "Failed", timestamp }])
    }
  }

  return (
    <div className="max-w-7xl mx-auto pt-12">
      {/* User Profile Header */}
      <div className="bg-secondary-gradient rounded-xl p-8 mb-8 shadow-lg flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">My NFT Collection</h1>
          {isConnected ? (
            <>
              <p className="text-[var(--text-secondary)]">
                Connected Wallet: <span className="font-mono">{userAddress}</span>
              </p>
              <p className="font-medium mt-2 text-[var(--text-primary)]">
                You own <span className="text-[#00d2ff] font-bold">{userNFTs.length}</span> NFT(s)
              </p>
            </>
          ) : (
            <p className="text-red-500 font-medium">Please connect your wallet to view your collection.</p>
          )}
        </div>
        {/* Profile Icon Placeholder */}
        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-white text-lg font-bold">
          🚀
        </div>
      </div>

      {isConnected && (
        <div className="flex flex-wrap gap-6 mt-8">
          {userNFTs.length > 0 ? (
            userNFTs.map((tokenId) => {
              const metadata = tokenMetaData.get(tokenId)
              if (!metadata) return null

              return (
                <div key={tokenId} className="flex flex-col items-center p-4 rounded-lg shadow-md bg-card hover:shadow-lg transition-shadow">
                  {/* NFT Card */}
                  <NFTCard metadata={metadata} mintPrice={mintPrice} tokenId={tokenId} nextTokenId={nextTokenId} />

                  {/* Transfer NFT section */}
                  <div className="flex items-center justify-center w-full mt-3">
                    <input
                      type="text"
                      placeholder="Recipient Address"
                      value={recipientMap[tokenId] || ""}
                      onChange={(e) => handleInputChange(tokenId, e.target.value)}
                      className="p-2 border border-custom rounded-md w-[60%] bg-card text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#00d2ff] text-sm"
                    />
                    <button
                      className="bg-primary-gradient text-[var(--text-primary)] px-3 py-2 rounded-md hover:opacity-90 transition-opacity text-xs ml-2"
                      onClick={() => handleTransfer(tokenId)}
                    >
                      Transfer NFT
                    </button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-full text-center py-12 bg-card-darker rounded-xl border border-custom">
              <p className="text-[var(--text-secondary)] text-lg">No NFTs found in your collection.</p>
              <p className="text-[var(--text-secondary)] mt-2">Mint some NFTs to get started!</p>
            </div>
          )}
        </div>
      )}

      {/* Transaction History */}
      {transactionLog.length > 0 && (
        <div className="mt-12 bg-card-darker p-6 rounded-lg shadow-md border border-custom">
          <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">Transaction History</h2>
          <ul className="space-y-3 text-sm">
            {transactionLog.map((tx, index) => (
              <li
                key={index}
                className={`p-3 rounded-md ${
                  tx.status === "Success" ? "bg-secondary-gradient text-white" : "bg-red-700 text-white"
                }`}
              >
                <strong>Token ID:</strong> {tx.tokenId} | <strong>From:</strong> {tx.from} → <strong>To:</strong>{" "}
                {tx.to} | <strong>Status:</strong> {tx.status} | <strong>Time:</strong> {tx.timestamp}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Account
