"use client";

import React, { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
// --- DÜZELTME 2 (HASHLEME): Gerekli viem fonksiyonları import edildi ---
import { parseEther, keccak256, stringToBytes, isAddress } from 'viem'; 

// --- DÜZELTME 1 (IMPORTS): Dosyalar doğru import edildi ---
import settings from '../../config/settings.json';
import contractAddresses from '../../config/contractAddresses.json';
// ABI'yi boş 'abis.js' yerine derlenmiş artifact'tan al
import ReputationBridgeArtifact from '../../artifacts/contracts/ReputationBridge.sol/ReputationBridge.json';

// --- DÜZELTME 1 (DEĞİŞKENLER): Adres, ABI ve Ücret doğru okundu ---
const BRIDGE_ABI = ReputationBridgeArtifact.abi;
const networkName = "baseSepolia"; // Hardhat config ile aynı
    
// Adreslerin deploy edildiği ağı (baseSepolia) seçiyoruz
const BRIDGE_ADDRESS = (contractAddresses as any)[networkName]?.ReputationBridge as `0x${string}`;
    
// 'settings.settings.baseFeeEth' hatası düzeltildi
const BASE_FEE = parseEther(settings.baseFeeEth); 
    
// Oracle API URL'ini settings.json'dan al
const ORACLE_API_URL = settings.oracleApiUrl || "http://localhost:3001";

export const RequestForm = () => {
    const { address: connectedAddress, isConnected } = useAccount();
    const [oldAddress, setOldAddress] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
        
    const { data: hash, isPending, writeContract } = useWriteContract();
    // 'receipt' eklendi
    const { isLoading: isConfirming, isSuccess: isConfirmed, data: receipt } = useWaitForTransactionReceipt({ hash });

    // --- DÜZELTME 3 (EKSİK MANTIK): Tx onaylandığında Oracle'ı tetikle ---
    useEffect(() => {
        // Sadece işlem başarıyla onaylandığında çalış
        if (isConfirmed && receipt && connectedAddress && oldAddress) {
                
            console.log("İşlem onaylandı:", receipt);
            setStatusMessage("İşlem onaylandı. Skor hesaplanması için Oracle'a istek gönderiliyor...");

            // 1. Kanıtı (proofHash) yeniden oluştur (kontrata gönderilenle aynı olmalı)
            const proofMessage = `Link ${oldAddress} to ${connectedAddress}`;
            const proofHash = keccak256(stringToBytes(proofMessage));

            // 2. Oracle backend'ine API isteği gönder
            fetch(`${ORACLE_API_URL}/request-score`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldAddress: oldAddress,
                    newAddress: connectedAddress,
                    proofHash: proofHash // Hash'i gönder
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                     throw new Error(data.error);
                }
                console.log("Oracle yanıtı:", data);
                // OracleServer'dan gelen 'resultMessage' veya 'serverMessage'ı göster
                setStatusMessage(`Oracle Yanıtı: ${data.resultMessage || data.serverMessage}`);
            })
            .catch(err => {
                console.error("Oracle API hatası:", err);
                setStatusMessage(`Oracle API ile iletişim kurulamadı: ${err.message}`);
            });
        }
    }, [isConfirmed, receipt, connectedAddress, oldAddress]); // Bağımlılıklar eklendi
    // --- DÜZELTME 3 SONU ---

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isConnected || !connectedAddress) {
            setStatusMessage("Lütfen önce cüzdanınızı (yeni adresiniz olarak) bağlayın.");
            return;
        }
        // Düzeltme: 'ethers.isAddress' yerine viem'den 'isAddress' kullanıldı
        if (!oldAddress || !isAddress(oldAddress)) { 
            setStatusMessage("Lütfen geçerli bir 'Eski Cüzdan Adresi' girin.");
            return;
        }

        setStatusMessage("Talep hazırlanıyor...");

        // --- DÜZELTME 2 (HASHLEME): stringToBytes + keccak256 kullanıldı ---
        // 'SizeOverflowError' hatasını çözmek için string'i keccak256 ile hash'liyoruz
        const proofMessage = `Link ${oldAddress} to ${connectedAddress}`;
        const proofHash = keccak256(stringToBytes(proofMessage)); 
        // --- DÜZELTME 2 SONU ---

        try {
            writeContract({
                address: BRIDGE_ADDRESS,
                abi: BRIDGE_ABI,
                functionName: 'requestLink',
                args: [oldAddress, proofHash], // Hash'lenmiş 32 byte'lık değeri gönder
                value: BASE_FEE,
            });
            setStatusMessage("Lütfen cüzdanınızdan işlemi onaylayın...");
        } catch (error) {
            console.error("Kontrat çağrısı hatası:", error);
            setStatusMessage(`Hata: ${(error as Error).message}`);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
            <h2>İtibar Transferi (RPX) Talebi</h2>
            <p>Bu form, eski cüzdanınızdaki itibarı yeni cüzdanınıza (şu an bağlı olan) bağlamak için kullanılır.</p>
                
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Eski Cüzdan Adresi (İtibarını aktarmak istediğiniz):
                        <input
                            type="text"
                            value={oldAddress}
                            onChange={(e) => setOldAddress(e.target.value)}
                            placeholder="0x..."
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                            disabled={isPending || isConfirming}
                        />
                    </label>
                </div>
                    
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        Yeni Cüzdan Adresi (Mevcut bağlı olan):
                        <input
                            type="text"
                            value={connectedAddress || 'Cüzdan bağlı değil'}
                            readOnly
                            disabled
                            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                        />
                    </label>
                </div>
                    
                <button 
                    type="submit" 
                    disabled={!isConnected || isPending || isConfirming}
                    style={{ padding: '10px 15px', cursor: 'pointer' }}
                >
                    {isPending ? 'İşlem Gönderiliyor...' : 
                     isConfirming ? 'Onay Bekleniyor...' : 
                     `Talep Gönder (${settings.baseFeeEth} ETH)`}
                </button>
            </form>

            {statusMessage && <p><strong>Durum:</strong> {statusMessage}</p>}
            
            {isConfirmed && (
                <div style={{ marginTop: '20px', color: 'green' }}>
                    <p><strong>Talep Başarılı!</strong></p>
                    <p>İşleminiz onaylandı (Tx: {hash}).</p>
                    <p>Oracle puanınızı hesaplıyor...</p>
                    <a href={`https://sepolia.basescan.org/tx/${hash}`} target="_blank" rel="noopener noreferrer">İşlemi Görüntüle</a>
                </div>
            )}
        </div>
    );
};