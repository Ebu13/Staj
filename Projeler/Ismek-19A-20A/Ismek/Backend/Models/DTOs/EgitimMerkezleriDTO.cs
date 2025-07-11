namespace Backend.Models.DTOs
{
    public class EgitimMerkezleriDTO
    {
        public int MerkezId { get; set; }

        public string MerkezIsmi { get; set; } = null!;

        public string Ilce { get; set; } = null!;

        public byte? DerslikSayisi { get; set; }

        public string? GoogleHaritaKonumu { get; set; }

        public byte? ProgramSayisi { get; set; }

        public string? MerkezTuru { get; set; }

        public string? FotografDosyaYolu { get; set; }

    }
}
