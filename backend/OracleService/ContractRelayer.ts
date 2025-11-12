import { ethers, Contract } from 'ethers';

export class ContractRelayer {
    private bridgeContract: Contract;

    constructor(bridgeContract: Contract) {
        this.bridgeContract = bridgeContract;
        console.log(`ContractRelayer başlatıldı. Kontrat: ${bridgeContract.target}`);
    }

    /**
     * Hesaplanan skoru ve doğrulama durumunu akıllı kontrata gönderir.
     */
    public async submitVerification(oldAddress: string, status: boolean, finalScore: number): Promise<string> {
        console.log(`ContractRelayer: setVerificationStatus çağrılıyor... Adres: ${oldAddress}, Durum: ${status}, Skor: ${finalScore}`);
        
        try {
            // Kontratın 'setVerificationStatus' fonksiyonunu çağır
            const tx = await this.bridgeContract.setVerificationStatus(oldAddress, status, finalScore);
            
            console.log(`İşlem gönderildi. Tx Hash: ${tx.hash}. Onay bekleniyor...`);
            await tx.wait(1); // 1 onay bekle
            
            console.log(`İşlem onaylandı (Tx: ${tx.hash})`);
            return tx.hash;
            
        } catch (error) {
            // ----- HATA DÜZELTMESİ BURADA -----
            // 'error' değişkeninin tipini 'unknown' yerine 'any' olarak varsayabiliriz (daha basit)
            // veya tip kontrolü yapabiliriz.
            
            let errorMessage = "Bilinmeyen bir hata oluştu.";
            let errorData: any = null;

            if (error instanceof Error) {
                errorMessage = error.message;
            }

            // Ethers.js hataları genellikle 'data' veya 'reason' içerir
            const ethersError = error as any;
            if (ethersError.data) {
                errorData = ethersError.data;
            } else if (ethersError.reason) {
                errorMessage = `${errorMessage} (Sebep: ${ethersError.reason})`;
            }

            console.error("ContractRelayer Hata:", errorMessage);
            if (errorData) {
                console.error("Hata Detayları:", errorData);
            }
            
            throw new Error(`Kontrat çağrısı başarısız oldu: ${errorMessage}`);
            // ----- DÜZELTME SONU -----
        }
    }
}