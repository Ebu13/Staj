using System;
using System.Collections.Generic;

namespace Backend.Models;

public partial class Haberler
{
    public int HaberId { get; set; }

    public string Baslik { get; set; } = null!;

    public string Icerik { get; set; } = null!;

    public DateOnly Tarih { get; set; }

    public string? FotografDosyaYolu { get; set; }
}
