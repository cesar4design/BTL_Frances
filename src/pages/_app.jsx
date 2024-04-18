
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../globalStyles.css";
import "../styles/Home.css"
import "../styles/login.css"
import "../styles/Presale.css"
import "../styles/Roadmap.css"
import "../styles/Profile.css"

import { Helmet } from 'react-helmet';

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet, polygonMumbai, polygon } from 'viem/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import Navbaro from '../components/navbar'
import Footer from '../components/footer'


const projectId = '6b3b6a75fab4c023e92097eab4b3c923'

export const Mumbai = {
  id: 80001,
  name: 'Polygon Testnet',
  network: 'Polygon Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'DeFiChain',
    symbol: 'MATIC',
  },
  rpcUrls: {
    public: { http: ['https://rpc.ankr.com/polygon_mumbai'] },
    default: { http: ['https://rpc.ankr.com/polygon_mumbai'] },
  }
} 

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [polygon],
  [walletConnectProvider({ projectId }), publicProvider()]
)

const metadata = {
  name: '',
  description: '',
  url: '/',
  icons: ['']
}

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
    new EIP6963Connector({ chains }),

  ],
  publicClient
})



// 3. Create modal
createWeb3Modal({
  wagmiConfig, projectId, defaultChain: polygon, 
  themeMode: 'dark', chains,
  themeVariables: {
    '--w3m-accent': '#F8BC00'
  }
})


// 4. Wrap your app with WagmiProvider and add <Web3Modal /> compoennt
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>BitLambo</title>
        <link rel="icon" href="/" />

      </Helmet>


      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Navbaro />
          <Component {...pageProps} />
          <Footer />
        
        </WagmiConfig>
      ) : null}

    </>
  );
}
