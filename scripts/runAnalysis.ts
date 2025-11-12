// scripts/runAnalysis.js

require('dotenv').config(); // .env dosyasındaki değişkenleri yükler
const { startOracleListener } = require('../backend/OracleService/OracleServer');

// Kontrol: Kritik değişkenler yüklü mü?
if (!process.env.RPC_URL || !process.env.ORACLE_PRIVATE_KEY) {
    console.error("HATA: RPC_URL ve ORACLE_PRIVATE_KEY, .env dosyasında tanımlanmalıdır.");
    process.exit(1);
}

// Oracle dinleyicisini başlat
startOracleListener();

console.log("REP-X Oracle Analiz Sunucusu Çalışıyor...");
// Not: Frontend'i çalıştırmak için ayrı bir komut (npm run dev) gereklidir.