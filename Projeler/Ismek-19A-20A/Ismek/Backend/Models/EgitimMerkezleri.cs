using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EgitimMerkezleri
{
    public int MerkezId { get; set; }

    public string MerkezIsmi { get; set; } = null!;

    public string Ilce { get; set; } = null!;

    public byte? DerslikSayisi { get; set; }

    public string? GoogleHaritaKonumu { get; set; }

    public byte? ProgramSayisi { get; set; }

    public string? MerkezTuru { get; set; }

    public string? FotografDosyaYolu { get; set; }

    public virtual ICollection<Egitimler> Egitimlers { get; set; } = new List<Egitimler>();
}
