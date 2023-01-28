import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic"
require("@solana/wallet-adapter-react-ui/styles.css");

import Table from "../components/Table";
import style from "../styles/Home.module.css";
import { AppProvider } from "../context/context";
const  Header = dynamic(() => import('../components/Header'), { ssr: false })
const  PotCard = dynamic(() => import('../components/PotCard'), { ssr: false })

export default function Home() {
  const endpoint = clusterApiUrl(WalletAdapterNetwork.Devnet);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AppProvider>
            <div className={style.wrapper}>
              <Header />
              <PotCard />
              <Table />
            </div>
          </AppProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
