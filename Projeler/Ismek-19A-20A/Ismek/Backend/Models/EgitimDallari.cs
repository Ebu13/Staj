using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class EgitimDallari
{
    public short EgitimDaliId { get; set; }

    public string EgitimDali { get; set; } = null!;

    public virtual ICollection<EgitimAlanlari> EgitimAlanlaris { get; set; } = new List<EgitimAlanlari>();
}
