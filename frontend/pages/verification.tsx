// frontend/pages/verification.tsx

import Head from 'next/head';
import { useAccount, useReadContract } from 'wagmi';
import { WalletConnect } from '../components/WalletConnect';
import Link from 'next/link';
import settings from '../../config/settings.json';
import { BRIDGE_ABI } from '../../config/abis'; 

const BRIDGE_ADDRESS = settings.contractAddresses.ReputationBridge as `0x${string}`;

// Bu yapı, sözleşmeden dönen LinkRecord struct'ını temsil eder.
interface LinkRecord {
    newAddress: string;
    linkTimestamp: bigint;
    reputationScore: bigint;
    isVerified: boolean;
    proofHash: `0x${string}`;
    // Not: Bridge sözleşmesinde links mapping'i sadece oldAddress'e göre sorgulanabilir. 
    // Tüm talepleri göstermek için, arka uç API'si (Subgraph/Custom) gerekir.
    // Şimdilik, sadece tek bir örnek eski adresi baz alacağız veya kullanıcıdan girmesini isteyeceğiz.
}

// Simülasyon için: Kullanıcının son başvurusunu lokal state/context'ten çekmeli
// Gerçekte: Kullanıcının bağladığı yeni cüzdana ait tüm eski adres kayıtlarıSubgraph'tan çekilir.
// Basitleştirme için, kullanıcıdan eski adresini bu sayfada tekrar girmesini isteyelim:
const MOCK_OLD_ADDRESS = "0xExampleOldAddressForDemo"; 

const Verification = () => {
    const { address, isConnected } = useAccount();

    // Akıllı Sözleşmeden LinkRecord verisini oku
    const { data: record, isLoading, error } = useReadContract({
        address: BRIDGE_ADDRESS,
        abi: BRIDGE_ABI,
        functionName: 'links',
        args: [MOCK_OLD_ADDRESS], // Gerçek adresi kullanıcıdan almalıyız!
        chainId: settings.settings.targetChainId,
        query: {
            enabled: isConnected, // Sadece cüzdan bağlıysa sorgula
        }
    });
    
    // Gelen veriyi LinkRecord tipine dönüştür (record bir dizi olarak dönebilir)
    const linkRecord = record ? record as unknown as LinkRecord : null;

    const renderStatus = () => {
        if (!isConnected) {
            return <p className="text-xl text-gray-500">Lütfen doğrulama durumunuzu görmek için cüzdanınızı bağlayın.</p>;
        }
        
        if (isLoading) {
            return <p className="text-xl text-indigo-500">⏳ Durum Kontrol Ediliyor...</p>;
        }
        
        if (error) {
            console.error("Sorgulama Hatası:", error);
            return <p className="text-xl text-red-600">❌ Sorgulama hatası: Sözleşme verisine erişilemiyor.</p>;
        }

        if (!linkRecord || linkRecord.newAddress === '0x0000000000000000000000000000000000000000') {
            return <p className="text-xl text-gray-700">🔍 Bu eski adres için aktif bir talep bulunamadı.</p>;
        }

        // --- Durum Gösterimi ---
        if (linkRecord.isVerified) {
            return (
                <div className="text-center p-6 bg-green-100 border-l-4 border-green-500 rounded-lg">
                    <h3 className="text-3xl font-bold text-green-700 mb-3">✅ İTİBAR BAĞLANDI!</h3>
                    <p className="text-xl text-green-800">Tebrikler! İtibar puanınız yeni cüzdanınıza aktarıldı.</p>
                    <p className="text-2xl font-extrabold mt-4">Nihai Puan: {linkRecord.reputationScore.toString()} / 100</p>
                    <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg">
                        REP-NFT'nizi Görüntüle
                    </button>
                </div>
            );
        } else {
            // isVerified: false ise, beklemede veya reddedilmiş olabilir.
            return (
                <div className="text-center p-6 bg-yellow-100 border-l-4 border-yellow-500 rounded-lg">
                    <h3 className="text-3xl font-bold text-yellow-700 mb-3">🕒 DOĞRULAMA BEKLEMEDE</h3>
                    <p className="text-lg text-yellow-800">Talebiniz Oracle analiz motorumuz tarafından inceleniyor.</p>
                    <p className="text-sm mt-3 text-gray-600">Bu süreç {settings.settings.oldWalletInactivityPeriodHours} saate kadar sürebilir (Hacker aktivitesi kontrol ediliyor).</p>
                    <p className="text-base mt-2">Gönderilen ProofHash: {linkRecord.proofHash.slice(0, 10)}...</p>
                </div>
            );
        }
    };

    return (
        <>
            <Head>
                <title>Durum Takibi - REP-X</title>
            </Head>

            <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
                <header className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        İtibar Doğrulama Durumu
                    </h1>
                </header>

                <main className="w-full max-w-2xl px-4">
                    <div className="flex justify-center mb-6">
                        <WalletConnect />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                        {renderStatus()}
                    </div>

                    <div className="text-center mt-8">
                        <Link href="/" legacyBehavior>
                            <a className="text-indigo-600 hover:text-indigo-800 font-semibold underline">
                                ← Yeni Bir Talep Başlat
                            </a>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};

export default Verification;