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
    kompleks_mi BIT NOT NULL DEFAULT 0
);

-- Kurs Yeri Ýletiþim Bilgileri Tablosu
CREATE TABLE KursYeriIletisimBilgileri (
    iletisim_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    tur_adi CHAR(1) NOT NULL CHECK (tur_adi IN ('T', 'M')),
    telefon_mail NVARCHAR(100) NOT NULL,
    aktif_mi CHAR(1) NOT NULL CHECK (aktif_mi IN ('E', 'H')) DEFAULT 'E'
);

-- Kurs Yeri Görseller Tablosu
CREATE TABLE KursYeriGorseller (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,
    yer_id INT FOREIGN KEY REFERENCES KursEtkinlikYerleri(yer_id),
    gorsel_yolu NVARCHAR(255) NOT NULL
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
    gorev_bitis_tarihi DATE,
    CONSTRAINT CHK_GorevTarihi CHECK (gorev_bitis_tarihi IS NULL OR gorev_bitis_tarihi >= gorev_baslama_tarihi)
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
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')),
    aciklama NVARCHAR(1000),
    gorsel_yolu NVARCHAR(255)
);

-- Branþ Tanýmlarý Tablosu
CREATE TABLE BransTanimlari (
    brans_id INT IDENTITY(1,1) PRIMARY KEY,
    kategori_id INT FOREIGN KEY REFERENCES KategoriTanimlari(kategori_id),
    brans_adi NVARCHAR(50) NOT NULL,
    aktif_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (aktif_mi IN ('E', 'H')),
    aciklama NVARCHAR(1000),
    sertifika_verilecek_mi CHAR(1),
    kan_grubu_sorulsun_mu CHAR(1),
    gorsel_yolu NVARCHAR(255)
);

-- Kursiyer Bilgileri Tablosu
CREATE TABLE KursiyerBilgileri (
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
    adres_sira_no INT,
    il_ilce_kodu NVARCHAR(6) NOT NULL,
    il_ilce_aciklamasi NVARCHAR(50),
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
    soru_icerik NVARCHAR(2000) NOT NULL,
    cevap_tipi NVARCHAR(50) NOT NULL
);

-- Kurs Tanýmlarý Tablosu
CREATE TABLE KursTanimlari (
    kurs_id INT IDENTITY(1,1) PRIMARY KEY,
    kurs_adi NVARCHAR(50) NOT NULL,
    kurs_merkezi NVARCHAR(100) NOT NULL,
    kategori_adi NVARCHAR(50) NOT NULL,
    brans_adi NVARCHAR(50) NOT NULL,
    yas_araligi_baslangic_tarihi DATE NOT NULL,
    yas_araligi_bitis_tarihi DATE NOT NULL,
    cinsiyet CHAR(1) NOT NULL CHECK (cinsiyet IN ('K', 'E', 'H')),
    kontenjan_sayisi INT NOT NULL,
    yedek_kontenjan_sayisi INT,
    resmi_tatil_dahil_mi CHAR(1) NOT NULL DEFAULT 'E' CHECK (resmi_tatil_dahil_mi IN ('E', 'H')),
    kurs_basvuru_baslangic_tarihi DATE NOT NULL,
    kurs_basvuru_baslangic_saati VARCHAR(5) NOT NULL,
    kurs_basvuru_bitis_tarihi DATE,
    kurs_basvuru_bitis_saati VARCHAR(5),
    kurs_baslangic_tarihi DATE NOT NULL,
    kurs_bitis_tarihi DATE NOT NULL,
    aciklama NVARCHAR(500)
);

-- Kurs Görsel Tanýmlarý Tablosu
CREATE TABLE KursGorselTanimlari (
    gorsel_id INT IDENTITY(1,1) PRIMARY KEY,
    kurs_id INT FOREIGN KEY REFERENCES KursTanimlari(kurs_id),
    gorsel_yolu NVARCHAR(255) NOT NULL,
    ana_gorsel_mi CHAR(1) CHECK (ana_gorsel_mi IN ('E', 'H')) DEFAULT 'H'
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

-- Kurs Baþvuru Tablosu
CREATE TABLE KursBasvuru (
    BasvuruID INT IDENTITY(1,1) PRIMARY KEY,
    TcKimlikNo NVARCHAR(11) NOT NULL,
    DogumTarihi DATE NOT NULL,
    Adi NVARCHAR(100) NOT NULL,
    Soyadi NVARCHAR(100) NOT NULL,
    CepTelefonu NVARCHAR(15),
    Mail NVARCHAR(255),
    Adres NVARCHAR(400)
);

-- Baþvuru Belgeler Tablosu
CREATE TABLE BasvuruBelgeler (
    belge_id INT IDENTITY(1,1) PRIMARY KEY,
    BasvuruID INT NOT NULL,
    belge_yolu NVARCHAR(255) NOT NULL,
    FOREIGN KEY (BasvuruID) REFERENCES KursBasvuru(BasvuruID)
);

-- Yoklama Listesi Tablosu
CREATE TABLE YoklamaListesi (
    yoklama_id INT IDENTITY(1,1) PRIMARY KEY,
    kurs_id INT NOT NULL,
    tarih DATE NOT NULL,
    saat NVARCHAR(10),
    tc_kimlik_no NVARCHAR(11) NOT NULL,
    adi NVARCHAR(100) NOT NULL,
    soyadi NVARCHAR(100) NOT NULL,
    yoklama_durumu BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (kurs_id) REFERENCES KursTanimlari(kurs_id),
    FOREIGN KEY (tc_kimlik_no) REFERENCES KursiyerBilgileri(tc_kimlik_no)
);
