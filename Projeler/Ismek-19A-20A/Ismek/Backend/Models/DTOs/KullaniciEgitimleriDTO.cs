namespace Backend.Models.DTOs
{
    public class KullaniciEgitimleriDTO
    {
        public int KullaniciEgitimId { get; set; }

        public int KullaniciId { get; set; }

        public int EgitimId { get; set; }

        public DateOnly? BaslamaTarihi { get; set; }

        public DateOnly? BitisTarihi { get; set; }

        public string? EgitimDurumu { get; set; }

    }
}
