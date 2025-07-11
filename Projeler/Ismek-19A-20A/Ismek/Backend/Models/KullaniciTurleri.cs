using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class KullaniciTurleri
{
    public byte KullaniciTuruId { get; set; }

    public string KullaniciTuru { get; set; } = null!;

    public virtual ICollection<Kullanicilar> Kullanicilars { get; set; } = new List<Kullanicilar>();
}
