using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class KullaniciEgitimleri
{
    public int KullaniciEgitimId { get; set; }

    public int KullaniciId { get; set; }

    public int EgitimId { get; set; }

    public DateOnly? BaslamaTarihi { get; set; }

    public DateOnly? BitisTarihi { get; set; }

    public string? EgitimDurumu { get; set; }

    public virtual Egitimler Egitim { get; set; } = null!;

    public virtual Kullanicilar Kullanici { get; set; } = null!;
}
