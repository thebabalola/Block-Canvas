"use client"

import { Icon } from "@iconify/react/dist/iconify.js"
import { Dialog } from "@radix-ui/themes"
import { useState, useRef } from "react"
import { useConnectors } from "wagmi"
import { ExternalLink } from "lucide-react"

const WalletModal = () => {
  const connectors = useConnectors()
  const [pendingConnectorUID, setPendingConnectorUID] = useState(null)
  const triggerRef = useRef(null)

  const walletConnectConnector = connectors.find((connector) => connector.id === "walletConnect")

  const otherConnectors = connectors.filter((connector) => connector.id !== "walletConnect")

  const connectWallet = async (connector) => {
    try {
      setPendingConnectorUID(connector.id)
      await connector.connect()
    } catch (error) {
      console.error(error)
    } finally {
      setPendingConnectorUID(null)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger ref={triggerRef}>
        <button className="bg-primary-gradient text-[var(--text-primary)] px-4 py-2 rounded-md cursor-pointer hover:opacity-90 transition-opacity">
          Connect Wallet
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        className="wallet-selection !transform-none !fixed"
        style={{
          position: "absolute",
          width: "280px",
          top: "80px",
          right: "20px",
          left: "auto",
        }}
      >
        <div className="wallet-header flex justify-between items-center mb-3">
          <Dialog.Title className="text-[var(--text-primary)] text-lg font-bold">Connect a Wallet</Dialog.Title>
          <Dialog.Close className="text-[var(--text-primary)] hover:text-[var(--text-secondary)]">
            <Icon icon="lucide:x" className="w-4 h-4" />
          </Dialog.Close>
        </div>

        <div className="mt-3">
          {walletConnectConnector && (
            <button
              onClick={() => connectWallet(walletConnectConnector)}
              disabled={pendingConnectorUID === walletConnectConnector.uid}
              className="w-full flex gap-4 items-center p-3 bg-card border border-custom rounded-xl mb-3 hover:bg-opacity-20 transition-all"
            >
              <img
                src="https://logosarchive.com/wp-content/uploads/2022/02/WalletConnect-icon.svg"
                className="wallet-icon w-6 h-6 bg-white p-1 rounded-md"
                alt="WalletConnect"
              />
              <span className="ml-2 text-[var(--text-primary)] text-sm">WalletConnect</span>

              {pendingConnectorUID === walletConnectConnector.uid && (
                <Icon icon="codex:loader" className="w-4 h-4 ml-auto animate-spin" />
              )}
            </button>
          )}

          <h3 className="text-[var(--text-secondary)] text-xs font-medium mb-2">Popular Wallets</h3>

          <div className="wallets-grid">
            {otherConnectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => connectWallet(connector)}
                disabled={pendingConnectorUID === connector.uid}
                className="wallet-option h-[70px]"
              >
                <img
                  src={connector.icon || "/placeholder.svg"}
                  className="w-6 h-6 bg-white p-1 rounded-md"
                  alt={connector.name}
                />
                <span className="text-xs text-[var(--text-primary)]">{connector.name}</span>

                {pendingConnectorUID === connector.uid && (
                  <Icon icon="codex:loader" className="w-3 h-3 mt-1 animate-spin" />
                )}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-custom">
            <a
              href="https://ethereum.org/en/wallets/find-wallet/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 text-xs text-[#00d2ff] hover:underline"
            >
              <span>Don't have a wallet? Get one here</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] text-[10px] mt-3 text-center">
          By connecting a wallet, you agree to BlockCanvas's Terms of Service
        </p>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default WalletModal

