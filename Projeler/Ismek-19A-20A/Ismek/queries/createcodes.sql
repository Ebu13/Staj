CREATE DATABASE ismek;
GO
USE ismek;
GO

-- Kullan�c� T�rleri Tablosu
CREATE TABLE KullaniciTurleri (
    kullanici_turu_id TINYINT PRIMARY KEY IDENTITY(1,1),
    kullanici_turu VARCHAR(50) UNIQUE NOT NULL
);
GO

-- Kullan�c�lar Tablosu
CREATE TABLE Kullanicilar (
    kullanici_id INT PRIMARY KEY IDENTITY(1,1),
    adi VARCHAR(50) NOT NULL,
    soyadi VARCHAR(50) NOT NULL,
    tc_kimlik_no CHAR(11) UNIQUE NOT NULL,
    telefon_no VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    dogum_tarihi DATE NOT NULL,
    adres VARCHAR(255) NOT NULL,
    egitim_durumu VARCHAR(50) NOT NULL,
    calisma_durumu VARCHAR(50) NOT NULL,
    engel_durumu VARCHAR(50) NULL,
    meslek VARCHAR(100) NULL,
    kullanici_turu_id TINYINT NOT NULL,
    FOREIGN KEY (kullanici_turu_id) REFERENCES KullaniciTurleri(kullanici_turu_id)
);
GO

-- E�itim Tipleri Tablosu
CREATE TABLE EgitimTipleri (
    egitim_tipi_id SMALLINT PRIMARY KEY IDENTITY(1,1),
    egitim_tipi VARCHAR(50) UNIQUE NOT NULL
);
GO

-- E�itim Dallar� Tablosu
CREATE TABLE EgitimDallari (
    egitim_dali_id SMALLINT PRIMARY KEY IDENTITY(1,1),
    egitim_dali VARCHAR(50) UNIQUE NOT NULL
);
GO

-- E�itim Alanlar� Tablosu
CREATE TABLE EgitimAlanlari (
    egitim_alani_id SMALLINT PRIMARY KEY IDENTITY(1,1),
    egitim_alani VARCHAR(50) UNIQUE NOT NULL,
    egitim_dali_id SMALLINT NOT NULL,
    FOREIGN KEY (egitim_dali_id) REFERENCES EgitimDallari(egitim_dali_id)
);
GO

-- E�itim Programlar� Tablosu
CREATE TABLE EgitimProgramlari (
    egitim_programi_id SMALLINT PRIMARY KEY IDENTITY(1,1),
    egitim_programi_ismi VARCHAR(100) UNIQUE NOT NULL,
    egitim_alani_id SMALLINT NOT NULL,
    FOREIGN KEY (egitim_alani_id) REFERENCES EgitimAlanlari(egitim_alani_id)
);
GO

-- E�itim Merkezleri Tablosu
CREATE TABLE EgitimMerkezleri (
    merkez_id INT PRIMARY KEY IDENTITY(1,1),
    merkez_ismi VARCHAR(100) UNIQUE NOT NULL,
    ilce VARCHAR(50) NOT NULL,
    derslik_sayisi TINYINT DEFAULT 0 CHECK (derslik_sayisi >= 0),
    google_harita_konumu VARCHAR(255) NULL,
    program_sayisi TINYINT DEFAULT 0 CHECK (program_sayisi >= 0),
    merkez_turu VARCHAR(50) NULL,
    fotograf_dosya_yolu VARCHAR(255) NULL
);
GO

-- E�itimler Tablosu
CREATE TABLE Egitimler (
    egitim_id INT PRIMARY KEY IDENTITY(1,1),
    egitim_tipi_id SMALLINT NOT NULL,
    egitim_dili VARCHAR(50) NOT NULL,
    egitim_programi_id SMALLINT NOT NULL,
    egitim_merkezi_id INT NOT NULL,
    egitim_suresi SMALLINT DEFAULT 0 CHECK (egitim_suresi >= 0),
    kayit_durumu VARCHAR(50) NULL,
    fotograf_dosya_yolu VARCHAR(255) NULL,
    FOREIGN KEY (egitim_tipi_id) REFERENCES EgitimTipleri(egitim_tipi_id),
    FOREIGN KEY (egitim_programi_id) REFERENCES EgitimProgramlari(egitim_programi_id),
    FOREIGN KEY (egitim_merkezi_id) REFERENCES EgitimMerkezleri(merkez_id)
);
GO

-- Kullan�c� E�itimleri Tablosu (G�ncellenmi�)
CREATE TABLE KullaniciEgitimleri (
    kullanici_egitim_id INT PRIMARY KEY IDENTITY(1,1),
    kullanici_id INT NOT NULL,
    egitim_id INT NOT NULL,
    baslama_tarihi DATE NULL,
    bitis_tarihi DATE NULL,
    egitim_durumu VARCHAR(50) NULL, -- Devam Eden, Bitmi�, Hi� Ba�lanmam��
    FOREIGN KEY (kullanici_id) REFERENCES Kullanicilar(kullanici_id),
    FOREIGN KEY (egitim_id) REFERENCES Egitimler(egitim_id)
);
GO

-- Kullan�c� E�itim Durumu Tetikleyicisi
CREATE TRIGGER trg_SetEgitimDurumu
ON KullaniciEgitimleri
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE KullaniciEgitimleri
    SET egitim_durumu = 
        CASE
            WHEN baslama_tarihi IS NULL AND bitis_tarihi IS NULL THEN 'UnStarted'
            WHEN baslama_tarihi IS NOT NULL AND bitis_tarihi IS NULL THEN 'Continuing'
            WHEN baslama_tarihi IS NOT NULL AND bitis_tarihi IS NOT NULL THEN 'Finished'
            ELSE 'Unknown' -- E�er farkl� bir durum olu�ursa (g�venlik i�in)
        END
    WHERE kullanici_egitim_id IN (SELECT kullanici_egitim_id FROM inserted);
END;
GO

-- Haberler Tablosu
CREATE TABLE Haberler (
    haber_id INT PRIMARY KEY IDENTITY(1,1),
    baslik VARCHAR(255) NOT NULL,
    icerik TEXT NOT NULL,
    tarih DATE NOT NULL,
    fotograf_dosya_yolu VARCHAR(255) NULL
);
GO
