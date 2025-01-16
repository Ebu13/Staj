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
    kompleks_mi BIT NOT NULL DEFAULT 0  -- Yeni s�tun eklendi
);




-- Kurs Yeri �leti�im Bilgileri Tablosu
CREATE TABLE KursYeriIletisimBilgileri (
    iletisim_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    tur_adi CHAR(1) NOT NULL CHECK (tur_adi IN ('T', 'M')),  -- 'T' (Telefon) veya 'M' (Mail) olmal�
    telefon_mail NVARCHAR(100) NOT NULL,
    aktif_mi CHAR(1) NOT NULL CHECK (aktif_mi IN ('E', 'H')) DEFAULT 'E' -- 'E' Evet 'H' Hay�r
);



-- Kurs Yeri G�rseller Tablosu
CREATE TABLE KursYeriGorseller (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    gorsel_yolu NVARCHAR(255) NOT NULL  -- G�rselin yolunu saklamak i�in
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



-- Kurs Yeri Derslik Tan�mlar� Tablosu
CREATE TABLE KursYeriDerslikTanimlari (
    derslik_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    derslik_adi NVARCHAR(50) NOT NULL,
    kontenjan INT NOT NULL
);

-- Kategori Tan�mlar� Tablosu
CREATE TABLE KategoriTanimlari (
    kategori_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_adi NVARCHAR(100) NOT NULL,
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')), -- E-Evet, H-Hay�r; Varsay�lan de�er E
    aciklama NVARCHAR(1000),
    gorsel_yolu NVARCHAR(255) 
);


-- Bran� Tan�mlar� Tablosu
CREATE TABLE BransTanimlari (
    brans_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_id INT FOREIGN KEY REFERENCES KategoriTanimlari(kategori_id),
    brans_adi NVARCHAR(50) NOT NULL,
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')), -- E-Evet, H-Hay�r; Varsay�lan de�er E
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
    il_ilce_aciklamasi NVARCHAR(50), -- �l �l�e Ad�
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

-- Bran� Sorular� Tablosu
CREATE TABLE BransSorulari (
    soru_id INT IDENTITY(1,1) PRIMARY KEY,
    brans_id INT FOREIGN KEY REFERENCES BransTanimlari(brans_id),
    soru_icerik NVARCHAR(2000) NOT NULL,  -- Soru metni
    cevap_tipi NVARCHAR(50) NOT NULL  -- Cevap t�r� (�rne�in, 'Metin', 'Se�enek', vb.)
);

CREATE TABLE KursTanimlari (
    kurs_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her kurs i�in benzersiz bir kimlik
    kurs_adi NVARCHAR(50) NOT NULL,  -- Kurs Ad�
    kurs_merkezi NVARCHAR(100) NOT NULL,  -- Kurs Merkezi
    kategori_adi NVARCHAR(50) NOT NULL,  -- Kategori Ad�
    brans_adi NVARCHAR(50) NOT NULL,  -- Bran� Ad�
    yas_araligi_baslangic_tarihi DATE NOT NULL,  -- Ya� Aral��� (Ba�lang�� Tarihi)
    yas_araligi_bitis_tarihi DATE NOT NULL,  -- Ya� Aral��� (Biti� Tarihi)
    cinsiyet CHAR(1) NOT NULL CHECK (cinsiyet IN ('K', 'E', 'H')),  -- Cinsiyet (Kad�n: 'K', Erkek: 'E', Hepsi: 'H')
    kontenjan_sayisi INT NOT NULL,  -- Kontenjan Say�s�
    yedek_kontenjan_sayisi INT,  -- Yedek Kontenjan Say�s� (Opsiyonel)
    resmi_tatil_dahil_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (resmi_tatil_dahil_mi IN ('E', 'H')),  -- Resm� Tatil Dahil Mi? (E-Evet, H-Hay�r)
    kurs_basvuru_baslangic_tarihi DATE NOT NULL,  -- Kurs Ba�vuru Ba�lang�� Tarihi
    kurs_basvuru_baslangic_saati VARCHAR(5) NOT NULL,  -- Kurs Ba�vuru Ba�lang�� Saati
    kurs_basvuru_bitis_tarihi DATE,  -- Kurs Ba�vuru Biti� Tarihi (Opsiyonel)
    kurs_basvuru_bitis_saati VARCHAR(5),  -- Kurs Ba�vuru Biti� Saati (Opsiyonel)
    kurs_baslangic_tarihi DATE NOT NULL,  -- Kurs Ba�lang�� Tarihi
    kurs_bitis_tarihi DATE NOT NULL,  -- Kurs Biti� Tarihi
    aciklama NVARCHAR(500)  -- A��klama (Opsiyonel)
);

-- Kurs G�rsel Tan�mlar� Tablosu
CREATE TABLE KursGorselTanimlari (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her g�rsel i�in benzersiz bir kimlik
    kurs_id INT FOREIGN KEY REFERENCES KursTanimlari(kurs_id),  -- Kurs ile ili�kilendirilmi�
    gorsel_yolu NVARCHAR(255) NOT NULL,  -- G�rselin yolu (dosya yolu veya URL)
    ana_gorsel_mi CHAR(1) CHECK (ana_gorsel_mi IN ('E', 'H')) DEFAULT 'H'  -- Ana g�rsel mi (E-Evet, H-Hay�r); varsay�lan de�er H
);


CREATE TABLE KursProgrami (
    kurs_programi_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her kay�t i�in benzersiz bir kimlik
    kurs_id INT NOT NULL,  -- Kurs ile ili�kilendirilmi�
    FOREIGN KEY (kurs_id) REFERENCES KursTanimlari(kurs_id),  -- KursTanimlari tablosuna referans

    -- Kurs ba�vuru detaylar�
    kurs_basvuru_baslangic_tarihi DATE NOT NULL,  -- Kurs ba�vuru ba�lang�� tarihi
    kurs_basvuru_baslangic_saati VARCHAR(5) NOT NULL,  -- Kurs ba�vuru ba�lang�� saati
    kurs_basvuru_bitisi_tarihi DATE,  -- Kurs ba�vuru biti� tarihi (Opsiyonel)
    kurs_basvuru_bitisi_saati VARCHAR(5),  -- Kurs ba�vuru biti� saati (Opsiyonel)
    
    -- Pazartesi
    pazartesi_baslangic_saati VARCHAR(5),
    pazartesi_bitisi_saati VARCHAR(5),
    pazartesi_egitmen_1 VARCHAR(5),
    pazartesi_egitmen_2 VARCHAR(5),
    pazartesi_derslik VARCHAR(1),
    
    -- Sal�
    sali_baslangic_saati VARCHAR(5),
    sali_bitisi_saati VARCHAR(5),
    sali_egitmen_1 VARCHAR(5),
    sali_egitmen_2 VARCHAR(5),
    sali_derslik VARCHAR(1),
    
    -- �ar�amba
    carsamba_baslangic_saati VARCHAR(5),
    carsamba_bitisi_saati VARCHAR(5),
    carsamba_egitmen_1 VARCHAR(5),
    carsamba_egitmen_2 VARCHAR(5),
    carsamba_derslik VARCHAR(1),
    
    -- Per�embe
    persembe_baslangic_saati VARCHAR(5),
    persembe_bitisi_saati VARCHAR(5),
    persembe_egitmen_1 VARCHAR(5),
    persembe_egitmen_2 VARCHAR(5),
    persembe_derslik VARCHAR(1),
    
    -- Cuma
    cuma_baslangic_saati VARCHAR(5),
    cuma_bitisi_saati VARCHAR(5),
    cuma_egitmen_1 VARCHAR(5),
    cuma_egitmen_2 VARCHAR(5),
    cuma_derslik VARCHAR(1),
    
    -- Cumartesi
    cumartesi_baslangic_saati VARCHAR(5),
    cumartesi_bitisi_saati VARCHAR(5),
    cumartesi_egitmen_1 VARCHAR(5),
    cumartesi_egitmen_2 VARCHAR(5),
    cumartesi_derslik VARCHAR(1),
    
    -- Pazar
    pazar_baslangic_saati VARCHAR(5),
    pazar_bitisi_saati VARCHAR(5),
    pazar_egitmen_1 VARCHAR(5),
    pazar_egitmen_2 VARCHAR(5),
    pazar_derslik VARCHAR(1)
);

CREATE TABLE KursBasvuru (
    basvuru_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her ba�vuru i�in benzersiz bir kimlik
    tc_kimlik_no NVARCHAR(11) NOT NULL,  -- T.C. Kimlik Numaras�
    dogum_tarihi DATE NOT NULL,  -- Do�um Tarihi
    kursiyer_adi NVARCHAR(100) NOT NULL,  -- Ad�
    kursiyer_soyadi NVARCHAR(100) NOT NULL,  -- Soyad�
    cep_telefon NVARCHAR(10),  -- Telefon
    mail NVARCHAR(100),  -- Mail
    adres NVARCHAR(400)  -- Adres
);

CREATE TABLE YoklamaListesi (
    yoklama_id INT IDENTITY(1,1) PRIMARY KEY,  -- Her yoklama kayd� i�in benzersiz bir kimlik
    kurs NVARCHAR(10) NOT NULL,  -- �lgili kursun ad� veya kodu
    tarih DATE NOT NULL,  -- Yoklaman�n yap�ld��� tarih
    saat NVARCHAR(10),  -- Yoklaman�n yap�ld��� saat
    tc_kimlik_no NVARCHAR(11) NOT NULL,  -- Kursiyerin T.C. Kimlik Numaras�
    adi NVARCHAR(100) NOT NULL,  -- Kursiyerin Ad�
    soyadi NVARCHAR(100) NOT NULL,  -- Kursiyerin Soyad�
    yoklama_durumu BIT NOT NULL DEFAULT 0,  -- Yoklama durumu (0: Gelmedi, 1: Geldi)
    FOREIGN KEY (tc_kimlik_no) REFERENCES KursiyerBilgileri(tc_kimlik_no) -- Kursiyer bilgileri tablosuna referans
);
