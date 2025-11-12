import { ethers, network } from "hardhat"; // 'network' import edildi
import * as fs from "fs";
import * as path from "path";
// Statik import kaldırıldı, fs ile okuyacağız

async function main() {
  console.log("Configuring contracts...");

  // 1. Deployer adresini al (Oracle olarak kullanılacak)
  const [deployer] = await ethers.getSigners();
  const oracleAddress = deployer.address;
  console.log(`Deployer (Oracle) address: ${oracleAddress}`);

  // 2. Network adını dinamik olarak al
  const networkName = network.name; // "baseSepolia" olmalı
  console.log(`Configuring for network: ${networkName}`);

  // 3. Adresleri config dosyasından dinamik olarak oku
  const configPath = path.join(__dirname, "../config/contractAddresses.json");
  if (!fs.existsSync(configPath)) {
    throw new Error(`contractAddresses.json bulunamadı. Lütfen önce deploy betiğini çalıştırın.`);
  }
  
  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  
  const nftAddress = config[networkName]?.ReputationNFT;
  const bridgeAddress = config[networkName]?.ReputationBridge;

  if (!nftAddress || !bridgeAddress) {
    throw new Error(`config/contractAddresses.json dosyasında '${networkName}' ağı için adresler bulunamadı.`);
  }

  // 4. Kontratları al
  const nft = await ethers.getContractAt("ReputationNFT", nftAddress);
  const bridge = await ethers.getContractAt("ReputationBridge", bridgeAddress);
  
  console.log(`ReputationNFT adresi: ${await nft.getAddress()}`);
  console.log(`ReputationBridge adresi: ${await bridge.getAddress()}`);

  // 5. NFT Kontratına Bridge adresini ayarla
  console.log(`ReputationNFT (${nftAddress}) bridge adresi olarak ${bridgeAddress} ayarlanıyor...`);
  const tx1 = await nft.setBridgeContract(bridgeAddress);
  await tx1.wait();
  console.log(`...ReputationNFT, bridge adresini (${bridgeAddress}) olarak güncelledi.`);

  // 6. Bridge Kontratına Oracle adresini ayarla
  console.log(`ReputationBridge (${bridgeAddress}) oracle adresi olarak ${oracleAddress} ayarlanıyor...`);
  const tx2 = await bridge.setOracleAddress(oracleAddress);
  await tx2.wait();
  console.log(`...ReputationBridge, oracle adresini (${oracleAddress}) olarak güncelledi.`);

  console.log("\n--- SETUP COMPLETE ---");
  console.log("Kontratlar birbirine bağlandı.");
  console.log("------------------------");
  console.log("ŞİMDİ 'npm run oracle' ve 'npm run dev' komutlarını ayrı terminallerde çalıştırabilirsin.");
}

main().catch((error) => {
  console.error("\n--- SETUP FAILED ---");
  console.error(error);
  process.exitCode = 1;
});