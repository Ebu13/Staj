namespace Backend.Models.DTOs
{
    public class EgitimlerDTO
    {
        public int EgitimId { get; set; }

        public short EgitimTipiId { get; set; }

        public string EgitimDili { get; set; } = null!;

        public short EgitimProgramiId { get; set; }

        public int EgitimMerkeziId { get; set; }

        public short? EgitimSuresi { get; set; }

        public string? KayitDurumu { get; set; }

        public string? FotografDosyaYolu { get; set; }
    }
}
