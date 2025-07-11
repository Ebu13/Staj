namespace Backend.Models.DTOs
{
    public class HaberlerDTO
    {
        public int HaberId { get; set; }

        public string Baslik { get; set; } = null!;

        public string Icerik { get; set; } = null!;

        public DateOnly Tarih { get; set; }

        public string? FotografDosyaYolu { get; set; }
    }
}
