using Backend.Models;
using Backend.Models.DTOs;

namespace Backend.Business.Mapping
{
    public static class Mapper
    {

        public static EgitimMerkezleriDTO ToDTO(this EgitimMerkezleri merkez)
        {
            return new EgitimMerkezleriDTO
            {
                MerkezId = merkez.MerkezId,
                MerkezIsmi = merkez.MerkezIsmi,
                Ilce = merkez.Ilce,
                DerslikSayisi = merkez.DerslikSayisi,
                GoogleHaritaKonumu = merkez.GoogleHaritaKonumu,
                ProgramSayisi = merkez.ProgramSayisi,
                MerkezTuru = merkez.MerkezTuru,
                FotografDosyaYolu = merkez.FotografDosyaYolu
            };
        }

        public static EgitimMerkezleri ToModel(this EgitimMerkezleriDTO dto)
        {
            return new EgitimMerkezleri
            {
                MerkezId = dto.MerkezId,
                MerkezIsmi = dto.MerkezIsmi,
                Ilce = dto.Ilce,
                DerslikSayisi = dto.DerslikSayisi,
                GoogleHaritaKonumu = dto.GoogleHaritaKonumu,
                ProgramSayisi = dto.ProgramSayisi,
                MerkezTuru = dto.MerkezTuru,
                FotografDosyaYolu = dto.FotografDosyaYolu
            };
        }
        public static EgitimAlanlariDTO ToDTO(this EgitimAlanlari alan)
        {
            return new EgitimAlanlariDTO
            {
                EgitimAlaniId = alan.EgitimAlaniId,
                EgitimAlani = alan.EgitimAlani,
                EgitimDaliId = alan.EgitimDaliId
            };
        }
        public static EgitimAlanlari ToModel(this EgitimAlanlariDTO dto)
        {
            return new EgitimAlanlari
            {
                EgitimAlaniId = dto.EgitimAlaniId,
                EgitimAlani = dto.EgitimAlani,
                EgitimDaliId = dto.EgitimDaliId
            };
        }

        public static HaberlerDTO ToDTO(this Haberler haber)
        {
            return new HaberlerDTO
            {
                HaberId = haber.HaberId,
                Baslik = haber.Baslik,
                Icerik = haber.Icerik,
                Tarih = haber.Tarih,
                FotografDosyaYolu = haber.FotografDosyaYolu
            };
        }
        public static Haberler ToModel(this HaberlerDTO dto)
        {
            return new Haberler
            {
                HaberId = dto.HaberId,
                Baslik = dto.Baslik,
                Icerik = dto.Icerik,
                Tarih = dto.Tarih,
                FotografDosyaYolu = dto.FotografDosyaYolu
            };
        }

        public static EgitimDallariDTO ToDTO(this EgitimDallari dal)
        {
            return new EgitimDallariDTO
            {
                EgitimDaliId = dal.EgitimDaliId,
                EgitimDali = dal.EgitimDali
            };
        }
        public static EgitimDallari ToModel(this EgitimDallariDTO dto)
        {
            return new EgitimDallari
            {
                EgitimDaliId = dto.EgitimDaliId,
                EgitimDali = dto.EgitimDali
            };
        }

        public static EgitimlerDTO ToDTO(this Egitimler egitim)
        {
            return new EgitimlerDTO
            {
                EgitimId = egitim.EgitimId,
                EgitimTipiId = egitim.EgitimTipiId,
                EgitimDili = egitim.EgitimDili,
                EgitimProgramiId = egitim.EgitimProgramiId,
                EgitimMerkeziId = egitim.EgitimMerkeziId,
                EgitimSuresi = egitim.EgitimSuresi,
                KayitDurumu = egitim.KayitDurumu,
                FotografDosyaYolu = egitim.FotografDosyaYolu
            };
        }
        public static Egitimler ToModel(this EgitimlerDTO dto)
        {
            return new Egitimler
            {
                EgitimId = dto.EgitimId,
                EgitimTipiId = dto.EgitimTipiId,
                EgitimDili = dto.EgitimDili,
                EgitimProgramiId = dto.EgitimProgramiId,
                EgitimMerkeziId = dto.EgitimMerkeziId,
                EgitimSuresi = dto.EgitimSuresi,
                KayitDurumu = dto.KayitDurumu,
                FotografDosyaYolu = dto.FotografDosyaYolu
            };
        }
        public static EgitimProgramlariDTO ToDTO(this EgitimProgramlari program)
        {
            return new EgitimProgramlariDTO
            {
                EgitimProgramiId = program.EgitimProgramiId,
                EgitimProgramiIsmi = program.EgitimProgramiIsmi,
                EgitimAlaniId = program.EgitimAlaniId
            };
        }

        public static EgitimProgramlari ToModel(this EgitimProgramlariDTO dto)
        {
            return new EgitimProgramlari
            {
                EgitimProgramiId = dto.EgitimProgramiId,
                EgitimProgramiIsmi = dto.EgitimProgramiIsmi,
                EgitimAlaniId = dto.EgitimAlaniId
            };
        }

        public static EgitimTipleriDTO ToDTO(this EgitimTipleri egitimTipi)
        {
            return new EgitimTipleriDTO
            {
                EgitimTipiId = egitimTipi.EgitimTipiId,
                EgitimTipi = egitimTipi.EgitimTipi
            };
        }

        public static EgitimTipleri ToModel(this EgitimTipleriDTO dto)
        {
            return new EgitimTipleri
            {
                EgitimTipiId = dto.EgitimTipiId,
                EgitimTipi = dto.EgitimTipi
            };
        }

        public static KullaniciEgitimleriDTO ToDTO(this KullaniciEgitimleri kullaniciEgitim)
        {
            return new KullaniciEgitimleriDTO
            {
                KullaniciEgitimId = kullaniciEgitim.KullaniciEgitimId,
                KullaniciId = kullaniciEgitim.KullaniciId,
                EgitimId = kullaniciEgitim.EgitimId,
                BaslamaTarihi = kullaniciEgitim.BaslamaTarihi,
                BitisTarihi = kullaniciEgitim.BitisTarihi,
                EgitimDurumu = kullaniciEgitim.EgitimDurumu
            };
        }

        public static KullaniciEgitimleri ToModel(this KullaniciEgitimleriDTO dto)
        {
            return new KullaniciEgitimleri
            {
                KullaniciEgitimId = dto.KullaniciEgitimId,
                KullaniciId = dto.KullaniciId,
                EgitimId = dto.EgitimId,
                BaslamaTarihi = dto.BaslamaTarihi,
                BitisTarihi = dto.BitisTarihi,
                EgitimDurumu = dto.EgitimDurumu
            };
        }

        public static KullanicilarDTO ToDTO(this Kullanicilar kullanici)
        {
            return new KullanicilarDTO
            {
                KullaniciId = kullanici.KullaniciId,
                Adi = kullanici.Adi,
                Soyadi = kullanici.Soyadi,
                TcKimlikNo = kullanici.TcKimlikNo,
                TelefonNo = kullanici.TelefonNo,
                Email = kullanici.Email,
                DogumTarihi = kullanici.DogumTarihi,
                Adres = kullanici.Adres,
                EgitimDurumu = kullanici.EgitimDurumu,
                CalismaDurumu = kullanici.CalismaDurumu,
                EngelDurumu = kullanici.EngelDurumu,
                Meslek = kullanici.Meslek,
                KullaniciTuruId = kullanici.KullaniciTuruId
            };
        }

        public static Kullanicilar ToModel(this KullanicilarDTO dto)
        {
            return new Kullanicilar
            {
                KullaniciId = dto.KullaniciId,
                Adi = dto.Adi,
                Soyadi = dto.Soyadi,
                TcKimlikNo = dto.TcKimlikNo,
                TelefonNo = dto.TelefonNo,
                Email = dto.Email,
                DogumTarihi = dto.DogumTarihi,
                Adres = dto.Adres,
                EgitimDurumu = dto.EgitimDurumu,
                CalismaDurumu = dto.CalismaDurumu,
                EngelDurumu = dto.EngelDurumu,
                Meslek = dto.Meslek,
                KullaniciTuruId = dto.KullaniciTuruId
            };
        }

        public static KullaniciTurleriDTO ToDTO(this KullaniciTurleri kullaniciTuru)
        {
            return new KullaniciTurleriDTO
            {
                KullaniciTuruId = kullaniciTuru.KullaniciTuruId,
                KullaniciTuru = kullaniciTuru.KullaniciTuru
            };
        }

        public static KullaniciTurleri ToModel(this KullaniciTurleriDTO dto)
        {
            return new KullaniciTurleri
            {
                KullaniciTuruId = dto.KullaniciTuruId,
                KullaniciTuru = dto.KullaniciTuru
            };
        }
    }
}
