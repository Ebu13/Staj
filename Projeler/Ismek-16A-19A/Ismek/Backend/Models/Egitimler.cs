using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Egitimler
{
    public int EgitimId { get; set; }

    public short EgitimTipiId { get; set; }

    public string EgitimDili { get; set; } = null!;

    public short EgitimProgramiId { get; set; }

    public int EgitimMerkeziId { get; set; }

    public short? EgitimSuresi { get; set; }

    public string? KayitDurumu { get; set; }

    public string? FotografDosyaYolu { get; set; }

    public virtual EgitimMerkezleri EgitimMerkezi { get; set; } = null!;

    public virtual EgitimProgramlari EgitimProgrami { get; set; } = null!;

    public virtual EgitimTipleri EgitimTipi { get; set; } = null!;
}
