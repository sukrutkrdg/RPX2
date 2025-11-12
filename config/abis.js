// config/abis.js

// ABI'lar, Hardhat derlemesi (npx hardhat compile) sırasında oluşur.
// Lütfen derlemeden sonra artifacts/contracts/ReputationBridge.sol/ReputationBridge.json
// ve artifacts/contracts/ReputationNFT.sol/ReputationNFT.json dosyalarından ABI içeriklerini kopyalayıp
// aşağıdaki boş dizilere (array) yapıştırın.

const BRIDGE_ABI = []; 
const NFT_ABI = [];

// Tüm Backend ve Frontend dosyaları artık bu iki değişkeni import edecektir.
export {
    BRIDGE_ABI,
    NFT_ABI
};