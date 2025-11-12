import express, { Request, Response } from 'express';
import { ethers } from 'ethers';
import * as dotenv from 'dotenv';
import { ReputationScorer, ScoreResult } from '../BlockChainAnalyzer/ReputationScorer';
import { ContractRelayer } from './ContractRelayer';

// --- Gerekli Dosyaları Import Etme ---
// Hata 1 Düzeltmesi: 'import ... with' yerine CommonJS 'require' kullanıldı
const settings = require('../../config/settings.json');
const contractAddresses = require('../../config/contractAddresses.json');
const ReputationBridgeArtifact = require('../../artifacts/contracts/ReputationBridge.sol/ReputationBridge.json');

dotenv.config();

// --- Konfigürasyon ve Değişken Kontrolü ---
const PORT = process.env.PORT || 3002;
const networkName = "baseSepolia"; 

const ORACLE_PRIVATE_KEY = process.env.ORACLE_PRIVATE_KEY;
const RPC_URL = process.env.BASE_SEPOLIA_RPC_URL; 
const COVALENT_API_KEY = process.env.COVALENT_API_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!ORACLE_PRIVATE_KEY || !RPC_URL || !COVALENT_API_KEY || !ETHERSCAN_API_KEY) {
  throw new Error("Lütfen .env dosyasını kontrol edin. ORACLE_PRIVATE_KEY, BASE_SEPOLIA_RPC_URL, COVALENT_API_KEY ve ETHERSCAN_API_KEY değişkenleri gereklidir.");
}

const BRIDGE_ADDRESS = contractAddresses[networkName].ReputationBridge;
const BRIDGE_ABI = ReputationBridgeArtifact.abi;

if (!BRIDGE_ADDRESS || !BRIDGE_ABI) {
    throw new Error(`Kontrat adresi veya ABI bulunamadı. Lütfen 'npx hardhat compile' ve 'npm run deploy' komutlarını çalıştırdığınızdan emin olun.`);
}

// --- Ethers Kurulumu ---
const provider = new ethers.JsonRpcProvider(RPC_URL);
const oracleWallet = new ethers.Wallet(ORACLE_PRIVATE_KEY, provider);
const bridgeContract = new ethers.Contract(BRIDGE_ADDRESS, BRIDGE_ABI, oracleWallet);

// --- Servisleri Başlatma ---
const scorer = new ReputationScorer(settings, {
  covalentApiKey: COVALENT_API_KEY,
  etherscanApiKey: ETHERSCAN_API_KEY
});
const relayer = new ContractRelayer(bridgeContract);

const app = express();
app.use(express.json());

// --- API Endpoint ---
app.post('/request-score', async (req: Request, res: Response) => {
  const { oldAddress, newAddress, proofHash } = req.body;

  if (!oldAddress || !newAddress || !proofHash) {
    return res.status(400).json({ error: 'Eksik parametreler: oldAddress, newAddress ve proofHash gereklidir.' });
  }

  console.log(`[${new Date().toISOString()}] Skor talebi alındı: Eski Adres ${oldAddress}, Yeni Adres ${newAddress}`);

  try {
    // 1. Skoru Hesapla
    const result: ScoreResult = await scorer.calculateReputationScore(oldAddress, newAddress, proofHash);
    console.log(`Skor hesaplandı: ${result.score}, Doğrulandı: ${result.isVerified}`);

    // 2. Kontrata Geri Bildir (Asenkron)
    relayer.submitVerification(oldAddress, result.isVerified, result.score)
      .then(txHash => {
        console.log(`Skor başarıyla kontrata gönderildi. Tx Hash: ${txHash}`);
      })
      .catch(err => {
        console.error("Kontrata gönderme hatası:", err.message);
      });

    // 3. Kullanıcıya skoru hemen döndür
    // Hata 2 Düzeltmesi: 'result' içindeki 'message' çakışmaması için yeniden adlandırıldı
    const { message: resultMessage, ...restOfResult } = result;
    res.json({
      serverMessage: "Talep alındı, skor hesaplandı ve kontrata gönderiliyor.",
      resultMessage: resultMessage, // 'result.message' buraya geldi
      ...restOfResult // 'score', 'isVerified', 'proofs'
    });

  } catch (error) {
    const err = error as Error;
    console.error(`[${new Date().toISOString()}] Skorlama hatası:`, err.message);
    res.status(500).json({ error: err.message });
  }
}); 

app.listen(PORT, () => {
  console.log(`Oracle server (API) dinlemede: http://localhost:${PORT}`);
  console.log(`Bağlanılan Bridge Kontratı: ${BRIDGE_ADDRESS} (Network: ${networkName})`);
  console.log(`Oracle Cüzdan Adresi: ${oracleWallet.address}`);
});