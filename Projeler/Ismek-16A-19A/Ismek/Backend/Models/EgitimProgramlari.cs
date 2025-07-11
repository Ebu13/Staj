using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EgitimProgramlari
{
    public short EgitimProgramiId { get; set; }

    public string EgitimProgramiIsmi { get; set; } = null!;

    public short EgitimAlaniId { get; set; }

    public virtual EgitimAlanlari EgitimAlani { get; set; } = null!;

    public virtual ICollection<Egitimler> Egitimlers { get; set; } = new List<Egitimler>();
}
