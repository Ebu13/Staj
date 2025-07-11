using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EgitimTipleri
{
    public short EgitimTipiId { get; set; }

    public string EgitimTipi { get; set; } = null!;

    public virtual ICollection<Egitimler> Egitimlers { get; set; } = new List<Egitimler>();
}
