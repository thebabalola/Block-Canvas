"use client"
import { useAccount, useDisconnect } from "wagmi"
import WalletModal from "./WalletModal"
import { shortenAddress } from "../../utils"
import { Popover } from "@radix-ui/themes"
import { Icon } from "@iconify/react/dist/iconify.js"
import { supportedNetworks } from "../../config/wallet-connection/wagmi"
import { useNavigate } from "react-router-dom"
import { Wallet } from "lucide-react"

const WalletConnection = () => {
  const navigate = useNavigate()
  const account = useAccount()
  const { disconnect } = useDisconnect()

  if (!account.address) {
    return <WalletModal />
  }
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button className="bg-secondary-gradient text-[var(--text-primary)] px-4 py-2 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2">
          <Wallet className="h-4 w-4" />
          <span>{shortenAddress(account.address)}</span>
          <Icon icon="radix-icons:caret-down" className="w-4 h-4" />
        </button>
      </Popover.Trigger>
      <Popover.Content
          width="200px"
          className="!p-0 !px-0 shadow-custom-lg bg-secondary-gradient rounded-lg border-none !transform-none"
          style={{
            position: "absolute",
            top: "20px",
          }}
        >
          <a
            className="hover:bg-opacity-20 hover:bg-white transition-colors hover:text-black"
            href={`${supportedNetworks[0].blockExplorers.default.url}/address/${account.address}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="flex items-center gap-4 w-full px-4 py-3 text-[var(--text-primary)]">
              <Icon icon="gridicons:external" className="w-5 h-5" />
              <span>Explorer</span>
            </span>
          </a>
          <button className="w-full flex gap-4 items-center p-4 text-[var(--text-primary)] hover:bg-opacity-20 hover:bg-white transition-colors hover:text-black">
            <Icon icon="solar:copy-line-duotone" className="w-5 h-5" />
            <span>Copy</span>
          </button>
          <button
            onClick={() => navigate("/account")}
            className="w-full flex gap-4 items-center p-4 text-[var(--text-primary)] hover:bg-opacity-20 hover:bg-white transition-colors hover:text-black"
          >
            <Icon icon="grommet-icons:user-settings" className="w-5 h-5" />
            <span>User Account</span>
          </button>
          {/* Disconnect Button with Bottom Radius */}
          <button
            onClick={disconnect}
            className="w-full flex gap-4 items-center p-4 text-[var(--text-primary)] bg-disconnect-gradient hover:bg-disconnect-hover transition-colors rounded-b-lg hover:text-black"
          >
            <Icon icon="grommet-icons:power-shutdown" className="w-5 h-5" />
            <span>Disconnect</span>
          </button>
        </Popover.Content>

    </Popover.Root>
  )
}

export default WalletConnection

