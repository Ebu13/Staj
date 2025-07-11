using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EgitimAlanlari
{
    public short EgitimAlaniId { get; set; }

    public string EgitimAlani { get; set; } = null!;

    public short EgitimDaliId { get; set; }

    public virtual EgitimDallari EgitimDali { get; set; } = null!;

    public virtual ICollection<EgitimProgramlari> EgitimProgramlaris { get; set; } = new List<EgitimProgramlari>();
}
