import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";
import settings from "../config/settings.json";

// --- Yardımcı Fonksiyon: Config dosyasını kaydet ---
function saveConfig(contractName: string, contractAddress: string) {
  const configPath = path.join(__dirname, "../config/contractAddresses.json");
  
  console.log(`Updating config at ${configPath}`);
  
  let config = {
    [process.env.HARDHAT_NETWORK || 'localhost']: {}
  };

  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (e) {
      console.error("Could not parse existing contractAddresses.json, overwriting...");
    }
  }

  const networkName = process.env.HARDHAT_NETWORK || 'localhost';
  if (!config[networkName]) {
    config[networkName] = {};
  }
  
  config[networkName][contractName] = contractAddress;

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log(`Saved ${contractName} address to config: ${contractAddress}`);
}

// --- Ana Deploy Fonksiyonu ---
async function main() {
  console.log("Deploy script started...");

  // 1. Ayarları Yükle
  const { baseFeeEth, feeReceiver } = settings;
  if (!baseFeeEth || !feeReceiver) {
    throw new Error("config/settings.json dosyasında 'baseFeeEth' veya 'feeReceiver' eksik. Lütfen kontrol et.");
  }
  console.log(`Settings loaded: baseFeeEth=${baseFeeEth}, feeReceiver=${feeReceiver}`);

  // 2. Ücreti ayarla
  const baseFee = ethers.parseEther(baseFeeEth);
  console.log(`Base fee set to ${baseFee.toString()} wei`);

  // 3. Deployer (imzalayıcı) adresini al
  const [deployer] = await ethers.getSigners();
  if (!deployer) {
    throw new Error("Deployer adresi (getSigners) alınamadı. .env dosyasındaki DEPLOYER_PRIVATE_KEY'i kontrol et.");
  }
  console.log(`Deploying contracts with the account: ${deployer.address}`);

  // 4. ReputationNFT Kontratını Deploy Et
  console.log("Deploying ReputationNFT...");
  const ReputationNFT = await ethers.getContractFactory("ReputationNFT");
  // NFT kontratı, sahibinin (deployer) mint yetkisine sahip olması için deployer adresini alır
  const nft = await ReputationNFT.deploy(deployer.address);
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log(`ReputationNFT deployed to: ${nftAddress}`);
  saveConfig("ReputationNFT", nftAddress);

  // 5. ReputationBridge Kontratını Deploy Et
  console.log("Deploying ReputationBridge...");
  const ReputationBridge = await ethers.getContractFactory("ReputationBridge");
  // Bridge, (NFT adresi, ücret alıcısı, temel ücret) parametrelerini alır
  const bridge = await ReputationBridge.deploy(nftAddress, feeReceiver, baseFee);
  await bridge.waitForDeployment();
  const bridgeAddress = await bridge.getAddress();
  console.log(`ReputationBridge deployed to: ${bridgeAddress}`);
  saveConfig("ReputationBridge", bridgeAddress);

  console.log("\n--- DEPLOYMENT COMPLETE ---");
  console.log(`ReputationNFT: ${nftAddress}`);
  console.log(`ReputationBridge: ${bridgeAddress}`);
  console.log("----------------------------");
  console.log("ŞİMDİ 'npm run setup' komutunu çalıştırmalısın.");
}

// --- Hata Yakalama ile Çalıştırma ---
main().catch((error) => {
  console.error("\n--- DEPLOYMENT FAILED ---");
  console.error(error);
  process.exitCode = 1;
});