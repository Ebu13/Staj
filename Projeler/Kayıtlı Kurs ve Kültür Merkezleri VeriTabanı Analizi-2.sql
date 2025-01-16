CREATE DATABASE Course;
GO
USE Course;
GO

-- Kurs Etkinlik Yerleri Tablosu
CREATE TABLE KursEtkinlikYerleri (
    yer_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_adi NVARCHAR(100) NOT NULL,
    ust_merkez_adi NVARCHAR(100) NOT NULL,
    mahalle_kodu INT,
    mahalle_adi NVARCHAR(50) NOT NULL,
    cadde_sokak_kodu INT,
    cadde_sokak_adi NVARCHAR(50),
    kapi_no CHAR(4),  
    daire_no CHAR(4),
    aktif_mi CHAR(1) NOT NULL CHECK (aktif_mi IN ('E', 'H')) DEFAULT 'E',
    acilis_saati TIME,
    kapanis_saati TIME,
    aciklama NVARCHAR(1000),
    kompleks_mi BIT NOT NULL DEFAULT 0  -- Yeni sütun eklendi
);




-- Kurs Yeri Ýletiþim Bilgileri Tablosu
CREATE TABLE KursYeriIletisimBilgileri (
    iletisim_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    tur_adi CHAR(1) NOT NULL CHECK (tur_adi IN ('T', 'M')),  -- 'T' (Telefon) veya 'M' (Mail) olmalý
    telefon_mail NVARCHAR(100) NOT NULL,
    aktif_mi CHAR(1) NOT NULL CHECK (aktif_mi IN ('E', 'H')) DEFAULT 'E' -- 'E' Evet 'H' Hayýr
);



-- Kurs Yeri Görseller Tablosu
CREATE TABLE KursYeriGorseller (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    gorsel_yolu NVARCHAR(255) NOT NULL  -- Görselin yolunu saklamak için
);


-- Kurs Yeri Personel Bilgileri Tablosu
CREATE TABLE KursYeriPersonelBilgileri (
    personel_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    personel_adi NVARCHAR(100) NOT NULL,           
    personel_soyadi NVARCHAR(100) NOT NULL,     
    personel_unvani NVARCHAR(100),                 
    personel_meslek NVARCHAR(100),                
    egitmen_mi BIT NOT NULL DEFAULT 0,     
    telefon CHAR(10),                          
    adres NVARCHAR(500),                       
    mail NVARCHAR(100),                        
    gorev_baslama_tarihi DATE NOT NULL,             
    gorev_bitis_tarihi DATE                          
);



-- Kurs Yeri Derslik Tanýmlarý Tablosu
CREATE TABLE KursYeriDerslikTanimlari (
    derslik_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id) NOT NULL,
    derslik_adi NVARCHAR(50) NOT NULL,
    kontenjan INT NOT NULL
);

-- Kategori Tanýmlarý Tablosu
CREATE TABLE KategoriTanimlari (
    kategori_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_adi NVARCHAR(100) NOT NULL,
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')), -- E-Evet, H-Hayýr; Varsayýlan deðer E
    aciklama NVARCHAR(1000),
    gorsel_yolu NVARCHAR(255) 
);


-- Branþ Tanýmlarý Tablosu
CREATE TABLE BransTanimlari (
    brans_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_id INT FOREIGN KEY REFERENCES KategoriTanimlari(kategori_id),
    brans_adi NVARCHAR(50) NOT NULL,
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')), -- E-Evet, H-Hayýr; Varsayýlan deðer E
    aciklama NVARCHAR(1000),
    sertifika_verilecek_mi CHAR(1),
    kan_grubu_sorulsun_mu CHAR(1),
    gorsel_yolu NVARCHAR(255) 
);


-- Kursiyer Bilgileri Tablosu
CREATE TABLE KursiyerBilgileri (
	-- Kursiyer Bilgileri
    uyruk NVARCHAR(15) NOT NULL,
    tc_kimlik_no NVARCHAR(11) NOT NULL PRIMARY KEY,
    dogum_tarihi DATE NOT NULL,
    adi NVARCHAR(50) NOT NULL,
    soyadi NVARCHAR(50) NOT NULL,
    nufuscuzdan_seri_no NVARCHAR(5) NOT NULL,
    dogum_yeri NVARCHAR(6) NOT NULL,
    dogum_yeri_aciklamasi NVARCHAR(25) NOT NULL,
    telefon_no NVARCHAR(10) NOT NULL,
    mail NVARCHAR(50) NOT NULL,
    anne_adi NVARCHAR(50) NOT NULL,
    baba_adi NVARCHAR(50) NOT NULL,
	-- Adres Bilgileri
    adres_sira_no INT,
    il_ilce_kodu NVARCHAR(6) NOT NULL,
    il_ilce_aciklamasi NVARCHAR(50), -- Ýl Ýlçe Adý
    mahalle_kodu INT NOT NULL,
    mahalle_adi NVARCHAR(40) NOT NULL,
    cadde_sokak_kodu INT NOT NULL,
    cadde_sokak_adi NVARCHAR(40) NOT NULL,
    kapi_no INT NOT NULL,
    alt_kapi_no NVARCHAR(30) NOT NULL,
    daire_no NVARCHAR(4) NOT NULL,
    alt_daire_no NVARCHAR(5) NOT NULL,
    posta_kodu INT NOT NULL,
    adres_aciklamasi NVARCHAR(400)
);

-- Branþ Sorularý Tablosu
CREATE TABLE BransSorulari (
    soru_id INT IDENTITY(1,1) PRIMARY KEY,
    brans_id INT FOREIGN KEY REFERENCES BransTanimlari(brans_id),
    soru_icerik NVARCHAR(2000) NOT NULL,  -- Soru metni
    cevap_tipi NVARCHAR(50) NOT NULL  -- Cevap türü (örneðin, 'Metin', 'Seçenek', vb.)
);

CREATE TABLE KursTanimlari (
    kurs_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her kurs için benzersiz bir kimlik
    kurs_adi NVARCHAR(50) NOT NULL,  -- Kurs Adý
    kurs_merkezi NVARCHAR(100) NOT NULL,  -- Kurs Merkezi
    kategori_adi NVARCHAR(50) NOT NULL,  -- Kategori Adý
    brans_adi NVARCHAR(50) NOT NULL,  -- Branþ Adý
    yas_araligi_baslangic_tarihi DATE NOT NULL,  -- Yaþ Aralýðý (Baþlangýç Tarihi)
    yas_araligi_bitis_tarihi DATE NOT NULL,  -- Yaþ Aralýðý (Bitiþ Tarihi)
    cinsiyet CHAR(1) NOT NULL CHECK (cinsiyet IN ('K', 'E', 'H')),  -- Cinsiyet (Kadýn: 'K', Erkek: 'E', Hepsi: 'H')
    kontenjan_sayisi INT NOT NULL,  -- Kontenjan Sayýsý
    yedek_kontenjan_sayisi INT,  -- Yedek Kontenjan Sayýsý (Opsiyonel)
    resmi_tatil_dahil_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (resmi_tatil_dahil_mi IN ('E', 'H')),  -- Resmî Tatil Dahil Mi? (E-Evet, H-Hayýr)
    kurs_basvuru_baslangic_tarihi DATE NOT NULL,  -- Kurs Baþvuru Baþlangýç Tarihi
    kurs_basvuru_baslangic_saati VARCHAR(5) NOT NULL,  -- Kurs Baþvuru Baþlangýç Saati
    kurs_basvuru_bitis_tarihi DATE,  -- Kurs Baþvuru Bitiþ Tarihi (Opsiyonel)
    kurs_basvuru_bitis_saati VARCHAR(5),  -- Kurs Baþvuru Bitiþ Saati (Opsiyonel)
    kurs_baslangic_tarihi DATE NOT NULL,  -- Kurs Baþlangýç Tarihi
    kurs_bitis_tarihi DATE NOT NULL,  -- Kurs Bitiþ Tarihi
    aciklama NVARCHAR(500)  -- Açýklama (Opsiyonel)
);

-- Kurs Görsel Tanýmlarý Tablosu
CREATE TABLE KursGorselTanimlari (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her görsel için benzersiz bir kimlik
    kurs_id INT FOREIGN KEY REFERENCES KursTanimlari(kurs_id),  -- Kurs ile iliþkilendirilmiþ
    gorsel_yolu NVARCHAR(255) NOT NULL,  -- Görselin yolu (dosya yolu veya URL)
    ana_gorsel_mi CHAR(1) CHECK (ana_gorsel_mi IN ('E', 'H')) DEFAULT 'H'  -- Ana görsel mi (E-Evet, H-Hayýr); varsayýlan deðer H
);


-- Kurs Programý Tablosu
CREATE TABLE KursProgrami (
    kurs_programi_id INT IDENTITY(1,1) PRIMARY KEY,
    kurs_id INT NOT NULL FOREIGN KEY REFERENCES KursTanimlari(kurs_id),

    pazartesi_baslangic_saati TIME,
    pazartesi_bitisi_saati TIME,
    pazartesi_egitmen_1 NVARCHAR(100),
    pazartesi_egitmen_2 NVARCHAR(100),
    pazartesi_derslik NVARCHAR(50),
    
    sali_baslangic_saati TIME,
    sali_bitisi_saati TIME,
    sali_egitmen_1 NVARCHAR(100),
    sali_egitmen_2 NVARCHAR(100),
    sali_derslik NVARCHAR(50),
    
    carsamba_baslangic_saati TIME,
    carsamba_bitisi_saati TIME,
    carsamba_egitmen_1 NVARCHAR(100),
    carsamba_egitmen_2 NVARCHAR(100),
    carsamba_derslik NVARCHAR(50),
    
    persembe_baslangic_saati TIME,
    persembe_bitisi_saati TIME,
    persembe_egitmen_1 NVARCHAR(100),
    persembe_egitmen_2 NVARCHAR(100),
    persembe_derslik NVARCHAR(50),
    
    cuma_baslangic_saati TIME,
    cuma_bitisi_saati TIME,
    cuma_egitmen_1 NVARCHAR(100),
    cuma_egitmen_2 NVARCHAR(100),
    cuma_derslik NVARCHAR(50),
    
    cumartesi_baslangic_saati TIME,
    cumartesi_bitisi_saati TIME,
    cumartesi_egitmen_1 NVARCHAR(100),
    cumartesi_egitmen_2 NVARCHAR(100),
    cumartesi_derslik NVARCHAR(50),
    
    pazar_baslangic_saati TIME,
    pazar_bitisi_saati TIME,
    pazar_egitmen_1 NVARCHAR(100),
    pazar_egitmen_2 NVARCHAR(100),
    pazar_derslik NVARCHAR(50)
);


CREATE TABLE KursBasvuru (
    BasvuruID INT IDENTITY(1,1) PRIMARY KEY,  -- Baþvurular için benzersiz bir kimlik
    TcKimlikNo NVARCHAR(11) NOT NULL,  -- T.C. Kimlik Numarasý
    DogumTarihi DATE NOT NULL,  -- Doðum Tarihi
    Adi NVARCHAR(100) NOT NULL,  -- Adý
    Soyadi NVARCHAR(100) NOT NULL,  -- Soyadý
    CepTelefonu NVARCHAR(15),  -- Telefon (ülke kodu ve diðer karakterler için daha geniþ alan)
    Mail NVARCHAR(255),  -- Mail (daha uzun e-posta adresleri için geniþletildi)
    Adres NVARCHAR(400)  -- Adres
);

CREATE TABLE BasvuruBelgeler (
    belge_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her belge için benzersiz bir kimlik
    BasvuruID INT NOT NULL,  -- Baþvuru ID
    belge_yolu NVARCHAR(255) NOT NULL,  -- Belgenin yolu (dosya yolu veya URL)
    FOREIGN KEY (BasvuruID) REFERENCES KursBasvuru(BasvuruID)  -- KursBasvuru tablosuna referans
);



CREATE TABLE YoklamaListesi (
    yoklama_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her yoklama kaydý için benzersiz bir kimlik
    kurs_id INT NOT NULL,  -- Kursun ID'si, KursTanimlari tablosundan referans
    tarih DATE NOT NULL,  -- Yoklamanýn yapýldýðý tarih
    saat NVARCHAR(10),  -- Yoklamanýn yapýldýðý saat
    tc_kimlik_no NVARCHAR(11) NOT NULL,  -- Kursiyerin T.C. Kimlik Numarasý
    adi NVARCHAR(100) NOT NULL,  -- Kursiyerin Adý
    soyadi NVARCHAR(100) NOT NULL,  -- Kursiyerin Soyadý
    yoklama_durumu BIT NOT NULL DEFAULT 0,  -- Yoklama durumu (0: Gelmedi, 1: Geldi)
    FOREIGN KEY (kurs_id) REFERENCES KursTanimlari(kurs_id),  -- KursTanimlari tablosuna referans
    FOREIGN KEY (tc_kimlik_no) REFERENCES KursiyerBilgileri(tc_kimlik_no)  -- KursiyerBilgileri tablosuna referans
);

