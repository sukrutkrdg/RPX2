import { ethers } from 'ethers';

// API'lerden dönen Tx (işlem) verisi için ortak bir arayüz
export interface TransactionData {
    hash: string;
    from: string;
    to: string;
    value: string;
    timeStamp: string;
    success: boolean;
}

// Hata: Bu class'lar ReputationScorer'da bekleniyordu ama burada yoktu. Şimdi eklendi.
export class CovalentClient {
    private apiKey: string;
    private baseUrl: string = "https://api.covalenthq.com/v1";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        console.log("CovalentClient başlatıldı.");
    }

    async getTransactions(address: string, chainId: number = 84532): Promise<TransactionData[]> {
        // Covalent API'sine istek at (Bu kısım Covalent dokümantasyonuna göre doldurulmalı)
        // Örnek istek:
        // const url = `${this.baseUrl}/${chainId}/address/${address}/transactions_v2/?key=${this.apiKey}`;
        // const response = await fetch(url);
        // const data = await response.json();
        // return data.items.map(tx => (...));
        
        console.log(`CovalentClient: ${address} için işlemler getiriliyor... (Simüle edildi)`);
        return []; // Şimdilik boş dizi döndür
    }
}

export class EtherscanClient {
    private apiKey: string;
    private baseUrl: string = "https://api-sepolia.basescan.org/api"; // Base Sepolia

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        console.log("EtherscanClient başlatıldı.");
    }

    async getTransactions(address: string): Promise<TransactionData[]> {
        const url = `${this.baseUrl}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${this.apiKey}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.status === "0") {
                console.warn(`EtherscanClient: ${address} için işlem bulunamadı veya API hatası: ${data.message}`);
                return [];
            }

            return data.result.map((tx: any): TransactionData => ({
                hash: tx.hash,
                from: tx.from,
                to: tx.to,
                value: tx.value,
                timeStamp: tx.timeStamp,
                success: tx.isError === "0",
            }));
        } catch (error) {
            console.error("EtherscanClient Hatası:", error);
            return [];
        }
    }
}