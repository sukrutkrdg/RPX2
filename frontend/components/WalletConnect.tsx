// frontend/components/WalletConnect.tsx

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { mainnet } from 'wagmi/chains'; // Temel EVM zincirini (Base, Optimism vb.) temsil eder
import { injected } from 'wagmi/connectors';
import React from 'react';

// Uygulamanın hedeflediği zincir ID'si (örn: Base)
const TARGET_CHAIN_ID = 8453; // Base Mainnet ID'si

export const WalletConnect = () => {
  // Wagmi hook'ları ile cüzdan durumunu al
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  // Bağlanma butonu işlevi
  const handleConnect = () => {
    // Sadece MetaMask/Injected bir bağlayıcı ile bağlanmaya çalış
    connect({ connector: injected({ target: { id: TARGET_CHAIN_ID } }) });
  };
  
  // Hedef zincir kontrolü
  const isCorrectChain = chainId === TARGET_CHAIN_ID;
  
  // Adresin kısa gösterimi
  const shortAddress = address 
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : '';

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4 p-3 border rounded-lg bg-green-50">
        <span className="font-semibold text-green-700">
          🟢 Bağlı: {shortAddress}
        </span>
        
        {!isCorrectChain && (
            <span className="text-red-600 font-bold">
                ⚠️ Yanlış Ağ! Lütfen Base Ağına Geçin.
            </span>
        )}

        <button 
          onClick={() => disconnect()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-sm"
        >
          Ayır
        </button>
      </div>
    );
  }

  // Bağlı değilse, Bağlan butonu
  return (
    <button 
      onClick={handleConnect}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg"
    >
      Yeni Cüzdanı Bağla (Yeni Güvenli Cüzdanınız)
    </button>
  );
};

// Bu dosyanın dışarıdan düzgün çalışması için ana uygulama yapısı kurulmalıdır (index.tsx ve _app.tsx)