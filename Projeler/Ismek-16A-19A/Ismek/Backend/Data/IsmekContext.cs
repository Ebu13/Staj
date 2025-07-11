using System;
using System.Collections.Generic;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public partial class IsmekContext : DbContext
{
    public IsmekContext()
    {
    }

    public IsmekContext(DbContextOptions<IsmekContext> options)
        : base(options)
    {
    }

    public virtual DbSet<EgitimAlanlari> EgitimAlanlaris { get; set; }

    public virtual DbSet<EgitimDallari> EgitimDallaris { get; set; }

    public virtual DbSet<EgitimMerkezleri> EgitimMerkezleris { get; set; }

    public virtual DbSet<EgitimProgramlari> EgitimProgramlaris { get; set; }

    public virtual DbSet<EgitimTipleri> EgitimTipleris { get; set; }

    public virtual DbSet<Egitimler> Egitimlers { get; set; }

    public virtual DbSet<Haberler> Haberlers { get; set; }

    public virtual DbSet<KullaniciTurleri> KullaniciTurleris { get; set; }

    public virtual DbSet<Kullanicilar> Kullanicilars { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlServer("Server=EBUBEKIR13;Database=ismek;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EgitimAlanlari>(entity =>
        {
            entity.HasKey(e => e.EgitimAlaniId).HasName("PK__EgitimAl__32E64E532AF4ABE2");

            entity.ToTable("EgitimAlanlari");

            entity.HasIndex(e => e.EgitimAlani, "UQ__EgitimAl__FE589ACBAFE47933").IsUnique();

            entity.Property(e => e.EgitimAlaniId).HasColumnName("egitim_alani_id");
            entity.Property(e => e.EgitimAlani)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("egitim_alani");
            entity.Property(e => e.EgitimDaliId).HasColumnName("egitim_dali_id");

            entity.HasOne(d => d.EgitimDali).WithMany(p => p.EgitimAlanlaris)
                .HasForeignKey(d => d.EgitimDaliId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EgitimAla__egiti__45F365D3");
        });

        modelBuilder.Entity<EgitimDallari>(entity =>
        {
            entity.HasKey(e => e.EgitimDaliId).HasName("PK__EgitimDa__42ACA8D49856409F");

            entity.ToTable("EgitimDallari");

            entity.HasIndex(e => e.EgitimDali, "UQ__EgitimDa__7D31AF517B18C52B").IsUnique();

            entity.Property(e => e.EgitimDaliId).HasColumnName("egitim_dali_id");
            entity.Property(e => e.EgitimDali)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("egitim_dali");
        });

        modelBuilder.Entity<EgitimMerkezleri>(entity =>
        {
            entity.HasKey(e => e.MerkezId).HasName("PK__EgitimMe__DD8E1D5583965EA8");

            entity.ToTable("EgitimMerkezleri");

            entity.HasIndex(e => e.MerkezIsmi, "UQ__EgitimMe__70673C3C1E87DEA6").IsUnique();

            entity.Property(e => e.MerkezId).HasColumnName("merkez_id");
            entity.Property(e => e.DerslikSayisi)
                .HasDefaultValue((byte)0)
                .HasColumnName("derslik_sayisi");
            entity.Property(e => e.FotografDosyaYolu)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fotograf_dosya_yolu");
            entity.Property(e => e.GoogleHaritaKonumu)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("google_harita_konumu");
            entity.Property(e => e.Ilce)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("ilce");
            entity.Property(e => e.MerkezIsmi)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("merkez_ismi");
            entity.Property(e => e.MerkezTuru)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("merkez_turu");
            entity.Property(e => e.ProgramSayisi)
                .HasDefaultValue((byte)0)
                .HasColumnName("program_sayisi");
        });

        modelBuilder.Entity<EgitimProgramlari>(entity =>
        {
            entity.HasKey(e => e.EgitimProgramiId).HasName("PK__EgitimPr__683E13994F4A834C");

            entity.ToTable("EgitimProgramlari");

            entity.HasIndex(e => e.EgitimProgramiIsmi, "UQ__EgitimPr__91D88116B2A222B1").IsUnique();

            entity.Property(e => e.EgitimProgramiId).HasColumnName("egitim_programi_id");
            entity.Property(e => e.EgitimAlaniId).HasColumnName("egitim_alani_id");
            entity.Property(e => e.EgitimProgramiIsmi)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("egitim_programi_ismi");

            entity.HasOne(d => d.EgitimAlani).WithMany(p => p.EgitimProgramlaris)
                .HasForeignKey(d => d.EgitimAlaniId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__EgitimPro__egiti__49C3F6B7");
        });

        modelBuilder.Entity<EgitimTipleri>(entity =>
        {
            entity.HasKey(e => e.EgitimTipiId).HasName("PK__EgitimTi__885EB4BB5449AED4");

            entity.ToTable("EgitimTipleri");

            entity.HasIndex(e => e.EgitimTipi, "UQ__EgitimTi__26691320FD5198BA").IsUnique();

            entity.Property(e => e.EgitimTipiId).HasColumnName("egitim_tipi_id");
            entity.Property(e => e.EgitimTipi)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("egitim_tipi");
        });

        modelBuilder.Entity<Egitimler>(entity =>
        {
            entity.HasKey(e => e.EgitimId).HasName("PK__Egitimle__E1CAE992120C0645");

            entity.ToTable("Egitimler");

            entity.Property(e => e.EgitimId).HasColumnName("egitim_id");
            entity.Property(e => e.EgitimDili)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("egitim_dili");
            entity.Property(e => e.EgitimMerkeziId).HasColumnName("egitim_merkezi_id");
            entity.Property(e => e.EgitimProgramiId).HasColumnName("egitim_programi_id");
            entity.Property(e => e.EgitimSuresi)
                .HasDefaultValue((short)0)
                .HasColumnName("egitim_suresi");
            entity.Property(e => e.EgitimTipiId).HasColumnName("egitim_tipi_id");
            entity.Property(e => e.FotografDosyaYolu)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fotograf_dosya_yolu");
            entity.Property(e => e.KayitDurumu)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("kayit_durumu");

            entity.HasOne(d => d.EgitimMerkezi).WithMany(p => p.Egitimlers)
                .HasForeignKey(d => d.EgitimMerkeziId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Egitimler__egiti__571DF1D5");

            entity.HasOne(d => d.EgitimProgrami).WithMany(p => p.Egitimlers)
                .HasForeignKey(d => d.EgitimProgramiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Egitimler__egiti__5629CD9C");

            entity.HasOne(d => d.EgitimTipi).WithMany(p => p.Egitimlers)
                .HasForeignKey(d => d.EgitimTipiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Egitimler__egiti__5535A963");
        });

        modelBuilder.Entity<Haberler>(entity =>
        {
            entity.HasKey(e => e.HaberId).HasName("PK__Haberler__07F9EDA2E28F30EE");

            entity.ToTable("Haberler");

            entity.Property(e => e.HaberId).HasColumnName("haber_id");
            entity.Property(e => e.Baslik)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("baslik");
            entity.Property(e => e.FotografDosyaYolu)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("fotograf_dosya_yolu");
            entity.Property(e => e.Icerik)
                .HasColumnType("text")
                .HasColumnName("icerik");
            entity.Property(e => e.Tarih).HasColumnName("tarih");
        });

        modelBuilder.Entity<KullaniciTurleri>(entity =>
        {
            entity.HasKey(e => e.KullaniciTuruId).HasName("PK__Kullanic__2D09172E7C4BE8C4");

            entity.ToTable("KullaniciTurleri");

            entity.HasIndex(e => e.KullaniciTuru, "UQ__Kullanic__C49933A73B970C3B").IsUnique();

            entity.Property(e => e.KullaniciTuruId)
                .ValueGeneratedOnAdd()
                .HasColumnName("kullanici_turu_id");
            entity.Property(e => e.KullaniciTuru)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("kullanici_turu");
        });

        modelBuilder.Entity<Kullanicilar>(entity =>
        {
            entity.HasKey(e => e.KullaniciId).HasName("PK__Kullanic__9F0EC30213E080E4");

            entity.ToTable("Kullanicilar");

            entity.HasIndex(e => e.Email, "UQ__Kullanic__AB6E6164D3C2C6E6").IsUnique();

            entity.HasIndex(e => e.TcKimlikNo, "UQ__Kullanic__B9A62ED829A5B8C7").IsUnique();

            entity.Property(e => e.KullaniciId).HasColumnName("kullanici_id");
            entity.Property(e => e.Adi)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("adi");
            entity.Property(e => e.Adres)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("adres");
            entity.Property(e => e.CalismaDurumu)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("calisma_durumu");
            entity.Property(e => e.DogumTarihi).HasColumnName("dogum_tarihi");
            entity.Property(e => e.EgitimDurumu)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("egitim_durumu");
            entity.Property(e => e.Email)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.EngelDurumu)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("engel_durumu");
            entity.Property(e => e.KullaniciTuruId).HasColumnName("kullanici_turu_id");
            entity.Property(e => e.Meslek)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("meslek");
            entity.Property(e => e.Soyadi)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("soyadi");
            entity.Property(e => e.TcKimlikNo)
                .HasMaxLength(11)
                .IsUnicode(false)
                .IsFixedLength()
                .HasColumnName("tc_kimlik_no");
            entity.Property(e => e.TelefonNo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("telefon_no");

            entity.HasOne(d => d.KullaniciTuru).WithMany(p => p.Kullanicilars)
                .HasForeignKey(d => d.KullaniciTuruId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Kullanici__kulla__3C69FB99");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}