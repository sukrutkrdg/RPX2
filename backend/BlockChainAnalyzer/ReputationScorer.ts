// Hatalı importlar düzeltildi
import { verifyProofs, Proofs } from './ProofVerifier';
import { CovalentClient, EtherscanClient } from './APIClients';

// API Anahtarları Arayüzü
interface ApiKeys {
    covalentApiKey: string;
    etherscanApiKey: string;
}

// Skorlama sonucu için arayüz
export interface ScoreResult {
    score: number;
    isVerified: boolean;
    message: string;
    proofs: Proofs;
}

// Bu class (sınıf) artık doğru şekilde export ediliyor
export class ReputationScorer {
    private settings: any;
    private covalentClient: CovalentClient;
    private etherscanClient: EtherscanClient;

    constructor(settings: any, apiKeys: ApiKeys) {
        this.settings = settings;
        // API İstemcilerini başlat
        this.covalentClient = new CovalentClient(apiKeys.covalentApiKey);
        this.etherscanClient = new EtherscanClient(apiKeys.etherscanApiKey);
    }

    public async calculateReputationScore(oldAddress: string, newAddress: string, proofHash: string): Promise<ScoreResult> {
        console.log("ReputationScorer: Skor hesaplama başladı...");

        // Adım 1: Kanıtları Doğrula (API istemcilerini ProofVerifier'a yolla)
        const proofs: Proofs = await verifyProofs(oldAddress, newAddress, proofHash, this.settings, {
            covalent: this.covalentClient,
            etherscan: this.etherscanClient
        });

        // Adım 2: Puanları Ağırlıklandır
        const { proofWeights, minScoreForVerification } = this.settings;
        
        let totalScore = 0;
        totalScore += (proofs.recoveryTransfer ? 1 : 0) * proofWeights.recoveryTransfer;
        totalScore += (proofs.transactionConsistency ? 1 : 0) * proofWeights.transactionConsistency;
        totalScore += (proofs.walletAge ? 1 : 0) * proofWeights.walletAge;
        totalScore += (proofs.protocolInteractions ? 1 : 0) * proofWeights.protocolInteractions;

        // Adım 3: Doğrulama Durumunu Belirle
        // Ana kanıt (recoveryTransfer) olmadan skor yüksek olsa bile 'isVerified' false olmalı
        const isVerified = totalScore >= minScoreForVerification && proofs.recoveryTransfer;

        const message = isVerified 
            ? "Doğrulama başarılı." 
            : (totalScore < minScoreForVerification ? "Minimum skor eşiği geçilemedi." : "Ana kurtarma kanıtı (recoveryTransfer) bulunamadı.");

        console.log(`ReputationScorer: Skor ${totalScore}, Doğrulandı: ${isVerified}`);
        
        return {
            score: totalScore,
            isVerified: isVerified,
            message: message,
            proofs: proofs
        };
    }
}