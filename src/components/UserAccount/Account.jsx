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
    // Load stored transactions from local storage (if any)
    const storedTransactions = JSON.parse(localStorage.getItem("transactionLog")) || []
    setTransactionLog(storedTransactions)
  }, [])

  useEffect(() => {
    // Save transactions to local storage whenever it updates
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

      // Add successful transaction to log
      setTransactionLog((prev) => [
        ...prev,
        { tokenId, from: userAddress, to: recipient, status: "Success", timestamp },
      ])

      // Clear input field
      setRecipientMap((prev) => ({
        ...prev,
        [tokenId]: "",
      }))
    } catch (error) {
      console.error("Transfer failed:", error)

      // Log failed transaction
      setTransactionLog((prev) => [...prev, { tokenId, from: userAddress, to: recipient, status: "Failed", timestamp }])
    }
  }

  return (
    <div className="max-w-7xl mx-auto pt-24">
      <div className="bg-secondary-gradient rounded-xl p-8 mb-8 shadow-custom">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">My NFT Collection</h1>
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

      {isConnected && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {userNFTs.length > 0 ? (
              userNFTs.map((tokenId) => {
                const metadata = tokenMetaData.get(tokenId)
                if (!metadata) return null

                return (
                  <div key={tokenId} className="border border-custom p-4 rounded-xl bg-card-darker shadow-custom">
                    <NFTCard metadata={metadata} mintPrice={mintPrice} tokenId={tokenId} nextTokenId={nextTokenId} />
                    <div className="mt-4 space-y-3">
                      <h3 className="font-medium text-[var(--text-primary)]">Transfer this NFT</h3>
                      <input
                        type="text"
                        placeholder="Enter recipient address"
                        value={recipientMap[tokenId] || ""}
                        onChange={(e) => handleInputChange(tokenId, e.target.value)}
                        className="mt-2 p-3 border border-custom rounded-md w-full bg-card text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#00d2ff]"
                      />
                      <button
                        className="w-full mt-2 bg-primary-gradient text-[var(--text-primary)] px-4 py-3 rounded-md hover:opacity-90 transition-opacity"
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

          {/* Transaction Log Section */}
          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Transaction History</h2>
            {transactionLog.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-xl overflow-hidden shadow-custom">
                  <thead>
                    <tr className="bg-secondary-gradient">
                      <th className="p-3 text-left text-[var(--text-primary)]">NFT ID</th>
                      <th className="p-3 text-left text-[var(--text-primary)]">From</th>
                      <th className="p-3 text-left text-[var(--text-primary)]">To</th>
                      <th className="p-3 text-left text-[var(--text-primary)]">Status</th>
                      <th className="p-3 text-left text-[var(--text-primary)]">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionLog.map((tx, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-card-darker" : "bg-opacity-50 bg-card-darker"}>
                        <td className="p-3 border-t border-custom">{tx.tokenId}</td>
                        <td className="p-3 border-t border-custom font-mono text-sm">{tx.from.substring(0, 10)}...</td>
                        <td className="p-3 border-t border-custom font-mono text-sm">{tx.to.substring(0, 10)}...</td>
                        <td
                          className={`p-3 border-t border-custom font-medium ${tx.status === "Success" ? "text-green-500" : "text-red-500"}`}
                        >
                          {tx.status}
                        </td>
                        <td className="p-3 border-t border-custom text-[var(--text-secondary)]">{tx.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-card-darker rounded-xl border border-custom">
                <p className="text-[var(--text-secondary)]">No transaction history yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Account

