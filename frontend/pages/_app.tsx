import type { AppProps } from 'next/app';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import settings from '../../config/settings.json';

// --- HİDRASYON DÜZELTMESİ (useEffect/useState) ---
import { useState, useEffect } from 'react';

// --- REACT NATIVE HATA DÜZELTMESİ (connectors) ---
// Sadece web bağlayıcılarını import et
import { injected, walletConnect } from '@wagmi/connectors';

const targetChain = settings.targetChainId === 8453 ? base : baseSepolia;
// WalletConnect'in çalışması için https://cloud.walletconnect.com/ adresinden
// ücretsiz bir 'projectId' alıp buraya yapıştırmalısın.
const projectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID || ""; 

if (!projectId) {
  console.warn("WalletConnect Project ID eksik. QR Kod bağlantısı çalışmayabilir. Lütfen .env.local dosyasına NEXT_PUBLIC_WC_PROJECT_ID ekleyin.");
}

const config = createConfig({
  chains: [targetChain],
  // 'connectors' dizisini ekleyerek wagmi'ye sadece bunları kullanmasını söylüyoruz
  connectors: [
    injected(), // MetaMask, Brave, vb. tarayıcı cüzdanları
    walletConnect({ projectId, showQrModal: true, qrModalOptions: { themeMode: "light" } }),
  ],
  transports: {
    [targetChain.id]: http(),
  },
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  // --- HİDRASYON DÜZELTMESİ (isClient state'i) ---
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // Component mount olduğunda (yani sadece tarayıcıda)
    // state'i true yap.
    setIsClient(true);
  }, []);

  return (
    <>
      {/* Sayfayı SADECE tarayıcıda (isClient true ise) render et */}
      {isClient ? (
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </WagmiProvider>
      ) : (
        null // Sunucuda hiçbir şey render etme
      )}
    </>
  );
}

export default MyApp;