import Head from 'next/head';
import dynamic from 'next/dynamic'; // <-- DİNAMİK IMPORT İÇİN EKLENDİ

// --- HİDRASYON HATASI DÜZELTMESİ (TÜM wagmi bileşenleri) ---
// Hem WalletConnect hem de RequestForm, wagmi hook'larını kullandığı için
// SADECE tarayıcıda (client-side) ve SSR olmadan (ssr: false) yüklenmelidir.

const WalletConnectDynamic = dynamic(
  () => import('../components/WalletConnect').then((mod) => mod.WalletConnect),
  { 
    ssr: false,
    loading: () => <div style={{height: '38px', width: '150px', backgroundColor: '#f0f0f0', borderRadius: '8px'}}></div> 
  }
);

const RequestFormDynamic = dynamic(
  () => import('../components/RequestForm').then((mod) => mod.RequestForm),
  { 
    ssr: false,
    loading: () => <p>Form yükleniyor...</p>
  }
);
// --- DÜZELTME SONU ---

export default function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <Head>
        <title>REP-X | İtibar Köprüsü</title>
        <meta name="description" content="Eski cüzdanınızdaki on-chain itibarı yeni cüzdanınıza bağlayın." />
      </Head>

      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '1px solid #eee', 
        paddingBottom: '10px' 
      }}>
        <h1 style={{ margin: 0 }}>REP-X İtibar Köprüsü</h1>
        <WalletConnectDynamic />
      </header>

      <main style={{ marginTop: '30px' }}>
        <section style={{ 
          maxWidth: '700px', 
          margin: '0 auto 40px auto', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h2>Kripto İtibarınızı Geri Kazanın!</h2>
          <p>
            REP-X, eski (ele geçirilmiş) cüzdanınızdaki tüm on-chain aktivite geçmişini (işlem sayısı, protokol etkileşimi, cüzdan yaşı) yeni, güvenli adresinize <strong>otomatik ve doğrulanabilir</strong> bir yöntemle bağlar.
            Böylece, gelecekteki <strong>Airdrop uygunluklarınızı</strong> kaybetmezsiniz.
          </p>
        </section>

        <section style={{ maxWidth: '700px', margin: 'auto' }}>
          <h2>İtibar Transferine Başlayın</h2>
          <RequestFormDynamic />
        </section>

        <footer style={{ marginTop: '50px', textAlign: 'center', color: '#888' }}>
          <p>Talebinizin Durumunu Takip Edin → [Link eklenecek]</p>
        </footer>
      </main>
    </div>
  );
}