import { createConfig, http } from "wagmi";
import { liskSepolia } from "wagmi/chains";
import { walletConnect } from "wagmi/connectors";

console.log("VITE_PROVIDER:", import.meta.env.VITE_REOWN_PROJECT_ID);

export const supportedNetworks = [liskSepolia];

export const config = createConfig({
    chains: supportedNetworks,
    multiInjectedProviderDiscovery: true, // default to true though
    connectors: [
        walletConnect({ projectId: import.meta.env.VITE_REOWN_PROJECT_ID }),
    ],
    transports: {
        [liskSepolia.id]: http(),
    },
});
