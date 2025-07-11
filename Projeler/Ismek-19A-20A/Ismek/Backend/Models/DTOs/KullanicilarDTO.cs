namespace Backend.Models.DTOs
{
    public class KullanicilarDTO
    {
        public int KullaniciId { get; set; }

        public string Adi { get; set; } = null!;

        public string Soyadi { get; set; } = null!;

        public string TcKimlikNo { get; set; } = null!;

        public string TelefonNo { get; set; } = null!;

        public string Email { get; set; } = null!;

        public DateOnly DogumTarihi { get; set; }

        public string Adres { get; set; } = null!;

        public string EgitimDurumu { get; set; } = null!;

        public string CalismaDurumu { get; set; } = null!;

        public string? EngelDurumu { get; set; }

        public string? Meslek { get; set; }

        public byte KullaniciTuruId { get; set; }
    }
}
